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
- [Behavior tets](#behavior-tets)
  - [Adding test(s)](#adding-tests)
  - [Running test(s)](#running-tests)
  - [Troubleshooting](#troubleshooting)
    - [I am not sure if my line under `@specification` was process correctly](#i-am-not-sure-if-my-line-under-specification-was-process-correctly)
    - [I am not sure if my line was executed](#i-am-not-sure-if-my-line-was-executed)
    - [I want to add any description which should not be consider as unit test](#i-want-to-add-any-description-which-should-not-be-consider-as-unit-test)
    - [I want to create unit tests in separate file not through the regex](#i-want-to-create-unit-tests-in-separate-file-not-through-the-regex)

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

For some components, it is necessary to write screenshot tests in order to check that they render properly. For each component example added to the docsite a screenshot test is automatically created. This checks if that the component is rendered in a consistent way, as it looks for visual differences between the previous rendering and the current one. We use [screener-io](https://screener.io/) to achieve screenshot testing.

### Tests with Steps API

This default test only checks the rendering for the component in its initial state. In order to test the rendering of more complex components, such as a `Dropdown`, screener provides an [api](https://www.npmjs.com/package/screener-runner) to execute actions on the DOM, in a way similar to end-to-end tests. These tests are executed by Screener as long as both the tests and their files respect the conventions:
- the test file should be placed at the same location as the component example under test.
- the test file should be named exactly as the component example file. If `DropdownExample.shorthand.tsx` is to be tested, the screener test file should be named `DropdownExample.shorthand.steps.ts`.
- the tests should be written as a config file that can contain the following props:
  - `steps`: an array of callbacks that accept a `builder` (step builder) parameter, as all of them will be chained in `screener.config`. The `builder` parameter is actually the `Steps` object from screener, instantiated in `screener.config`.
  - `themes`: an array of strings representing the theme applied to the component when taking the screenshot; by default, all screenshots are taken for `themes` theme.

#### Example for a test file:

```tsx
import { Dropdown } from '@stardust-ui/react'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder => builder.click(`.${Dropdown.slotClassNames.triggerButton}`)
      .snapshot('Opens dropdown list'),
    builder =>
      builder
        .click(`.${Dropdown.slotClassNames.triggerButton}`)
        .hover(`.${Dropdown.slotClassNames.itemsList} li:nth-child(2)`)
        .snapshot('Highlights an item'),
  ],
}

export default config
```

#### Important mentions:

- by convention, each test is written as a different callback and added to the steps array.
- an actual assertion is performed by taking a `.snapshot(<Your test name here>)`, as the assertion is performed by comparing the screenshot with the one taken on the previous run and considered correct.
- a test can have as many snapshots as needed.
- before the snapshot is taken, steps are added to reach the state of assertion, with methods from `screener-runner` API (`.click(<selector>)`, `.hover(<selector>)`etc.)
- tests perform any cleanup by default. This means each test is independent of the state of the component from previous tests.

### Run Screener tests
In order to run the tests locally, make sure to have a Screener API key saved in the environment variables on your machine. For instance, on MacOS/Linux you can use `export SCREENER_API_KEY=<Your screener key here>`.

When ran locally, not all the tests may be needed to run, only the ones added/edited. This can be achieved by changing the regexp in `screener.config.ts`, where the `states` property is created. Make sure not to commit that change though! Results can be viewed in the Screener online dashboard, among all the other runs (for master, pull requests, etc.)

#### Local run command

```bash
yarn test:visual
```

## Behavior tets

Behavior unit tests are generated from the specification written in each behavior file.
Each line under the `@specification` tag is taken and matched against the regex expression written in `testDefinitions.ts` file.

### Adding test(s)

- For a new behavior. In the file `behavior-test.tsx` do following changes:
  - import the new behavior into the test file
  - add the new behavior to the testHelper object like: `testHelper.addBehavior('yourNewBehaviorName', yourNewBehaviorImportedObject)`
  - add regex expression into `testDefinitions.ts` which will match your line written under `@specification` tag

- For an existing behavior:
  - add regex expression into `testDefinitions.ts` which will match your line written under `@specification` tag

### Running test(s)

Run test and watch:
```
yarn jest --watch behavior-test
```

### Troubleshooting

#### I am not sure if my line under `@specification` was process correctly
Go into `docs\src\behaviorMenu.json` file and verify if you can find your line. If not then:
  - run command `gulp build:docs:component-menu-behaviors`, this will build the file again
  - verify formatting of the file (if some tag is not missing, etc...) and run command again

#### I am not sure if my line was executed
Rename all test files title containing `behavior-test` string.
For example, like (goal of the renaming is reach that these tests will not run):
  - `listBehaviorrrrrrrrrrr-test.tsx`
  - `listItemBehaviorrrrrrr-test.tsx`

Run the tests again and you should see in console:
```
 PASS  test/specs/behaviors/behavior-test.tsx
  buttonBehavior.ts
    √ Adds role='button' if element type is other than 'button'. (11ms)
    √ Adds attribute 'aria-disabled=true' based on the property 'disabled'. (8ms)
    √ Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
  buttonGroupBehavior.ts
    √ Adds role 'presentation' to 'root' component's part (2ms)
    √ Wraps component in FocusZone allowing arrow key navigation through the children of the component.
  dialogBehavior.ts
    √ Adds attribute 'aria-disabled=true' to 'trigger' component's part based on the property 'disabled'.
    √ Adds attribute 'aria-modal=true' to 'popup' component's part.
    √ Adds attribute 'role=dialog' to 'popup' component's part.
    √ Traps focus inside component
  gridBehavior.ts
    √ Wraps component in FocusZone allowing circular arrow key navigation through the children of the component.
```

#### I want to add any description which should not be consider as unit test
Add description under the `@description` tag. Like:
```
/**
 * @description
 * Image is usually only visual representation and therefore is hidden from screen readers.
```

#### I want to create unit tests in separate file not through the regex
Add your spec file into the array of files `skipSpecChecksForFiles` in `testHelper.tsx`. And put description in behavior file under `@description` tag.
