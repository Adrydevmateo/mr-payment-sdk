# Changelog

All notable changes to MR Payment HEADLESS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of MR Payment HEADLESS
- Payment component with customizable fields
- TypeScript support with full type definitions
- Headless design with no built-in styling
- Comprehensive test coverage
- Accessibility features (proper labels, unique IDs, keyboard navigation)

### Changed
- Restructured project from UI library to headless payment HEADLESS
- Removed UI components (Button, Link, Table)
- Removed Storybook dependencies and configuration
- Updated package name to `@mrpayment/headless`

### Fixed
- Fixed `useId()` hook usage in Payment component
- Resolved TypeScript compilation issues
- Fixed test configuration and setup

## [0.0.1] - 2024-01-XX

### Added
- **Payment Component**: Core payment form component
  - Email, password, and confirm password fields
  - Fully customizable styling via props
  - Form submission handling
  - Accessibility features
  - TypeScript support

- **Build System**:
  - Vite-based build configuration
  - ES modules and UMD bundle support
  - TypeScript declaration generation
  - Tree-shaking support

- **Testing**:
  - Vitest test runner
  - React Testing Library integration
  - Comprehensive component tests
  - Test coverage reporting

- **Development Tools**:
  - ESLint configuration
  - TypeScript configuration
  - Development server with hot reload
  - Build optimization

- **Documentation**:
  - Comprehensive API documentation
  - Usage examples and guides
  - Installation and setup instructions
  - Publishing and deployment guides

### Technical Details
- **Bundle Size**: ~11KB (ES), ~7.7KB (UMD) gzipped
- **Dependencies**: React 19.1.0+ (peer dependency)
- **TypeScript**: Full type safety with exported interfaces
- **Browser Support**: Modern browsers with ES2022 support

---

## Version History

### Version 0.0.x (Initial Development)
- Project restructuring from UI library to payment HEADLESS
- Core component development
- Build system setup
- Testing infrastructure
- Documentation creation

### Future Versions

#### Planned for 0.1.0
- Additional payment field types (credit card, billing address)
- Form validation utilities
- Error handling improvements
- Performance optimizations

#### Planned for 1.0.0
- Stable API with breaking changes
- Additional payment components
- Advanced customization options
- Migration guides from 0.x versions

---

## Migration Guides

### From UI Library to Payment HEADLESS

If you were using the previous UI library version:

1. **Update Package Name**:
   ```bash
   npm uninstall @mrpayment/mrpayment
   npm install @mrpayment/headless
   ```

2. **Update Imports**:
   ```tsx
   // Old
   import { Button, Link } from '@mrpayment/mrpayment';
   
   // New
   import { Payment } from '@mrpayment/headless';
   ```

3. **Remove UI Components**: The Button, Link, and Table components have been removed. Use the Payment component instead.

4. **Update Styling**: The Payment component is headless and requires custom styling.

---

## Contributing

When contributing to this project, please:

1. Follow the [Contributing Guide](./contributing.md)
2. Update this changelog with your changes
3. Use conventional commit messages
4. Test your changes thoroughly

## Release Process

1. **Version Update**: Use npm version commands
   ```bash
   pnpm version:patch  # 0.0.1 -> 0.0.2
   pnpm version:minor  # 0.0.1 -> 0.1.0
   pnpm version:major  # 0.0.1 -> 1.0.0
   ```

2. **Build and Test**:
   ```bash
   pnpm build
   pnpm test
   ```

3. **Publish**:
   ```bash
   pnpm publish:public
   ```

4. **Documentation**: Update this changelog and release notes

---

## Support

For questions about version changes or migration:

- 📚 Check the [Documentation](./README.md)
- 🐛 Report issues on [GitHub](https://github.com/your-org/mr-payment-headless/issues)
- 💬 Ask questions in [Discussions](https://github.com/your-org/mr-payment-headless/discussions) 