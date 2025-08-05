# Development Setup

This guide explains how to set up the MR Payment SDK for local development, including running the development server, testing, and building the project.

## Prerequisites

Before you begin development, ensure you have:

- **Node.js** 18.0.0 or higher
- **pnpm** (recommended) or npm/yarn
- **Git** for version control

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/mr-payment-sdk.git
cd mr-payment-sdk
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Verify Installation

Check that all dependencies are installed correctly:

```bash
pnpm list
```

## Development Commands

### Running the Development Server

Start the development server to see the SDK in action:

```bash
pnpm dev
```

This will:
- Start Vite development server
- Open the demo application in your browser
- Enable hot module replacement (HMR)
- Show the Payment component in action

**Default URL**: `http://localhost:5173`

### Running Tests

#### Run All Tests

```bash
pnpm test
```

#### Run Tests in Watch Mode

```bash
pnpm test --watch
```

#### Run Tests with Coverage

```bash
pnpm test:coverage
```

#### Run Tests with UI

```bash
pnpm test:ui
```

### Linting

Check code quality and style:

```bash
pnpm lint
```

### Building

Build the SDK for production:

```bash
pnpm build
```

This creates:
- `dist/mrpayment-sdk.es.js` - ES module bundle
- `dist/mrpayment-sdk.umd.js` - UMD bundle
- `dist/mrpayment-sdk.d.ts` - TypeScript declarations

### Type Generation

Generate TypeScript declarations:

```bash
pnpm types
```

## Project Structure

```
mr-payment-sdk/
├── src/
│   ├── payment/
│   │   ├── payment.tsx          # Main payment component
│   │   └── payment.test.tsx     # Component tests
│   ├── test/
│   │   └── setup.ts            # Test configuration
│   ├── index.ts                # SDK exports
│   ├── App.tsx                 # Demo application
│   └── main.tsx               # Entry point
├── docs/                       # Documentation
├── dist/                       # Build output
├── package.json               # Project configuration
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

## Development Workflow

### 1. Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Run tests to ensure nothing is broken:
   ```bash
   pnpm test
   ```

4. Check linting:
   ```bash
   pnpm lint
   ```

5. Test the development server:
   ```bash
   pnpm dev
   ```

### 2. Testing Your Changes

The project includes comprehensive tests. When adding new features:

1. Write tests in the corresponding `.test.tsx` file
2. Ensure all tests pass: `pnpm test`
3. Maintain good test coverage

### 3. Building and Testing

Before committing:

1. Build the project:
   ```bash
   pnpm build
   ```

2. Verify the build output in `dist/`

3. Test the built package locally if needed

## Configuration Files

### Vite Configuration (`vite.config.ts`)

- Builds the SDK as a library
- Generates ES modules and UMD bundles
- Excludes React and React DOM from the bundle
- Generates TypeScript declarations

### TypeScript Configuration

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.types.json` - Type declaration generation

### ESLint Configuration (`eslint.config.js`)

- TypeScript and React rules
- Enforces code quality standards
- Integrates with Vite

## Debugging

### Development Server Issues

If the development server doesn't start:

1. Check if port 5173 is available
2. Verify all dependencies are installed
3. Check the console for error messages

### Test Issues

If tests are failing:

1. Ensure all test dependencies are installed
2. Check that the test setup file is correct
3. Verify the testing environment configuration

### Build Issues

If the build fails:

1. Check TypeScript errors: `pnpm types`
2. Verify all imports are correct
3. Ensure all dependencies are properly declared

## Environment Variables

The project uses the following environment variables:

- `NODE_ENV` - Set to `development` for dev builds, `production` for production builds
- `VITE_*` - Vite-specific environment variables (if needed)

## IDE Setup

### Recommended Extensions

- **TypeScript** - For type checking and IntelliSense
- **ESLint** - For code linting
- **Prettier** - For code formatting
- **Vitest** - For test running and debugging

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Contributing

When contributing to the project:

1. Follow the [Code Style Guide](./code-style.md)
2. Write tests for new features
3. Update documentation as needed
4. Follow the [Contributing Guide](./contributing.md)

## Next Steps

- Read the [Architecture Overview](./architecture.md) to understand the codebase
- Check out the [Component Documentation](./components/payment.md)
- Review the [Testing Standards](./testing-standards.md) 