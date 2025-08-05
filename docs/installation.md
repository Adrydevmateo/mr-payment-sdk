# Installation Guide

This guide will help you install and set up MR Payment SDK in your React application.

## Prerequisites

Before installing MR Payment SDK, make sure you have:

- **Node.js** 18.0.0 or higher
- **React** 19.1.0 or higher
- **React DOM** 19.1.0 or higher

## Installation

### Using npm

```bash
npm install @mrpayment/sdk
```

### Using yarn

```bash
yarn add @mrpayment/sdk
```

### Using pnpm

```bash
pnpm add @mrpayment/sdk
```

## Peer Dependencies

MR Payment SDK has the following peer dependencies that must be installed in your project:

```bash
npm install react react-dom
```

**Note**: Make sure you're using React 19.1.0 or higher for the best compatibility.

## TypeScript Support

The SDK is built with TypeScript and includes type definitions. If you're using TypeScript, no additional setup is required - the types will be automatically available.

## Verification

To verify the installation, you can create a simple test component:

```tsx
import { Payment } from '@mrpayment/sdk';

function TestComponent() {
  return (
    <Payment
      submit={{
        action: () => console.log('Payment submitted'),
        text: 'Test Payment'
      }}
    />
  );
}
```

If this renders without errors, your installation is successful!

## Troubleshooting

### Common Issues

#### 1. React Version Mismatch

**Error**: `Invalid hook call` or similar React-related errors

**Solution**: Ensure you're using React 19.1.0 or higher:

```bash
npm list react react-dom
```

#### 2. TypeScript Errors

**Error**: Type definitions not found

**Solution**: Make sure you have TypeScript installed:

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

#### 3. Build Errors

**Error**: Module resolution issues

**Solution**: Check your bundler configuration. The SDK supports:
- ES modules (recommended)
- UMD bundles
- CommonJS (via bundler transformation)

### Getting Help

If you encounter any issues during installation:

1. Check the [GitHub Issues](https://github.com/your-org/mr-payment-sdk/issues)
2. Review the [Troubleshooting Guide](./troubleshooting.md)
3. Create a new issue with detailed information about your setup

## Next Steps

After successful installation:

1. Read the [Quick Start Guide](./quick-start.md) to get up and running
2. Explore the [Component Documentation](./components/payment.md)
3. Check out [Integration Examples](./integration-examples.md) for real-world usage 