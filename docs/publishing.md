# Publishing to NPM

This guide explains how to publish the MR Payment HEADLESS to NPM, including version management, build processes, and release procedures.

## Prerequisites

Before publishing, ensure you have:

1. **NPM Account**: A registered NPM account
2. **NPM CLI**: Latest version of NPM CLI installed
3. **Authentication**: Logged in to NPM (`npm login`)
4. **Repository Access**: Access to publish to the `@mrpayment` organization

## Pre-Publishing Checklist

Before publishing a new version, complete these steps:

### 1. Verify Build

Ensure the project builds successfully:

```bash
pnpm build
```

This should create:
- `dist/mrpayment-headless.es.js`
- `dist/mrpayment-headless.umd.js`
- `dist/mrpayment-headless.d.ts`

### 2. Run Tests

Ensure all tests pass:

```bash
pnpm test
```

### 3. Check Linting

Verify code quality:

```bash
pnpm lint
```

### 4. Update Documentation

- Update the [CHANGELOG](./changelog.md) with new features/fixes
- Update version numbers in documentation if needed
- Review README.md for accuracy

### 5. Verify Package.json

Check that `package.json` has:
- Correct version number
- Proper package name (`@mrpayment/headless`)
- All necessary fields (description, keywords, etc.)
- Correct entry points

## Version Management

### Semantic Versioning

Follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Version Commands

Use the provided npm scripts for version management:

```bash
# Patch version (0.0.1 -> 0.0.2)
pnpm version:patch

# Minor version (0.0.1 -> 0.1.0)
pnpm version:minor

# Major version (0.0.1 -> 1.0.0)
pnpm version:major
```

**Note**: These commands will:
1. Update the version in `package.json`
2. Create a git tag
3. Commit the changes

## Publishing Process

### 1. Choose Version Type

Decide on the version increment based on changes:

- **Patch**: Bug fixes, documentation updates
- **Minor**: New features, backwards-compatible changes
- **Major**: Breaking changes, major refactoring

### 2. Update Version

```bash
# For patch version
pnpm version:patch

# For minor version
pnpm version:minor

# For major version
pnpm version:major
```

### 3. Build the Package

```bash
pnpm build
```

### 4. Test the Build

Verify the built package works correctly:

```bash
# Check the dist folder contents
ls -la dist/

# Verify TypeScript declarations
pnpm types
```

### 5. Publish to NPM

#### For Public Package

```bash
pnpm publish:public
```

#### For Private Package (if applicable)

```bash
pnpm publish:private
```

### 6. Verify Publication

Check that the package was published successfully:

```bash
npm view @mrpayment/headless
```

## Publishing Scripts

The project includes several publishing scripts in `package.json`:

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

## Automated Publishing (Recommended)

For consistent publishing, follow this automated workflow:

### 1. Create Release Branch

```bash
git checkout -b release/v1.0.0
```

### 2. Update Version and Build

```bash
pnpm version:patch  # or minor/major
pnpm build
```

### 3. Test Everything

```bash
pnpm test
pnpm lint
```

### 4. Commit and Push

```bash
git add .
git commit -m "chore: prepare for release v1.0.0"
git push origin release/v1.0.0
```

### 5. Create Pull Request

Create a PR from `release/v1.0.0` to `main`

### 6. Merge and Tag

After PR approval:
1. Merge the PR
2. Create a GitHub release with the tag
3. Publish to NPM

## Troubleshooting

### Common Publishing Issues

#### 1. Authentication Errors

**Error**: `npm ERR! code ENEEDAUTH`

**Solution**:
```bash
npm login
```

#### 2. Version Already Exists

**Error**: `npm ERR! code EEXIST`

**Solution**: Increment the version number:
```bash
pnpm version:patch
```

#### 3. Build Errors

**Error**: Build fails during publishing

**Solution**:
1. Fix build issues locally first
2. Ensure all dependencies are properly declared
3. Check TypeScript compilation

#### 4. Permission Errors

**Error**: `npm ERR! code E403`

**Solution**: Ensure you have publish access to the `@mrpayment` organization

### Rollback Procedure

If a bad version is published:

1. **Immediate**: Unpublish within 72 hours:
   ```bash
   npm unpublish @mrpayment/headless@1.0.0
   ```

2. **After 72 hours**: Publish a new patch version with fixes

## Post-Publishing

### 1. Update Documentation

- Update the [CHANGELOG](./changelog.md)
- Update any version-specific documentation
- Update examples if needed

### 2. Announce Release

- Create a GitHub release
- Update release notes
- Notify team members

### 3. Monitor

- Check for any issues reported by users
- Monitor NPM download statistics
- Watch for any breaking changes feedback

## Best Practices

### 1. Always Test Before Publishing

```bash
pnpm test
pnpm build
pnpm lint
```

### 2. Use Semantic Versioning

- Follow SemVer strictly
- Document breaking changes clearly
- Update major version for breaking changes

### 3. Keep Changelog Updated

- Document all changes
- Include migration guides for breaking changes
- Reference issues and PRs

### 4. Test in Different Environments

- Test the published package in a fresh project
- Verify TypeScript declarations work
- Check bundle sizes

### 5. Use Release Branches

- Create dedicated release branches
- Use pull requests for releases
- Tag releases in git

## Security Considerations

### 1. Package Security

- Regularly update dependencies
- Run security audits: `npm audit`
- Monitor for vulnerabilities

### 2. Access Control

- Limit who can publish to the organization
- Use 2FA for NPM accounts
- Regularly review access permissions

### 3. Code Review

- Always review code before publishing
- Use automated checks (CI/CD)
- Test thoroughly

## Next Steps

After publishing:

1. [Monitor the release](./monitoring.md)
2. [Handle user feedback](./support.md)
3. [Plan the next release](./roadmap.md) 