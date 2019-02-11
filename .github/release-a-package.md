# How to release a new library version

This documentation is intended for core Stardust contributors and describes `@stardust-ui/react` NPM package release process.

## Prerequisities

1. You need NPM account and npm configured with your token.
2. You must be a member of stardust-ui organization on [npmjs.com](https://www.npmjs.com).

## Define new version number
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), version is in `MAJOR.MINOR.PATCH` format.

### 0.x convention
- For fixes/features (there is no BREAKING CHANGE), increase `PATCH` (if current version is 0.2.3, new version is 0.2.**4**).
- For **breaking changes**, increase `MINOR` (if current version is 0.2.3, new version is 0.**3.0**).

## Release
1. Checkout latest master
2. Pull the latest changes
3. Update CHANGELOG.md for new release
  - create a new heading for UNRELEASED changes,
  - commit as `chore: prepare release v0.2.3 [ci skip]`` (yes, directly to master).
4. Run the release:
  - **Please review [this section](#0x-convention) to decide which version (major, minor, patch) should be incremented.**
  - with incremented patch version run `npm run release:patch`,
  - with incremented minor version run `npm run release:minor`.

There will be a battery of tests run prior to release.
The release command in step 4 will handle tagging and releasing flow entirely. Just wait for it to finish.

## Verification after release
1. Verify NPM package has been released: https://www.npmjs.com/package/@stardust-ui/react
2. Verify new docsite version has been published: https://stardust-ui.github.io/react/  
