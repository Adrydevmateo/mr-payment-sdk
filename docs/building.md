# Building for Production

This guide explains how to build the MR Payment HEADLESS for production deployment and distribution.

## Overview

The build process creates optimized bundles for different environments and use cases:

- **ES Modules**: Modern bundlers and tree-shaking
- **UMD**: Universal module definition for older environments
- **TypeScript Declarations**: Type definitions for TypeScript users

## Prerequisites

Before building, ensure you have:

1. **Dependencies Installed**:
   ```bash
   pnpm install
   ```

2. **Clean Working Directory**:
   ```bash
   git status  # Check for uncommitted changes
   ```

3. **Tests Passing**:
   ```bash
   pnpm test
   ```

## Build Commands

### Standard Build

Build the HEADLESS for production:

```bash
pnpm build
```

This command:
1. Runs Vite build process
2. Generates TypeScript declarations
3. Copies files to the correct locations
4. Creates optimized bundles

### Type Generation Only

Generate only TypeScript declarations:

```bash
pnpm types
```

### Build with Watch Mode

For development builds with file watching:

```bash
pnpm dev
```

## Build Output

After a successful build, the `dist/` directory contains:

```
dist/
├── mrpayment-headless.es.js          # ES module bundle
├── mrpayment-headless.umd.js         # UMD bundle
├── mrpayment-headless.d.ts           # Main TypeScript declarations
├── payment/
│   └── payment.d.ts             # Component-specific types
└── types/                       # Detailed type declarations
    ├── index.d.ts
    ├── payment.d.ts
    └── *.d.ts.map               # Source maps for types
```

### Bundle Details

#### ES Module Bundle (`mrpayment-headless.es.js`)

- **Size**: ~11KB (gzipped: ~3.3KB)
- **Target**: Modern bundlers (Webpack, Vite, Rollup)
- **Features**: Tree-shaking support, ES2022 syntax
- **Usage**: `import { Payment } from '@mrpayment/headless'`

#### UMD Bundle (`mrpayment-headless.umd.js`)

- **Size**: ~7.8KB (gzipped: ~3KB)
- **Target**: Browser globals, older bundlers
- **Features**: Universal compatibility
- **Usage**: `window.MrPaymentHEADLESS.Payment`

#### TypeScript Declarations

- **Main**: `mrpayment-headless.d.ts`
- **Component**: `payment/payment.d.ts`
- **Detailed**: `types/` directory with source maps

## Build Configuration

### Vite Configuration

The build is configured in `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      root: "src",
      outDir: "dist",
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "mrpayment-headless",
      formats: ["es", "umd"],
      fileName: (format) => `mrpayment-headless.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
```

### TypeScript Configuration

Type generation uses `tsconfig.types.json`:

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist/types"
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test/**/*"]
}
```

## Build Process Details

### 1. Source Compilation

Vite compiles TypeScript/JSX source files:
- Transpiles to ES2022
- Handles JSX transformation
- Resolves module imports

### 2. Bundle Generation

Rollup creates optimized bundles:
- **ES Module**: Modern module format
- **UMD**: Universal module definition
- Tree-shaking for unused code removal

### 3. Type Declaration Generation

TypeScript compiler generates `.d.ts` files:
- Extracts type information from source
- Creates declaration maps for debugging
- Organizes types in a logical structure

### 4. Post-Build Processing

Custom scripts handle final steps:
- Copy type declarations to main dist folder
- Rename main declaration file
- Verify build integrity

## Build Optimization

### Tree Shaking

The ES module bundle supports tree shaking:

```tsx
// Only Payment component is included in the final bundle
import { Payment } from '@mrpayment/headless';

// Unused imports are removed
import { Payment, UnusedComponent } from '@mrpayment/headless';
```

### External Dependencies

React and React DOM are externalized:

```ts
rollupOptions: {
  external: ["react", "react-dom"],
  output: {
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
}
```

This ensures:
- Smaller bundle sizes
- No duplicate React instances
- Proper peer dependency handling

### Code Splitting

Future versions may support code splitting for:
- Different payment field types
- Validation utilities
- Integration helpers

## Environment-Specific Builds

### Development Build

```bash
NODE_ENV=development pnpm build
```

- Includes source maps
- Less optimization
- Faster build times

### Production Build

```bash
NODE_ENV=production pnpm build
```

- Full optimization
- No source maps
- Minified output

## Build Verification

### Automated Checks

The build process includes several verification steps:

1. **TypeScript Compilation**: Ensures type safety
2. **Bundle Generation**: Creates valid JavaScript
3. **File Structure**: Verifies correct output organization

### Manual Verification

After building, verify the output:

```bash
# Check bundle sizes
ls -la dist/*.js

# Verify TypeScript declarations
pnpm types

# Test the built package
node -e "console.log(require('./dist/mrpayment-headless.umd.js'))"
```

### Bundle Analysis

Analyze bundle contents:

```bash
# Install bundle analyzer
pnpm add -D rollup-plugin-visualizer

# Add to vite config and rebuild
pnpm build
```

## Troubleshooting

### Common Build Issues

#### 1. TypeScript Errors

**Error**: Type compilation fails

**Solution**:
```bash
# Check for type errors
pnpm types

# Fix type issues in source files
# Rebuild
pnpm build
```

#### 2. Bundle Size Issues

**Error**: Bundle is too large

**Solution**:
- Check for unnecessary dependencies
- Verify external dependencies are properly configured
- Use bundle analyzer to identify large modules

#### 3. Missing Files

**Error**: Expected files not in dist/

**Solution**:
```bash
# Clean and rebuild
rm -rf dist/
pnpm build
```

#### 4. Import Errors

**Error**: Cannot resolve module

**Solution**:
- Check import paths in source files
- Verify TypeScript path mapping
- Ensure all dependencies are declared

### Performance Optimization

#### Bundle Size Optimization

1. **Analyze Dependencies**:
   ```bash
   pnpm add -D webpack-bundle-analyzer
   ```

2. **Remove Unused Code**:
   - Use tree shaking effectively
   - Externalize large dependencies
   - Split code into logical chunks

3. **Optimize Imports**:
   ```tsx
   // Good - tree-shakeable
   import { Payment } from '@mrpayment/headless';
   
   // Avoid - imports everything
   import * as HEADLESS from '@mrpayment/headless';
   ```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Run tests
      run: pnpm test
    
    - name: Build
      run: pnpm build
    
    - name: Verify build
      run: |
        ls -la dist/
        node -e "console.log('Build successful')"
```

## Next Steps

After building:

1. [Publish to NPM](./publishing.md)
2. [Test the published package](./testing-guide.md)
3. [Update documentation](./contributing.md)
4. [Monitor bundle performance](./monitoring.md) 