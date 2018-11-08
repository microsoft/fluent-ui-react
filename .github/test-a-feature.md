Test a feature
==============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Coverage](#coverage)
- [Common Tests](#common-tests)
  - [Usage](#usage)
  - [isConformant (required)](#isconformant-required)
  - [Writing tests](#writing-tests)
  - [Running tests](#running-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

In order to make sure you wrote a component `MyComponent` in the right way, you need to write proper tests under the corresponding test directory`test/specs/components/MyComponent`.

You can run tests during development with `yarn test:watch` to re-run tests live on each file change or at the end of development by running `yarn test`.

## Coverage

All PRs must meet or exceed test coverage limits before they can be merged.

Every time tests run, `/coverage` information is updated. Open `coverage/lcov-report/index.html` to inspect test coverage. This interactive report will reveal areas lacking test coverage. You can then write tests for these areas and increase coverage.

## Common Tests

There are many common things to test for. Because of this, we have [`test/specs/commonTests`][1].
These tests are typically imported into individual component tests.

### Usage

Every common test receives your component as its first argument.

```tsx
import { isConformant } from 'test/specs/commonTests'

import Divider from 'src/components/Divider/Divider'

describe('Divider', () => {
  isConformant(Divider)
})

```

### isConformant (required)

This is the only required test. It ensures a consistent baseline for the framework. It also helps you get your component off the ground. You should add this test to new components right away.

isConformant asserts Component conforms to guidelines that are applicable to all components:

- Component is exported or private
- Component name and filename are correct
- Component info file exists at `docs/src/componentInfo/${constructorName}.info.json`
- Events are properly handled
- Extra props are correctly spread
- Base classNames are applied
- The display name matches the constructor name

### Writing tests

Create your test file in `test/specs` directory. The **specs** directory mirrors the **src** directory. The first test should always be `isConformant()`
For every source file, there needs to be a test file and they should named as `<Component>-test.tsx`.

There should be one describe block for each prop of your component.

Example for `Button` component:

```tsx
import { isConformant } from 'test/specs/commonTests'

import Button from 'src/components/Button'

describe('Button', () => {
  isConformant(Button)

  describe('accessibility', () => {
    ...
  })

  describe('type', () => {
    ...
  })

  describe('circular', () => {
    ...
  })

  describe('onClick', () => {
    ...
  })
})
```

### Running tests

```bash
# Run tests with:
yarn test

# Run tests in watch mode with:
yarn test:watch
```

[1]: https://github.com/stardust-ui/react/tree/master/test/specs/commonTests