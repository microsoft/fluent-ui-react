CONTRIBUTING
============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


  - [Commit Messages](#commit-messages)
  - [Commands](#commands)
- [Workflow](#workflow)
  - [Create a Component](#create-a-component)
  - [Define _meta](#define-_meta)
  - [Using propTypes](#using-proptypes)
  - [Conformance Test](#conformance-test)
  - [Open A PR](#open-a-pr)
  - [Spec out the API](#spec-out-the-api)
- [API](#api)
  - [SUI HTML Classes](#sui-html-classes)
    - [API Patterns](#api-patterns)
    - [Building className](#building-classname)
    - [Testing className](#testing-classname)
  - [SUI HTML Markup](#sui-html-markup)
    - [SUI Components vs Component Parts](#sui-components-vs-component-parts)
    - [React Components & Sub Components](#react-components--sub-components)
    - [Component Part Props](#component-part-props)
- [Testing](#testing)
  - [Coverage](#coverage)
  - [Common Tests](#common-tests)
    - [Usage](#usage)
    - [isConformant (required)](#isconformant-required)
    - [Writing tests](#writing-tests)
    - [Running tests](#running-tests)
- [State](#state)
  - [AutoControlledComponent](#autocontrolledcomponent)
- [Documentation](#documentation)
  - [Website](#website)
  - [Components](#components)
  - [Props](#props)
  - [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

These guides will walk your through various activities for contributing:

- [Setup Local Development]()
- Add a feature

### Commit Messages

Please follow the [Angular Git Commit Guidelines][8] format.

### Commands

>This list is not updated, you should run `yarn run` to see all scripts.

```sh
yarn start                 // run doc site

yarn test                  // test once
yarn test:watch            // test on file change

yarn build                 // build everything
yarn build:dist            // build dist
yarn build:docs            // build docs

yarn deploy:docs           // deploy gh-pages doc site

yarn lint                  // lint once
yarn lint:fix              // lint and attempt to fix
```

## Workflow

- [Create a Component](#create-a-component)
- [Define _meta](#define-_meta)
- [Conformance Test](#conformance-test)
- [Open A PR](#open-a-pr)
- [Spec out the API](#spec-out-the-api)

### Create a Component

Create components in `src/components`.
Generally if you're updating a component, push a small change so you can open a PR early.

Stateless components should be written as a `function`:

```tsx
function Button(props) {
  // ...
}
```

Stateful components should be classes:

```tsx
import { AutoControlledComponent as Component } from '../../lib'

class Dropdown extends AutoControlledComponent {
  // ...
}
```

>You probably need to extend our [`AutoControlledComponent`](#autocontrolledcomponent) to support both [controlled][2] and [uncontrolled][3] component patterns.

### Display Name and Class Name

Every component has two static properties called `displayName` and `className`. The values here are used for generated documentation, generated test cases and some utilities.

Here's an example:

```ts
  static displayName = 'Accordion'
  static className = 'ui-accordion'
```

### Using propTypes

Every component must have fully described `propTypes`.

 ```tsx
import * as React from 'react'
import * as PropTypes from 'prop-types'

...

  static propTypes = {
    as: customPropTypes.as,

    /** Child content * */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Size multiplier (default 0) * */
    size: PropTypes.number,

    /** A Divider can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A divider can appear more important and draw the user's attention. */
    important: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }
 ```

### Conformance Test

Review [common tests](#common-tests) below.  You should now add the [`isConformant()`](#isconformant-required) common test and get it to pass.  This will validate the `displayName` and `className` and multiple other aspects  to help you get your component off the ground.

### Open A PR

This is a good time to open your PR.  The component has been created, but the API and internals are not yet coded.  We prefer to collaborate on these things to minimize rework.

This will also help with getting early feedback and smaller faster iterations on your component.

### Spec out the API

Review the documentation for the component. Spec out the component's proposed API. The spec should demonstrate how your component's API will support all the native Stardust features. You can reference this [API proposal][7] for the Input.

Once we have solidified the component spec, it's time to write some code. The following sections cover everything you'll need to spec and build your awesome component.


## Testing

Run tests during development with `yarn test:watch` to re-run tests on file changes.

### Coverage

All PRs must meet or exceed test coverage limits before they can be merged.

Every time tests run, `/coverage` information is updated.  Open `coverage/lcov-report/index.html` to inspect test coverage.  This interactive report will reveal areas lacking test coverage.  You can then write tests for these areas and increase coverage.

### Common Tests

There are many common things to test for.  Because of this, we have [`test/specs/commonTests`][1].
These tests are typically imported into individual component tests.

#### Usage

Every common test receives your component as its first argument.

```tsx
import { isConformant } from 'test/specs/commonTests'

import Divider from 'src/components/Divider/Divider'

describe('Divider', () => {
  isConformant(Divider)
})

```


#### isConformant (required)

This is the only required test.  It ensures a consistent baseline for the framework. It also helps you get your component off the ground.  You should add this test to new components right away.

#### Writing tests

Create your test file in `test/specs` directory. The **specs** directory mirrors the **src** directory. The first test should always be `isConformant()`
For every source file, there needs to be a test file and they should named as `<Component>-test.tsx`.

There should be one describe block for each prop of your component.

#### Running tests

```bash
# Run tests with:
yarn test

# Run tests in watch mode with:
yarn test:watch
```

## State

Strive to use stateless functional components when possible:

```tsx
function MyComponent(props) {
  return <div {...props} />
}
```

If you're component requires event handlers, it is a stateful class component. Want to know [why][15]?

```tsx
class MyComponent extends AutoControlledComponent {
  handleClick = (e) => {
    console.log('Clicked my component!')
  }

  render() {
    return <div onClick={this.handleClick} />
  }
}
```

## Documentation

- [Website](#website)
- [Components](#components)
- [Props](#props)
- [Examples](#examples)

Our docs are generated from doc block comments, `propTypes`, and hand written examples.

### Website

Developing against the doc site is a good way to try your component as you build it. Run the doc site with:

```sh
yarn start
```

### Components

A doc block should appear above a component class or function to describe it:

```tsx
/**
 * A <Select /> is sugar for <Dropdown selection />.
 * @see Dropdown
 */
function Select(props) {
  return <Dropdown {...props} selection />
}
```

### Props

A doc block should appear above each prop in `propTypes` to describe them:

>Limited props shown for brevity.

```tsx
Label.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A label can reduce its complexity. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the label. */
  color: PropTypes.oneOf(Label._meta.props.color),

  /** Place the label in one of the upper corners . */
  corner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(Label._meta.props.corner),
  ]),

  /** Add an icon by icon className or pass an <Icon /> */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}
```

### Examples

Usage examples for a component live in `docs/src/examples`.  The examples follow the doc site examples.

Adding documentation for new components is a bit tedious.  The best way to do this (for now) is to copy an existing component's and update them.

[1]: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/test/specs/commonTests.js
[2]: https://facebook.github.io/react/docs/forms.html#controlled-components
[3]: https://facebook.github.io/react/docs/forms.html#uncontrolled-components
[4]: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/classNameBuilders.js
[5]: https://semantic-ui.com/elements/header
[6]: https://semantic-ui.com/views/item
[7]: https://github.com/Semantic-Org/Semantic-UI-React/pull/281#issuecomment-228663527
[8]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
[9]: https://semantic-ui.com/introduction/glossary.html
[10]: https://semantic-ui.com/elements/label.html
[11]: https://nodejs.org/
[12]: https://github.com/Semantic-Org/Semantic-UI-React#fork-destination-box
[13]: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/factories
[14]: https://github.com/Semantic-Org/Semantic-UI-React/pull/335#issuecomment-238960895
[15]: https://github.com/Semantic-Org/Semantic-UI-React/issues/607
[16]: https://yarnpkg.com/en/docs/getting-started
