import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentForm from './payment-form';
import type { PaymentConfig } from './payment-api';

// Mock the payment API functions
vi.mock('./payment-api', () => ({
  createPayment: vi.fn(),
  validatePaymentData: vi.fn(),
  getClientIP: vi.fn(() => Promise.resolve('127.0.0.1')),
}));

describe('PaymentForm Component', () => {
  const mockConfig: PaymentConfig = {
    sessionToken: 'test_session_token',
    applicationKey: 'test_application_key',
  };

  const defaultProps = {
    config: mockConfig,
    merchantIdentifier: 'test_merchant_id',
    redirectUrl: 'https://example.com/success',
    postbackUrl: 'https://example.com/webhook',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders payment form with all required fields', () => {
    render(<PaymentForm {...defaultProps} />);
    
    // Check for personal information fields
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    
    // Check for payment information fields
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
    expect(screen.getByLabelText('CVC')).toBeInTheDocument();
    
    // Check for billing address fields
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Region')).toBeInTheDocument();
    expect(screen.getByLabelText('ZIP Code')).toBeInTheDocument();
    
    // Check for payment details fields
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Currency')).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: 'Pay Now' })).toBeInTheDocument();
  });

  it('renders with custom field labels', () => {
    render(
      <PaymentForm
        {...defaultProps}
        fields={{
          firstName: {
            label: { text: 'Custom First Name' },
          },
          lastName: {
            label: { text: 'Custom Last Name' },
          },
        }}
      />
    );
    
    expect(screen.getByLabelText('Custom First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Custom Last Name')).toBeInTheDocument();
  });

  it('renders with custom submit button text', () => {
    render(
      <PaymentForm
        {...defaultProps}
        submit={{
          text: 'Custom Pay Button',
        }}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Custom Pay Button' })).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with invalid data', async () => {
    const { createPayment, validatePaymentData } = await import('./payment-api');
    
    vi.mocked(validatePaymentData).mockReturnValue({
      isValid: false,
      errors: ['Email is required', 'Card number is invalid'],
    });
    
    vi.mocked(createPayment).mockResolvedValue({
      success: false,
      error: 'Validation failed',
      status: 'error',
    });

    render(<PaymentForm {...defaultProps} />);
    
    // Fill in some fields but leave others empty to trigger validation
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    
    const submitButton = screen.getByRole('button', { name: 'Pay Now' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Card number is invalid')).toBeInTheDocument();
    });
  });

  it('calls onSuccess callback when payment is successful', async () => {
    const { createPayment, validatePaymentData } = await import('./payment-api');
    const mockOnSuccess = vi.fn();
    
    vi.mocked(validatePaymentData).mockReturnValue({
      isValid: true,
      errors: [],
    });
    
    vi.mocked(createPayment).mockResolvedValue({
      success: true,
      transaction_id: 'txn_123456',
      status: 'success',
      message: 'Payment successful',
    });

    render(
      <PaymentForm
        {...defaultProps}
        onSuccess={mockOnSuccess}
      />
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText('CVC'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'US' } });
    fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'North America' } });
    fireEvent.change(screen.getByLabelText('ZIP Code'), { target: { value: '10001' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10.00' } });
    
    const submitButton = screen.getByRole('button', { name: 'Pay Now' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith({
        success: true,
        transaction_id: 'txn_123456',
        status: 'success',
        message: 'Payment successful',
      });
    });
  });

  it('calls onError callback when payment fails', async () => {
    const { createPayment, validatePaymentData } = await import('./payment-api');
    const mockOnError = vi.fn();
    
    vi.mocked(validatePaymentData).mockReturnValue({
      isValid: true,
      errors: [],
    });
    
    vi.mocked(createPayment).mockResolvedValue({
      success: false,
      error: 'Payment failed',
      status: 'error',
    });

    render(
      <PaymentForm
        {...defaultProps}
        onError={mockOnError}
      />
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText('CVC'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'US' } });
    fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'North America' } });
    fireEvent.change(screen.getByLabelText('ZIP Code'), { target: { value: '10001' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10.00' } });
    
    const submitButton = screen.getByRole('button', { name: 'Pay Now' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('Payment failed');
    });
  });

  it('shows loading state during payment processing', async () => {
    const { createPayment, validatePaymentData } = await import('./payment-api');
    const mockOnLoading = vi.fn();
    
    vi.mocked(validatePaymentData).mockReturnValue({
      isValid: true,
      errors: [],
    });
    
    // Create a promise that we can control
    let resolvePayment: (value: any) => void;
    const paymentPromise = new Promise((resolve) => {
      resolvePayment = resolve;
    });
    
    vi.mocked(createPayment).mockReturnValue(paymentPromise);

    render(
      <PaymentForm
        {...defaultProps}
        onLoading={mockOnLoading}
        submit={{
          text: 'Pay Now',
          loadingText: 'Processing...',
        }}
      />
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText('CVC'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'US' } });
    fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'North America' } });
    fireEvent.change(screen.getByLabelText('ZIP Code'), { target: { value: '10001' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10.00' } });
    
    const submitButton = screen.getByRole('button', { name: 'Pay Now' });
    fireEvent.click(submitButton);
    
    // Check that loading state is triggered
    await waitFor(() => {
      expect(mockOnLoading).toHaveBeenCalledWith(true);
      expect(screen.getByRole('button', { name: 'Processing...' })).toBeInTheDocument();
    });
    
    // Resolve the payment
    resolvePayment!({
      success: true,
      transaction_id: 'txn_123456',
      status: 'success',
    });
    
    // Check that loading state is cleared
    await waitFor(() => {
      expect(mockOnLoading).toHaveBeenCalledWith(false);
    });
  });
}); 