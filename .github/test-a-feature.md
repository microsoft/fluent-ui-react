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

## Behavior tets

Behavior unit tests are generated from the specification written in each behavior file.
Each line under the "@specification" tag is taken and matched against the regex experesion written in "testDefinitions.ts" file. 

**Adding test(s)**

- For a new behavior. In the file 'behavior-test.tsx' do following changes:
  - import the new behavior into the test file
  - add the new behavior to the testHelper object like: testHelper.addBehavior('yourNewBehaviorName', yourNewBehaviorImportedObject)
  - add regex expression into 'testDefinitions.ts' which will match your line written under @specification tag

- For an existing behavior:
  - add regex expression into 'testDefinitions.ts' which will match your line written under @specification tag

**Running test(s)**

Run test and watch: yarn jest --watch behavior-test


**Troubleshooting**

- I am not sure if my line under @specification was process correctly. <br>
Go into docs\src\behaviorMenu.json file and verify if you can find your line. If not then:
  - run command "gulp build:docs:component-menu-behaviors", this will build the file again
  - verify formatting the file (if some tag is not missing, etc...) and run command again

- I am not sure if my line was executed. </br> 
Rename all test files title containing "behavior-test" string. 
For example, like (goal of the renaming is reach that these tests will not run):
  - listBehaviorrrrrrrrrrr-test.tsx
  - listItemBehaviorrrrrrr-test.tsx

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

- I want to add any description which should not be consider as unit test. <br>
Add description under the @description tag. Like:
```
/**
 * @description
 * Image is usually only visual representation and therefore is hidden from screen readers.
```

- I want to create unit tests in separate file not through the regex. <br>
Add your spec file into the array of files "skipSpecChecksForFiles" in testHelper.tsx. And put description in behavior file under '@description" tag.
