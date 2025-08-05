# Publishing Guide

This guide explains how to publish the MR Payment HEADLESS to npm.

## Prerequisites

1. **NPM Account**: Ensure you have an npm account and are logged in
2. **Package Name**: The package name `mr-payment-headless` is available
3. **Build**: All tests pass and the build is successful

## Publishing Steps

### 1. Verify Current Status

```bash
# Check if you're logged in to npm
npm whoami

# Run tests to ensure everything works
pnpm test

# Build the package
pnpm build

# Check what will be published
npm pack --dry-run
```

### 2. Update Version (if needed)

```bash
# For patch updates (bug fixes)
pnpm version:patch

# For minor updates (new features)
pnpm version:minor

# For major updates (breaking changes)
pnpm version:major
```

### 3. Publish to NPM

```bash
# Publish publicly (recommended)
pnpm publish:public

# Or publish privately (requires npm paid plan)
pnpm publish:private
```

### 4. Verify Publication

```bash
# Check the published package
npm view mr-payment-headless

# Install and test the published package
npm install mr-payment-headless
```

## Package Contents

The published package includes:
- `README.md` - Documentation
- `package.json` - Package metadata
- `dist/mrpayment-headless.es.js` - ES module bundle
- `dist/mrpayment-headless.umd.js` - UMD bundle
- `dist/mrpayment-headless.d.ts` - TypeScript declarations
- `dist/payment/payment.d.ts` - Component type declarations

## Configuration Files

- `.npmrc` - NPM configuration for public publishing
- `.npmignore` - Files to exclude from the package
- `package.json` - Package metadata and scripts

## Troubleshooting

### Common Issues

1. **Package name already exists**: Choose a different package name
2. **Authentication error**: Run `npm login` to authenticate
3. **Build errors**: Ensure all tests pass before publishing
4. **Version conflicts**: Update the version number before publishing

### Support

For issues with publishing, check:
- [NPM Publishing Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [NPM CLI Documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish) 