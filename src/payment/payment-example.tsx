import React, { useState } from 'react';
import PaymentForm from './payment-form';
import type { PaymentFormProps } from './payment-form';
import type { PaymentResponse } from './payment-api';

const PaymentExample: React.FC = () => {
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSuccess = (response: PaymentResponse) => {
    console.log('Payment successful:', response);
    setPaymentResult(response);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    setPaymentResult({
      success: false,
      error,
      status: 'error'
    });
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  // Example configuration - replace with your actual credentials
  const paymentConfig = {
    sessionToken: 'admin_MO687031821sdd1MAWKcwQkOSl',
    applicationKey: 'app_144s9ypK9XoDwHC9rWavGFzpprQhHvMjOEKGP',
    baseUrl: 'https://dev1.blockchanger.io'
  };

  // Example styling with Tailwind CSS
  const formFields: PaymentFormProps['fields'] = {
    firstName: {
      container: "mb-4",
      label: {
        text: "First Name",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "Enter your first name"
      }
    },
    lastName: {
      container: "mb-4",
      label: {
        text: "Last Name",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "Enter your last name"
      }
    },
    email: {
      container: "mb-4",
      label: {
        text: "Email Address",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "your.email@example.com"
      }
    },
    phoneNumber: {
      container: "mb-4",
      label: {
        text: "Phone Number",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "+1 (555) 123-4567"
      }
    },
    cardNumber: {
      container: "mb-4",
      label: {
        text: "Card Number",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "1234 5678 9012 3456"
      }
    },
    expiryMonth: {
      container: "mb-4",
      label: {
        text: "Expiry Month",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      }
    },
    expiryYear: {
      container: "mb-4",
      label: {
        text: "Expiry Year",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      }
    },
    cvc: {
      container: "mb-4",
      label: {
        text: "CVC",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "123"
      }
    },
    address: {
      container: "mb-4",
      label: {
        text: "Address",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "123 Main Street"
      }
    },
    city: {
      container: "mb-4",
      label: {
        text: "City",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "New York"
      }
    },
    state: {
      container: "mb-4",
      label: {
        text: "State",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "NY"
      }
    },
    country: {
      container: "mb-4",
      label: {
        text: "Country",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "US"
      }
    },
    region: {
      container: "mb-4",
      label: {
        text: "Region",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "North America"
      }
    },
    zipCode: {
      container: "mb-4",
      label: {
        text: "ZIP Code",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "10001"
      }
    },
    amount: {
      container: "mb-4",
      label: {
        text: "Amount",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        placeholder: "0.00"
      }
    },
    currency: {
      container: "mb-4",
      label: {
        text: "Currency",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment Example</h1>
      
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800">Processing payment...</p>
        </div>
      )}

      {paymentResult && (
        <div className={`mb-4 p-4 rounded-md ${
          paymentResult.success 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <h3 className={`font-semibold ${
            paymentResult.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {paymentResult.success ? 'Payment Successful!' : 'Payment Failed'}
          </h3>
          <p className={paymentResult.success ? 'text-green-700' : 'text-red-700'}>
            {paymentResult.message || paymentResult.error}
          </p>
          {paymentResult.transaction_id && (
            <p className="text-sm text-gray-600 mt-2">
              Transaction ID: {paymentResult.transaction_id}
            </p>
          )}
        </div>
      )}

             <PaymentForm
         config={paymentConfig}
         merchantIdentifier="mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK"
         redirectUrl="https://demo.io/"
         postbackUrl="https://webhook.site/aa54561b-7dc4-4c14-8f09-ee9959f9e1a6"
         amount="5.00"
         currency="USD"
         description="Example Payment"
         descriptor="Demo Payment"
         param="Pass-through-Param-test"
         paymentStatus="approved"
         fields={formFields}
         submit={{
           text: "Pay $5.00",
           loadingText: "Processing...",
           styles: "w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
         }}
         onSuccess={handlePaymentSuccess}
         onError={handlePaymentError}
         onLoading={handleLoading}
         className="space-y-6"
       />

      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Card Details</h3>
        <p className="text-sm text-gray-600 mb-2">
          Use these test card details for testing:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Card Number:</strong> 4412397212080000</li>
          <li><strong>Expiry:</strong> 03/2027</li>
          <li><strong>CVC:</strong> 003</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentExample; 