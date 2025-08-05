# MR Payment HEADLESS - Complete Guide

This document provides a comprehensive overview of the MR Payment HEADLESS and how to use it effectively.

## 🚀 Quick Start

If you want to get up and running immediately:

1. **Install**: `npm install @mrpayment/headless`
2. **Import**: `import { Payment } from '@mrpayment/headless'`
3. **Use**: `<Payment submit={{ action: handlePayment }} />`

For detailed setup, see [Quick Start Guide](./quick-start.md).

## 📚 Documentation Structure

### Getting Started
- **[Installation](./installation.md)** - How to install and set up the HEADLESS
- **[Quick Start](./quick-start.md)** - Get up and running in minutes
- **[Getting Started](./getting-started.md)** - Comprehensive setup and usage guide
- **[Development](./development.md)** - How to run and develop the HEADLESS locally

### Core Documentation
- **[Components](./components/payment.md)** - Complete Payment component documentation
- **[Building](./building.md)** - How to build the HEADLESS for production
- **[Publishing](./publishing.md)** - How to publish new versions to NPM

### Reference
- **[Changelog](./changelog.md)** - Version history and changes
- **[README](./README.md)** - Main documentation index

## 🎯 Key Features

### Headless Design
- **No built-in styling** - Complete control over appearance
- **Flexible configuration** - Customize every aspect
- **Framework agnostic** - Works with any React setup

### TypeScript Support
- **Full type safety** - Comprehensive TypeScript definitions
- **IntelliSense support** - Great developer experience
- **Type exports** - Import types for your own components

### Accessibility
- **Semantic HTML** - Proper form structure
- **Keyboard navigation** - Full keyboard support
- **Screen reader friendly** - ARIA labels and associations

### Performance
- **Tree shaking** - Only include what you use
- **Small bundle size** - ~11KB ES, ~7.8KB UMD
- **Optimized builds** - Production-ready bundles

## 🔧 Usage Examples

### Basic Usage

```tsx
import { Payment } from '@mrpayment/headless';

function App() {
  const handlePayment = () => {
    console.log('Payment submitted!');
  };

  return (
    <Payment
      submit={{
        action: handlePayment,
        text: 'Pay Now'
      }}
    />
  );
}
```

### Styled with Tailwind CSS

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
    }
  }}
  submit={{
    action: handlePayment,
    text: "Process Payment",
    styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md"
  }}
/>
```

### With Form Validation

```tsx
import { useState } from 'react';
import { Payment } from '@mrpayment/headless';

function PaymentForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Process payment
    console.log('Processing payment for:', formData.email);
  };

  return (
    <Payment
      fields={{
        email: {
          input: {
            onChange: (e) => setFormData({...formData, email: e.target.value}),
            name: "email"
          }
        },
        password: {
          input: {
            onChange: (e) => setFormData({...formData, password: e.target.value}),
            name: "password"
          }
        },
        confirmPassword: {
          input: {
            onChange: (e) => setFormData({...formData, confirmPassword: e.target.value}),
            name: "confirmPassword"
          }
        }
      }}
      submit={{
        action: handleSubmit,
        text: "Submit Payment"
      }}
    />
  );
}
```

## 🛠 Development Workflow

### Local Development

```bash
# Clone and install
git clone https://github.com/your-org/mr-payment-headless.git
cd mr-payment-headless
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

### Publishing Process

```bash
# Update version
pnpm version:patch  # or minor/major

# Build and test
pnpm build
pnpm test

# Publish to NPM
pnpm publish:public
```

## 📦 Package Information

### Bundle Details
- **ES Module**: `mrpayment-headless.es.js` (~11KB gzipped)
- **UMD Bundle**: `mrpayment-headless.umd.js` (~7.8KB gzipped)
- **TypeScript**: Full type definitions included

### Dependencies
- **Peer Dependencies**: React 19.1.0+, React DOM 19.1.0+
- **Runtime Dependencies**: None (headless design)
- **Dev Dependencies**: TypeScript, Vite, Vitest, ESLint

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **ES2022 Support**: Modern JavaScript features
- **React 19**: Latest React features and hooks

## 🎨 Styling Options

### CSS Frameworks
- **Tailwind CSS**: Utility-first approach
- **CSS Modules**: Scoped styling
- **Styled Components**: CSS-in-JS
- **Custom CSS**: Traditional stylesheets

### Responsive Design
```tsx
<Payment
  container="w-full max-w-md mx-auto p-4 md:p-6"
  fields={{
    email: {
      input: {
        styles: "w-full px-3 py-2 text-sm md:text-base"
      }
    }
  }}
/>
```

### Dark Mode
```tsx
<Payment
  container="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  fields={{
    email: {
      input: {
        styles: "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      }
    }
  }}
/>
```

## 🧪 Testing

### Component Testing
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Payment } from '@mrpayment/headless';

test('renders payment form', () => {
  render(<Payment />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
});

test('calls submit action', () => {
  const mockSubmit = jest.fn();
  render(<Payment submit={{ action: mockSubmit }} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(mockSubmit).toHaveBeenCalled();
});
```

### Integration Testing
- Test with real payment processors
- Validate form data handling
- Test error scenarios
- Verify accessibility compliance

## 🔒 Security Considerations

### Best Practices
- **Input Validation**: Always validate form data
- **HTTPS**: Use secure connections for payment processing
- **Error Handling**: Don't expose sensitive information
- **Accessibility**: Ensure forms are accessible to all users

### Data Handling
- **No Data Storage**: HEADLESS doesn't store sensitive data
- **Form Submission**: Handle data securely in your application
- **Validation**: Implement proper client and server-side validation

## 🚀 Performance Optimization

### Bundle Optimization
- **Tree Shaking**: Only import what you need
- **Code Splitting**: Split large applications
- **Lazy Loading**: Load components on demand

### Runtime Performance
- **Memoization**: Use React.memo for expensive components
- **Event Handling**: Optimize event handlers
- **State Management**: Use efficient state patterns

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Standards
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Tests**: Comprehensive test coverage

## 📞 Support

### Getting Help
- **Documentation**: Start with the guides above
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Email**: Contact the team directly

### Community
- **GitHub**: [Repository](https://github.com/your-org/mr-payment-headless)
- **NPM**: [Package](https://www.npmjs.com/package/@mrpayment/headless)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/mr-payment-headless/discussions)

## 📈 Roadmap

### Upcoming Features
- **Additional Fields**: Credit card, billing address
- **Validation Utilities**: Built-in validation helpers
- **Error Handling**: Enhanced error management
- **Performance**: Further optimizations

### Long-term Goals
- **More Components**: Additional payment-related components
- **Framework Support**: Support for other frameworks
- **Advanced Features**: Complex payment flows
- **Enterprise Features**: Advanced customization options

---

## 🎉 Getting Started Checklist

- [ ] Install the HEADLESS: `npm install @mrpayment/headless`
- [ ] Import the component: `import { Payment } from '@mrpayment/headless'`
- [ ] Create a basic form: `<Payment submit={{ action: handlePayment }} />`
- [ ] Add styling to match your design
- [ ] Implement payment processing logic
- [ ] Add form validation
- [ ] Test thoroughly
- [ ] Deploy to production

For detailed instructions on any of these steps, refer to the specific documentation sections above. 