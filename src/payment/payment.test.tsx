import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Payment from './payment';

describe('Payment Component', () => {
  it('renders payment form with default fields', () => {
    render(<Payment />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders with custom field labels', () => {
    render(
      <Payment
        fields={{
          email: {
            label: { text: 'Custom Email Label' },
          },
          password: {
            label: { text: 'Custom Password Label' },
          },
        }}
      />
    );
    
    expect(screen.getByLabelText('Custom Email Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Custom Password Label')).toBeInTheDocument();
  });

  it('calls submit action when form is submitted', () => {
    const mockSubmitAction = vi.fn();
    
    render(
      <Payment
        submit={{
          action: mockSubmitAction,
          text: 'Process Payment',
        }}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: 'Process Payment' });
    fireEvent.click(submitButton);
    
    expect(mockSubmitAction).toHaveBeenCalled();
  });

  it('applies custom CSS classes', () => {
    render(
      <Payment
        container="custom-form-class"
        fields={{
          email: {
            container: 'custom-email-container',
            label: { styles: 'custom-label-class' },
            input: { styles: 'custom-input-class' },
          },
        }}
      />
    );
    
    const form = document.querySelector('form');
    expect(form).toHaveClass('custom-form-class');
    
    const emailContainer = form?.querySelector('.custom-email-container');
    expect(emailContainer).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveClass('custom-input-class');
  });

  it('shows configuration error when applicationKey is missing', () => {
    const mockOnConfigError = vi.fn();
    
    render(
      <Payment
        config={{
          sessionToken: 'test_session_token',
          // applicationKey missing
        }}
        merchantIdentifier="test_merchant_id"
        onConfigError={mockOnConfigError}
      />
    );
    
    expect(screen.getByText('Application Key is required')).toBeInTheDocument();
    expect(mockOnConfigError).toHaveBeenCalledWith(['Application Key is required']);
  });

  it('shows configuration error when sessionToken is missing', () => {
    const mockOnConfigError = vi.fn();
    
    render(
      <Payment
        config={{
          applicationKey: 'test_application_key',
          // sessionToken missing
        }}
        merchantIdentifier="test_merchant_id"
        onConfigError={mockOnConfigError}
      />
    );
    
    expect(screen.getByText('Session Token is required')).toBeInTheDocument();
    expect(mockOnConfigError).toHaveBeenCalledWith(['Session Token is required']);
  });

  it('shows configuration error when merchantIdentifier is missing', () => {
    const mockOnConfigError = vi.fn();
    
    render(
      <Payment
        config={{
          sessionToken: 'test_session_token',
          applicationKey: 'test_application_key',
        }}
        merchantIdentifier="" // Empty merchantIdentifier
        onConfigError={mockOnConfigError}
      />
    );
    
    expect(screen.getByText('Merchant ID is required')).toBeInTheDocument();
    expect(mockOnConfigError).toHaveBeenCalledWith(['Merchant ID is required']);
  });

  it('shows multiple configuration errors when multiple fields are missing', () => {
    const mockOnConfigError = vi.fn();
    
    render(
      <Payment
        config={{
          // Both applicationKey and sessionToken missing
        }}
        // merchantIdentifier also missing
        onConfigError={mockOnConfigError}
      />
    );
    
    expect(screen.getByText('Application Key is required')).toBeInTheDocument();
    expect(screen.getByText('Session Token is required')).toBeInTheDocument();
    expect(screen.getByText('Merchant ID is required')).toBeInTheDocument();
    expect(mockOnConfigError).toHaveBeenCalledWith([
      'Application Key is required',
      'Session Token is required',
      'Merchant ID is required'
    ]);
  });

  it('renders form normally when all configuration is valid', () => {
    render(
      <Payment
        config={{
          sessionToken: 'test_session_token',
          applicationKey: 'test_application_key',
        }}
        merchantIdentifier="test_merchant_id"
      />
    );
    
    // Should render the form normally, not show configuration errors
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    
    // Should not show any configuration errors
    expect(screen.queryByText('Application Key is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Session Token is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Merchant ID is required')).not.toBeInTheDocument();
  });
}); 