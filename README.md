# MR Payment SDK

A headless React payment SDK built with TypeScript and Vite. This SDK provides flexible, unstyled payment components that you can customize with your own styling and integrate into any React application.

## Installation

```bash
npm install @mrpayment/sdk
# or
yarn add @mrpayment/sdk
# or
pnpm add @mrpayment/sdk
```

## Peer Dependencies

This SDK requires React 19.1.0 or higher. Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom
```

## Usage

### Import Components

```tsx
import { Payment } from '@mrpayment/sdk';

function App() {
  const handlePaymentSubmit = () => {
    // Handle payment processing logic here
    console.log('Payment submitted');
  };

  return (
    <div>
      <Payment
        submit={{
          action: handlePaymentSubmit,
          text: "Process Payment"
        }}
      />
    </div>
  );
}
```

## Components

### Payment

A headless payment form component with customizable fields and styling.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `string` | `''` | CSS classes for the form container |
| `fields` | `PaymentFields` | `{}` | Configuration for form fields |
| `submit` | `SubmitConfig` | `{}` | Configuration for submit button |
| `...props` | `HTMLFormAttributes` | - | All standard form HTML attributes |

#### Field Configuration

Each field can be configured with:

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

#### Submit Configuration

```tsx
submit: {
  action?: () => void;        // Function called on form submission
  text?: string;              // Button text
  styles?: string;            // CSS classes for submit button
}
```

#### Examples

```tsx
// Basic usage with default styling
<Payment />

// Custom styling with Tailwind CSS
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
    }
  }}
  submit={{
    action: () => console.log('Payment processed'),
    text: "Pay Now",
    styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }}
/>

// Minimal styling for custom design system
<Payment
  fields={{
    email: {
      label: { text: "Email" }
    },
    password: {
      label: { text: "Password" }
    }
  }}
  submit={{
    action: handlePayment,
    text: "Submit Payment"
  }}
/>
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
- `pnpm build` - Build the SDK for production
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

### Building for Distribution

```bash
pnpm build
```

This will create the following files in the `dist` directory:
- `mrpayment-sdk.es.js` - ES module bundle
- `mrpayment-sdk.umd.js` - UMD bundle
- `mrpayment-sdk.d.ts` - TypeScript declarations

## Testing

The SDK includes comprehensive tests for all components:

```bash
pnpm test
```

## Publishing

To publish a new version:

1. Update the version in `package.json`
2. Build the SDK: `pnpm build`
3. Publish to npm: `npm publish`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
