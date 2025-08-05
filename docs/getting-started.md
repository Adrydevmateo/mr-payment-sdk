# Getting Started

This comprehensive guide will walk you through setting up, running, and publishing the MR Payment HEADLESS.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Development Server](#running-the-development-server)
4. [Testing](#testing)
5. [Building](#building)
6. [Publishing](#publishing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** 18.0.0 or higher
- **pnpm** (recommended) or npm/yarn
- **Git** for version control

### Verify Installation

```bash
# Check Node.js version
node --version  # Should be 18.0.0 or higher

# Check pnpm version
pnpm --version  # Should be 7.0.0 or higher

# Check Git version
git --version
```

### NPM Account (for publishing)

If you plan to publish the package:

1. Create an NPM account at [npmjs.com](https://www.npmjs.com)
2. Verify your email address
3. Enable two-factor authentication (recommended)
4. Get access to the `@mrpayment` organization

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/mr-payment-headless.git
cd mr-payment-headless
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Verify Installation

```bash
# Check that all dependencies are installed
pnpm list

# Verify the project structure
ls -la
```

## Running the Development Server

### Start Development Server

```bash
pnpm dev
```

This will:
- Start the Vite development server
- Open your browser to `http://localhost:5173`
- Enable hot module replacement (HMR)
- Show the Payment component demo

### Development Server Features

- **Hot Reload**: Changes to source files automatically refresh the browser
- **Error Overlay**: Errors are displayed in the browser
- **Source Maps**: Debug with original source code
- **Fast Refresh**: React components update without losing state

### Customizing Development

You can customize the development server:

```bash
# Run on a different port
pnpm dev --port 3000

# Open browser automatically
pnpm dev --open

# Run in host mode (accessible from other devices)
pnpm dev --host
```

### Development Workflow

1. **Make Changes**: Edit files in the `src/` directory
2. **See Updates**: Browser automatically refreshes
3. **Test Changes**: Use the demo app to test functionality
4. **Check Console**: Monitor for errors and warnings

## Testing

### Run All Tests

```bash
pnpm test
```

### Test Commands

```bash
# Run tests in watch mode (recommended for development)
pnpm test --watch

# Run tests with coverage
pnpm test:coverage

# Run tests with UI (if available)
pnpm test:ui

# Run specific test file
pnpm test payment.test.tsx
```

### Test Coverage

The project includes comprehensive test coverage:

- **Component Tests**: Test component rendering and behavior
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Ensure components are accessible

### Writing Tests

Tests are located in `src/**/*.test.tsx` files:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Payment } from '@mrpayment/headless';

describe('Payment Component', () => {
  it('renders payment form', () => {
    render(<Payment />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
```

## Building

### Build for Production

```bash
pnpm build
```

This creates optimized bundles in the `dist/` directory:

- `mrpayment-headless.es.js` - ES module bundle
- `mrpayment-headless.umd.js` - UMD bundle
- `mrpayment-headless.d.ts` - TypeScript declarations

### Build Verification

After building, verify the output:

```bash
# Check build output
ls -la dist/

# Verify bundle sizes
du -h dist/*.js

# Test the built package
node -e "console.log(require('./dist/mrpayment-headless.umd.js'))"
```

### Build Commands

```bash
# Build only
pnpm build

# Generate TypeScript declarations only
pnpm types

# Build with different environment
NODE_ENV=production pnpm build
```

## Publishing

### Pre-Publishing Checklist

Before publishing, ensure:

1. **Tests Pass**: `pnpm test`
2. **Build Succeeds**: `pnpm build`
3. **Linting Passes**: `pnpm lint`
4. **Documentation Updated**: Update README and changelog
5. **Version Updated**: Use appropriate version command

### Version Management

Choose the appropriate version increment:

```bash
# Patch version (bug fixes)
pnpm version:patch  # 0.0.1 -> 0.0.2

# Minor version (new features)
pnpm version:minor  # 0.0.1 -> 0.1.0

# Major version (breaking changes)
pnpm version:major  # 0.0.1 -> 1.0.0
```

### Publishing Process

#### 1. Update Version

```bash
pnpm version:patch  # or minor/major
```

#### 2. Build the Package

```bash
pnpm build
```

#### 3. Test the Build

```bash
# Verify build output
ls -la dist/

# Check bundle sizes
du -h dist/*.js
```

#### 4. Publish to NPM

```bash
# For public package
pnpm publish:public

# For private package (if applicable)
pnpm publish:private
```

#### 5. Verify Publication

```bash
# Check published package
npm view @mrpayment/headless

# Install and test in a new project
npm install @mrpayment/headless
```

### Publishing Scripts

The project includes several publishing scripts:

```json
{
  "scripts": {
    "publish:private": "npm publish --access restricted",
    "publish:public": "npm publish --access public",
    "version:patch": "npm version patch",
    "version:minor": "npm version minor",
    "version:major": "npm version major"
  }
}
```

### Automated Publishing Workflow

For consistent publishing:

1. **Create Release Branch**:
   ```bash
   git checkout -b release/v1.0.0
   ```

2. **Update Version and Build**:
   ```bash
   pnpm version:patch
   pnpm build
   ```

3. **Test Everything**:
   ```bash
   pnpm test
   pnpm lint
   ```

4. **Commit and Push**:
   ```bash
   git add .
   git commit -m "chore: prepare for release v1.0.0"
   git push origin release/v1.0.0
   ```

5. **Create Pull Request**: Merge to main branch

6. **Publish**: After PR approval, publish to NPM

## Troubleshooting

### Common Issues

#### Development Server Issues

**Problem**: Server won't start

**Solutions**:
```bash
# Check if port is in use
lsof -i :5173

# Kill process using the port
kill -9 <PID>

# Try different port
pnpm dev --port 3000
```

**Problem**: Hot reload not working

**Solutions**:
- Check file watchers limit: `ulimit -n`
- Restart the development server
- Clear browser cache

#### Build Issues

**Problem**: Build fails with TypeScript errors

**Solutions**:
```bash
# Check for type errors
pnpm types

# Fix type issues in source files
# Rebuild
pnpm build
```

**Problem**: Bundle size too large

**Solutions**:
- Check for unnecessary dependencies
- Verify external dependencies are configured
- Use bundle analyzer to identify large modules

#### Publishing Issues

**Problem**: Authentication errors

**Solutions**:
```bash
# Login to NPM
npm login

# Check authentication
npm whoami
```

**Problem**: Version already exists

**Solutions**:
```bash
# Increment version
pnpm version:patch

# Or unpublish (within 72 hours)
npm unpublish @mrpayment/headless@1.0.0
```

**Problem**: Permission errors

**Solutions**:
- Ensure you have access to `@mrpayment` organization
- Check NPM permissions
- Contact organization admin

### Performance Issues

#### Slow Build Times

**Solutions**:
- Use pnpm for faster dependency resolution
- Enable build caching
- Optimize TypeScript configuration

#### Large Bundle Sizes

**Solutions**:
- Externalize large dependencies
- Use tree shaking effectively
- Split code into logical chunks

### Getting Help

If you encounter issues:

1. **Check Documentation**: Review relevant docs
2. **Search Issues**: Look for similar problems on GitHub
3. **Create Issue**: Report bugs with detailed information
4. **Ask Questions**: Use GitHub Discussions

## Next Steps

After getting started:

1. **Explore Components**: Read [Component Documentation](./components/payment.md)
2. **Learn Styling**: Check [Styling Guide](./styling-guide.md)
3. **See Examples**: Review [Integration Examples](./integration-examples.md)
4. **Contribute**: Read [Contributing Guide](./contributing.md)

## Support

- 📚 [Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/your-org/mr-payment-headless/issues)
- 💬 [Discussions](https://github.com/your-org/mr-payment-headless/discussions)
- 📧 [Contact Team](mailto:team@mrpayment.com) 