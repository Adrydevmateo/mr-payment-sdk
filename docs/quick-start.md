# Quick Start Guide

Get up and running with MR Payment SDK in under 5 minutes.

## Prerequisites

- Node.js 18+ 
- React 19.1.0+
- A React project (or create one with `create-react-app`)

## Installation

Install the SDK in your React project:

```bash
npm install @mrpayment/sdk
```

## Basic Usage

### 1. Import the Component

```tsx
import { Payment } from '@mrpayment/sdk';
```

### 2. Create a Payment Form

```tsx
function App() {
  const handlePayment = () => {
    console.log('Payment submitted!');
    // Add your payment processing logic here
  };

  return (
    <div>
      <h1>My Payment App</h1>
      <Payment
        submit={{
          action: handlePayment,
          text: 'Pay Now'
        }}
      />
    </div>
  );
}
```

### 3. Add Styling (Optional)

The component comes unstyled by default. Add your own CSS:

```tsx
<Payment
  container="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
  fields={{
    email: {
      container: "mb-4",
      label: {
        text: "Email Address",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md"
      }
    },
    password: {
      container: "mb-4",
      label: {
        text: "Password",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md"
      }
    }
  }}
  submit={{
    action: handlePayment,
    text: "Process Payment",
    styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
  }}
/>
```

## Complete Example

Here's a complete working example:

```tsx
import React, { useState } from 'react';
import { Payment } from '@mrpayment/sdk';

function PaymentApp() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setMessage('Processing payment...');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('Payment successful!');
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Payment Form
        </h1>
        
        {message && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-md">
            {message}
          </div>
        )}
        
        <Payment
          container="bg-white rounded-lg shadow-md p-6"
          fields={{
            email: {
              container: "mb-4",
              label: {
                text: "Email Address",
                styles: "block text-sm font-medium text-gray-700 mb-1"
              },
              input: {
                styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            },
            password: {
              container: "mb-4",
              label: {
                text: "Password",
                styles: "block text-sm font-medium text-gray-700 mb-1"
              },
              input: {
                styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            },
            confirmPassword: {
              container: "mb-6",
              label: {
                text: "Confirm Password",
                styles: "block text-sm font-medium text-gray-700 mb-1"
              },
              input: {
                styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            }
          }}
          submit={{
            action: handlePayment,
            text: isProcessing ? "Processing..." : "Pay Now",
            styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          }}
        />
      </div>
    </div>
  );
}

export default PaymentApp;
```

## What's Next?

- 📖 Read the [Component Documentation](./components/payment.md) for detailed API reference
- 🎨 Check out [Styling Examples](./styling-guide.md) for more styling options
- 🔧 Learn about [Integration Patterns](./integration-examples.md) for real-world usage
- 🧪 See [Testing Examples](./testing-guide.md) for testing your payment forms

## Need Help?

- 📚 Browse the [full documentation](./README.md)
- 🐛 Report issues on [GitHub](https://github.com/your-org/mr-payment-sdk/issues)
- 💬 Ask questions in [Discussions](https://github.com/your-org/mr-payment-sdk/discussions) 