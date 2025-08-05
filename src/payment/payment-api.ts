// Payment API Types and Interfaces
export interface PaymentRequest {
  merchant_identifier: string;
  currency: string;
  ccn: string;
  exp_month: string;
  exp_year: string;
  cvc_code: string;
  email: string;
  phone_number: string;
  ip: string;
  first_name: string;
  last_name: string;
  amount: string;
  city: string;
  state: string;
  country: string;
  region: string;
  zip_code: string;
  address: string;
  redirect_url: string;
  postback_url: string;
  description: string;
  descriptor: string;
  param?: string;
  payment_status?: string;
}

export interface PaymentResponse {
  success: boolean;
  transaction_id?: string;
  status?: string;
  message?: string;
  error?: string;
  redirect_url?: string;
}

export interface PaymentConfig {
  sessionToken: string;
  applicationKey: string;
  baseUrl?: string;
}

// Payment API Function
export async function createPayment(
  paymentData: PaymentRequest,
  config: PaymentConfig
): Promise<PaymentResponse> {
  try {
    const baseUrl = config.baseUrl || 'https://dev1.blockchanger.io';
    
    const response = await fetch(`${baseUrl}/acquiring_payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'sessiontoken': config.sessionToken,
        'applicationkey': config.applicationKey,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
        status: 'error',
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      transaction_id: data.transaction_id,
      status: data.status || 'success',
      message: data.message,
      redirect_url: data.redirect_url,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 'error',
    };
  }
}

// Utility function to validate payment data
export function validatePaymentData(data: Partial<PaymentRequest>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const requiredFields = [
    'merchant_identifier',
    'currency',
    'ccn',
    'exp_month',
    'exp_year',
    'cvc_code',
    'email',
    'phone_number',
    'ip',
    'first_name',
    'last_name',
    'amount',
    'city',
    'state',
    'country',
    'region',
    'zip_code',
    'address',
    'redirect_url',
    'postback_url',
    'description',
    'descriptor',
  ];

  for (const field of requiredFields) {
    if (!data[field as keyof PaymentRequest]) {
      errors.push(`${field} is required`);
    }
  }

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Credit card number validation (basic Luhn algorithm)
  if (data.ccn && !isValidCreditCard(data.ccn)) {
    errors.push('Invalid credit card number');
  }

  // Expiry date validation
  if (data.exp_month && data.exp_year) {
    const month = parseInt(data.exp_month);
    const year = parseInt(data.exp_year);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (month < 1 || month > 12) {
      errors.push('Invalid expiry month');
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.push('Card has expired');
    }
  }

  // CVC validation
  if (data.cvc_code && !/^\d{3,4}$/.test(data.cvc_code)) {
    errors.push('Invalid CVC code');
  }

  // Amount validation
  if (data.amount && (isNaN(parseFloat(data.amount)) || parseFloat(data.amount) <= 0)) {
    errors.push('Invalid amount');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Luhn algorithm for credit card validation
function isValidCreditCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Helper function to get client IP (for browser environments)
export async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Could not fetch client IP:', error);
    return '127.0.0.1'; // Fallback IP
  }
} 