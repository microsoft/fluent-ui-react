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
- [Screener Tests](#screener-tests)
  - [Tests with Steps API](#tests-with-steps-api)
    - [Example for a test file:](#example-for-a-test-file)
    - [Important mentions:](#important-mentions)
  - [Run Screener tests](#run-screener-tests)
    - [Local run command](#local-run-command)

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

## Screener Tests

For some components, it is necessary to write screenshot tests in order to check they render properly. For each component example added to the docsite a screenshot test is automatically created. This checks if that the component is rendered in a consistent way, as it checks the visual differences between the previous and the current rendering. We use [screener-io](https://screener.io/) to achieve this.

### Tests with Steps API

This default test only checks the rendering for the component in its initial state. In order to test the rendering of more complex components, such as a `Dropdown`, screener provides an [api](https://www.npmjs.com/package/screener-runner) to execute actions on the DOM, in a way similar to end-to-end tests. These tests are automatically sent to Screener in our test runs, as long as the tests and their files respect the conventions:
- the test file should be placed at the same location as the tested component in the docs.
- the test file should be named exactly as the component file. If `DropdownExample.shorthand.tsx` is to be tested, the screener test file should be `DropdownExample.shorthand.steps.ts`.
- the tests should be written as an array of callbacks that accept a `steps` parameter, as they will be chained in `screener.config` automatically. The `steps` parameter is actually the `Steps` object from screener, instantiated in `screener.config`.

#### Example for a test file:

```tsx
import { Dropdown } from '@stardust-ui/react'

const steps = [
  steps => steps.click(`.${Dropdown.slotClassNames.triggerButton}`)
    .snapshot('Opens with selected item highlighted'),
  steps => steps.hover(`.${Dropdown.slotClassNames.itemsList} li:nth-child(2)`)
    .snapshot('Highlights another item'),
]

export default steps
```

#### Important mentions:

- by convention, each test is written as a different callback and added to the steps array.
- an actual assertion is performed by taking a `.snapshot(<Your test name here>)`, as the assertion is performed by comparing the screenshot with the one taken on the previous run and considered correct.
- a test can have as many snapshots as needed.
- before the snapshot is taken, steps are added to reach the state of assertion, with methods from `screener-runner` API (`.click(<selector>)`, `.hover(<selector>)`etc.)
- tests do not perform any cleanup by default. This means a test is dependent on the state of the component in which the previous test leaves it. In the example above, the second test will receive the `Dropdown` component with the list open.

### Run Screener tests
In order to run the tests locally, make sure to have a Screener API key saved in the environment variables on your machine. For instance, on MacOS/Linux you can use `export SCREENER_API_KEY=<Your screener key here>`.

When ran locally, not all the tests may be needed to run, only the ones added/edited. This can be achieved by changing the regexp in `screener.config.js`, where the `states` property is created. Make sure not to commit that change though! Results can be viewed in the Screener online dashboard, among all the other runs (for master, pull requests, etc.)

#### Local run command

```bash
yarn test:visual
```
