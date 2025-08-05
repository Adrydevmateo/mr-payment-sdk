# MR Payment Headless

A headless React payment HEADLESS built with TypeScript and Vite. This HEADLESS provides flexible, unstyled payment components that you can customize with your own styling and integrate into any React application. Now with **BlockChanger API integration** for real payment processing!

## Installation

```bash
npm install mr-payment-headless
# or
yarn add mr-payment-headless
# or
pnpm add mr-payment-headless
```

## Peer Dependencies

This HEADLESS requires React 19.1.0 or higher. Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom
```

## Quick Start

### Basic Payment Form

```tsx
import { Payment } from 'mr-payment-headless';

function App() {
  const handlePaymentSubmit = () => {
    console.log('Payment submitted');
  };

  return (
    <Payment
      submit={{
        action: handlePaymentSubmit,
        text: "Process Payment"
      }}
    />
  );
}
```

### BlockChanger Payment Integration

#### Uncontrolled Mode (Default)

The form manages its own state internally:

```tsx
import { PaymentForm } from 'mr-payment-headless';

function App() {
  const paymentConfig = {
    sessionToken: 'your_session_token', // Required
    applicationKey: 'your_application_key', // Required
    baseUrl: 'https://dev1.blockchanger.io'
  };

  const handleSuccess = (response) => {
    console.log('Payment successful:', response);
  };

  const handleError = (error) => {
    console.error('Payment failed:', error);
  };

  return (
    <PaymentForm
      config={paymentConfig}
      merchantIdentifier="your_merchant_id" // Required
      redirectUrl="https://your-site.com/success"
      postbackUrl="https://your-site.com/webhook"
      amount="10.00"
      currency="USD"
      onSuccess={handleSuccess}
      onError={handleError}
      onFormDataChange={(formData) => console.log('Form data changed:', formData)}
      submit={{
        text: "Pay $10.00",
        styles: "bg-blue-600 text-white px-4 py-2 rounded"
      }}
    />
  );
}
```

#### Controlled Mode (Optional)

You can control the form values externally:

```tsx
import { PaymentForm } from 'mr-payment-headless';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com'
  });

  const paymentConfig = {
    sessionToken: 'your_session_token', // Required
    applicationKey: 'your_application_key', // Required
    baseUrl: 'https://dev1.blockchanger.io'
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSuccess = (response) => {
    console.log('Payment successful:', response);
  };

  const handleError = (error) => {
    console.error('Payment failed:', error);
  };

  return (
    <PaymentForm
      config={paymentConfig}
      merchantIdentifier="your_merchant_id" // Required
      redirectUrl="https://your-site.com/success"
      postbackUrl="https://your-site.com/webhook"
      amount="10.00"
      currency="USD"
      onSuccess={handleSuccess}
      onError={handleError}
      controlled={{
        values: formData,
        onChange: handleFieldChange,
        onFormDataChange: (formData) => console.log('Controlled form data:', formData)
      }}
      submit={{
        text: "Pay $10.00",
        styles: "bg-blue-600 text-white px-4 py-2 rounded"
      }}
    />
  );
}
```

## Components

### Payment (Basic)

A simple headless payment form component with customizable fields and styling.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `string` | `''` | CSS classes for the form container |
| `fields` | `PaymentFields` | `{}` | Configuration for form fields |
| `submit` | `SubmitConfig` | `{}` | Configuration for submit button |
| `...props` | `HTMLFormAttributes` | - | All standard form HTML attributes |

### PaymentForm (BlockChanger Integration)

A comprehensive payment form component with full BlockChanger API integration, including all required fields for payment processing. Supports both controlled and uncontrolled modes.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `PaymentConfig` | ✅ | BlockChanger API configuration |
| `merchantIdentifier` | `string` | ✅ | Your merchant identifier |
| `redirectUrl` | `string` | ✅ | URL to redirect after payment |
| `postbackUrl` | `string` | ✅ | Webhook URL for payment notifications |
| `amount` | `string` | ❌ | Payment amount (defaults to form input) |
| `currency` | `string` | ❌ | Payment currency (defaults to USD) |
| `description` | `string` | ❌ | Payment description |
| `descriptor` | `string` | ❌ | Payment descriptor |
| `param` | `string` | ❌ | Pass-through parameter |
| `paymentStatus` | `string` | ❌ | Payment status (default: 'approved') |
| `onSuccess` | `(response: PaymentResponse) => void` | ❌ | Success callback |
| `onError` | `(error: string) => void` | ❌ | Error callback |
| `onLoading` | `(loading: boolean) => void` | ❌ | Loading state callback |
| `onFormDataChange` | `(formData: Partial<PaymentRequest>) => void` | ❌ | Form data change callback (uncontrolled mode) |
| `fields` | `PaymentFormFields` | ❌ | Field customization |
| `submit` | `SubmitConfig` | ❌ | Submit button configuration |
| `controlled` | `ControlledConfig` | ❌ | Controlled mode configuration |

#### Controlled Mode Configuration

| Prop | Type | Description |
|------|------|-------------|
| `controlled.values` | `Partial<PaymentRequest>` | Form field values (makes component controlled) |
| `controlled.onChange` | `(field: keyof PaymentRequest, value: string) => void` | Field change handler |
| `controlled.onFormDataChange` | `(formData: Partial<PaymentRequest>) => void` | Form data change callback (controlled mode) |

#### PaymentConfig

```typescript
interface PaymentConfig {
  sessionToken: string;      // Required: Your BlockChanger session token
  applicationKey: string;    // Required: Your BlockChanger application key
  baseUrl?: string;          // Optional: API base URL (defaults to dev1.blockchanger.io)
}
```

#### PaymentResponse

```typescript
interface PaymentResponse {
  success: boolean;
  transaction_id?: string;
  status?: string;
  message?: string;
  error?: string;
  redirect_url?: string;
}
```

## API Functions

### createPayment

Process a payment through the BlockChanger API.

```typescript
import { createPayment, PaymentRequest, PaymentConfig } from 'mr-payment-headless';

const paymentData: PaymentRequest = {
  merchant_identifier: "mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK",
  currency: "USD",
  ccn: "4412397212080000",
  exp_month: "03",
  exp_year: "2027",
  cvc_code: "003",
  email: "demo@gmail.com",
  phone_number: "13059995184",
  ip: "87.228.193.251",
  first_name: "dan",
  last_name: "lorans",
  amount: "5",
  city: "Limassol",
  state: "Cyprus",
  country: "CY",
  region: "Cyprus",
  zip_code: "3041",
  address: "104 greeko st",
  redirect_url: "https://demo.io/",
  postback_url: "https://webhook.site/aa54561b-7dc4-4c14-8f09-ee9959f9e1a6",
  description: "Description Customer",
  descriptor: "Some Payment"
};

const config: PaymentConfig = {
  sessionToken: 'admin_MO687031821sdd1MAWKcwQkOSl',
  applicationKey: 'app_144s9ypK9XoDwHC9rWavGFzpprQhHvMjOEKGP'
};

const response = await createPayment(paymentData, config);
```

### validatePaymentData

Validate payment data before submission.

```typescript
import { validatePaymentData } from 'mr-payment-headless';

const validation = validatePaymentData(paymentData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

### getClientIP

Get the client's IP address for payment processing.

```typescript
import { getClientIP } from 'mr-payment-headless';

const clientIP = await getClientIP();
```

## Field Configuration

### Basic Payment Fields

```tsx
fields: {
  email?: {
    container?: string;        // CSS classes for field container
    label?: {
      text?: string;          // Custom label text
      styles?: string;        // CSS classes for label
    };
    input?: {
      styles?: string;        // CSS classes for input
    };
  };
  password?: { /* same structure */ };
  confirmPassword?: { /* same structure */ };
}
```

### PaymentForm Fields

```tsx
fields: {
  // Personal Information
  firstName?: FieldConfig;
  lastName?: FieldConfig;
  email?: FieldConfig;
  phoneNumber?: FieldConfig;
  
  // Payment Information
  cardNumber?: FieldConfig;
  expiryMonth?: FieldConfig;
  expiryYear?: FieldConfig;
  cvc?: FieldConfig;
  
  // Billing Address
  address?: FieldConfig;
  city?: FieldConfig;
  state?: FieldConfig;
  country?: FieldConfig;
  region?: FieldConfig;
  zipCode?: FieldConfig;
  
  // Payment Details
  amount?: FieldConfig;
  currency?: FieldConfig;
}
```

## Examples

### Basic Usage with Default Styling

```tsx
<Payment />
```

### Custom Styling with Tailwind CSS

```tsx
<PaymentForm
  config={paymentConfig}
  merchantIdentifier="your_merchant_id"
  redirectUrl="https://your-site.com/success"
  postbackUrl="https://your-site.com/webhook"
  fields={{
    firstName: {
      container: "mb-4",
      label: {
        text: "First Name",
        styles: "block text-sm font-medium text-gray-700 mb-1"
      },
      input: {
        styles: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    }
  }}
  submit={{
    text: "Pay Now",
    styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
  }}
/>
```

### Minimal Styling for Custom Design System

```tsx
<PaymentForm
  config={paymentConfig}
  merchantIdentifier="your_merchant_id"
  redirectUrl="https://your-site.com/success"
  postbackUrl="https://your-site.com/webhook"
  fields={{
    firstName: { label: { text: "First Name" } },
    lastName: { label: { text: "Last Name" } },
    email: { label: { text: "Email" } }
  }}
  submit={{
    text: "Submit Payment"
  }}
/>
```

## BlockChanger Integration

### Setup

1. **Get API Credentials**: Contact BlockChanger to get your session token and application key
2. **Configure Merchant**: Set up your merchant identifier and webhook URLs
3. **Test Integration**: Use the provided test card details for testing

### Important Notes

- **Country Codes**: The country field uses ISO 3166-1 alpha-2 country codes (e.g., "US" for United States, "GB" for United Kingdom, "DE" for Germany, "DO" for Dominican Republic)
- **All Countries Included**: Complete list of 195+ countries with proper ISO codes, sorted alphabetically by first letter of country names
- **Currency**: Supported currencies include USD, EUR, GBP, CAD, AUD
- **IP Address**: Client IP is automatically detected and included in the request

### Test Card Details

- **Card Number**: 4412397212080000
- **Expiry**: 03/2027
- **CVC**: 003

### Webhook Handling

Set up your postback URL to handle payment notifications:

```typescript
// Example webhook handler
app.post('/webhook', (req, res) => {
  const { transaction_id, status, amount, currency } = req.body;
  
  if (status === 'approved') {
    // Process successful payment
    console.log(`Payment ${transaction_id} approved for ${amount} ${currency}`);
  } else {
    // Handle failed payment
    console.log(`Payment ${transaction_id} failed`);
  }
  
  res.status(200).send('OK');
});
```

## Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the HEADLESS for production
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

### Building for Distribution

```bash
pnpm build
```

This will create the following files in the `dist` directory:
- `mrpayment-headless.es.js` - ES module bundle
- `mrpayment-headless.umd.js` - UMD bundle
- `mrpayment-headless.d.ts` - TypeScript declarations

## Testing

The HEADLESS includes comprehensive tests for all components:

```bash
pnpm test
```

## Publishing

To publish a new version:

1. Update the version in `package.json`
2. Build the HEADLESS: `pnpm build`
3. Publish to npm: `npm publish`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
