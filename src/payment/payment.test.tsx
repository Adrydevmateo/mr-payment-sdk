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
}); 