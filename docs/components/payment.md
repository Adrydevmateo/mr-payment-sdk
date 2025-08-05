# Payment Component

The `Payment` component is the core component of MR Payment SDK. It provides a headless payment form that you can fully customize with your own styling and integrate with any payment processing system.

## Overview

The Payment component renders a form with email, password, and confirm password fields. It's designed to be completely unstyled, giving you full control over the appearance while providing robust functionality and accessibility features.

## Basic Usage

```tsx
import { Payment } from '@mrpayment/sdk';

function MyPaymentForm() {
  const handlePaymentSubmit = () => {
    // Handle payment processing logic
    console.log('Payment submitted');
  };

  return (
    <Payment
      submit={{
        action: handlePaymentSubmit,
        text: 'Process Payment'
      }}
    />
  );
}
```

## Props

### PaymentProps

The component accepts the following props:

```tsx
interface PaymentProps extends React.HTMLAttributes<HTMLFormElement> {
  container?: string;
  fields?: {
    email?: FieldConfig;
    password?: FieldConfig;
    confirmPassword?: FieldConfig;
  };
  submit?: SubmitConfig;
}
```

### FieldConfig

```tsx
interface FieldConfig {
  container?: string;        // CSS classes for field container
  label?: {
    text?: string;          // Custom label text
    styles?: string;        // CSS classes for label
  };
  input?: {
    styles?: string;        // CSS classes for input
  };
}
```

### SubmitConfig

```tsx
interface SubmitConfig {
  action?: () => void;      // Function called on form submission
  text?: string;            // Button text
  styles?: string;          // CSS classes for submit button
}
```

## Examples

### Basic Form

```tsx
<Payment />
```

Renders a form with default labels and no styling.

### Custom Styling with Tailwind CSS

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
    action: () => console.log('Payment processed'),
    text: "Pay Now",
    styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }}
/>
```

### Minimal Styling

```tsx
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

### Custom Form Attributes

```tsx
<Payment
  id="payment-form"
  className="my-custom-form"
  onSubmit={(e) => {
    // Custom form handling
    console.log('Form submitted');
  }}
  submit={{
    action: handlePayment,
    text: "Process Payment"
  }}
/>
```

## Accessibility Features

The Payment component includes several accessibility features:

### Form Labels

- Each input field has a proper `label` element
- Labels are associated with inputs using `htmlFor` and `id` attributes
- Labels can be customized via the `fields` prop

### Unique IDs

- Each form instance generates unique IDs for form elements
- Uses React's `useId()` hook to ensure uniqueness
- Prevents ID conflicts when multiple forms are on the same page

### Form Structure

- Proper `form` element with `onSubmit` handling
- Semantic HTML structure
- Submit button with proper `type="submit"`

### Keyboard Navigation

- All form elements are keyboard accessible
- Tab order follows logical form flow
- Enter key submits the form

## Form Validation

The component provides basic HTML5 validation:

- Email field validates email format
- Password fields are properly typed as `password`
- Form prevents submission if validation fails

For custom validation, you can:

1. Add validation logic in the submit action
2. Use the `onSubmit` prop for custom form handling
3. Add validation attributes to inputs via the `fields` prop

## Integration Examples

### With Payment Processor

```tsx
import { Payment } from '@mrpayment/sdk';
import { processPayment } from './payment-service';

function PaymentForm() {
  const handlePayment = async () => {
    try {
      const formData = new FormData(document.getElementById('payment-form'));
      const email = formData.get('email');
      const password = formData.get('password');
      
      await processPayment({ email, password });
      console.log('Payment successful');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <Payment
      id="payment-form"
      submit={{
        action: handlePayment,
        text: "Process Payment"
      }}
    />
  );
}
```

### With Form State Management

```tsx
import { Payment } from '@mrpayment/sdk';
import { useState } from 'react';

function PaymentForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Validate passwords match
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
            styles: "w-full px-3 py-2 border rounded",
            onChange: handleInputChange,
            name: "email"
          }
        },
        password: {
          input: {
            styles: "w-full px-3 py-2 border rounded",
            onChange: handleInputChange,
            name: "password"
          }
        },
        confirmPassword: {
          input: {
            styles: "w-full px-3 py-2 border rounded",
            onChange: handleInputChange,
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

## Styling Guidelines

### CSS Classes

The component accepts CSS classes through the `container`, `fields`, and `submit` props. You can use any CSS framework or custom styles:

- **Tailwind CSS**: Use utility classes
- **CSS Modules**: Import and use class names
- **Styled Components**: Pass styled component classes
- **Custom CSS**: Use your own class names

### Responsive Design

Make your forms responsive by using responsive CSS classes:

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

### Dark Mode Support

Add dark mode support with conditional classes:

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

## Best Practices

### 1. Always Provide Submit Action

```tsx
// Good
<Payment submit={{ action: handlePayment }} />

// Avoid
<Payment />
```

### 2. Use Semantic Labels

```tsx
// Good
<Payment
  fields={{
    email: {
      label: { text: "Email Address" }
    }
  }}
/>

// Avoid
<Payment
  fields={{
    email: {
      label: { text: "Enter your email here" }
    }
  }}
/>
```

### 3. Provide Clear Submit Button Text

```tsx
// Good
<Payment submit={{ text: "Process Payment" }} />

// Avoid
<Payment submit={{ text: "Submit" }} />
```

### 4. Handle Form Submission Properly

```tsx
const handlePayment = async () => {
  try {
    // Show loading state
    setIsLoading(true);
    
    // Process payment
    await processPayment();
    
    // Handle success
    showSuccessMessage();
  } catch (error) {
    // Handle error
    showErrorMessage(error);
  } finally {
    setIsLoading(false);
  }
};
```

## Troubleshooting

### Common Issues

#### Form Not Submitting

- Ensure the submit action is provided
- Check that the form has valid data
- Verify no JavaScript errors in console

#### Styling Not Applied

- Check that CSS classes are correct
- Ensure CSS is loaded in your application
- Verify class names match your CSS framework

#### Accessibility Issues

- Ensure labels are properly associated with inputs
- Check that form elements are keyboard accessible
- Verify screen reader compatibility

## API Reference

### PaymentProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `string` | `''` | CSS classes for the form container |
| `fields` | `PaymentFields` | `{}` | Configuration for form fields |
| `submit` | `SubmitConfig` | `{}` | Configuration for submit button |
| `...props` | `HTMLFormAttributes` | - | All standard form HTML attributes |

### PaymentFields

```tsx
interface PaymentFields {
  email?: FieldConfig;
  password?: FieldConfig;
  confirmPassword?: FieldConfig;
}
```

### FieldConfig

```tsx
interface FieldConfig {
  container?: string;
  label?: {
    text?: string;
    styles?: string;
  };
  input?: {
    styles?: string;
  };
}
```

### SubmitConfig

```tsx
interface SubmitConfig {
  action?: () => void;
  text?: string;
  styles?: string;
}
``` 