CONTRIBUTING
============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


  - [Commit Messages](#commit-messages)
  - [Commands](#commands)
- [Workflow](#workflow)
  - [Create a Component](#create-a-component)
  - [Display Name and Class Name](#display-name-and-class-name)
  - [Using propTypes](#using-proptypes)
  - [Conformance Test](#conformance-test)
  - [Open A PR](#open-a-pr)
  - [Spec out the API](#spec-out-the-api)
- [Testing](#testing)
  - [Coverage](#coverage)
  - [Common Tests](#common-tests)
    - [Usage](#usage)
    - [isConformant (required)](#isconformant-required)
    - [Writing tests](#writing-tests)
    - [Running tests](#running-tests)
- [State](#state)
- [Documentation](#documentation)
  - [Website](#website)
  - [Components](#components)
  - [Props](#props)
  - [Examples](#examples)
- [How accessibility works](#how-accessibility-works)
  - [Role and aria props](#role-and-aria-props)
  - [Focus](#focus)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

These guides will walk your through various activities for contributing:

- [Setup Local Development](setup-local-development.md)
- [Add a feature](add-a-feature.md)
- [Test a feature](test-a-feature.md)
- [Document a feature](document-a-feature.md)

### Commit Messages

Please follow the [Angular Git Commit Guidelines][5] format.

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

Create components in `src/components` by following the example of an existing component (e.g. Button) or by running the command
```
yarn generate:component
```.
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

Review [common tests](#common-tests) below. You should now add the [`isConformant()`](#isconformant-required) common test and get it to pass. This will validate the `displayName` and `className` and multiple other aspects to help you get your component off the ground.

### Open A PR

This is a good time to open your PR. The component has been created, but the API and internals are not yet coded. We prefer to collaborate on these things to minimize rework.

This will also help with getting early feedback and smaller faster iterations on your component.

### Spec out the API

Review the documentation for the component. Spec out the component's proposed API. The spec should demonstrate how your component's API will support all the native Stardust features. You can reference this [API proposal][4] for the Input.

Once we have solidified the component spec, it's time to write some code. The following sections cover everything you'll need to spec and build your awesome component.


## State

Strive to use stateless functional components when possible:

```tsx
function MyComponent(props) {
  return <div {...props} />
}
```

If you're component requires event handlers, it is a stateful class component. Want to know [why][7]?

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

## How accessibility works

- [Role and aria props](#role-and-aria-props)
- [Focus](#focus)

### Role and aria props

ARIA landmarks are attributes you can add to elements in your page to define areas like the main content or a navigation region.
It is used to help the screen readers to find the correct elements on the page, where the semantic HTML is not able to cover
it (like for elements of type pop-up).

It is represented through the `role` and `aria-*` attributes which are usually added to divs and spans.

Stardust provides already the needed ARIA attributes to make its components accessible.

For example, to make the RadioGroup component accessible, you will find the generated HTML having the following form:
```html
  <div role="radio" tabindex="0" aria-checked="true" class="ui-radiogroup__item">
    <span class="ui-label">
    <span class="ui-icon" aria-hidden="true"></span>Capricciosa</span>
  </div>
```

### Focus

When a user is navigating through the application using the keyboard, it's important to make the element that currently has focus
clearly visible, so the users can see where they are on the page. This is handled in Stardust by focus indicator functionality. Focus indicator
will be displayed only if the application is in keyboard mode. Application switches to keyboard mode when a key relevant to navigation is pressed.
It disables keyboard mode on mouse click events.

More details at [Accessibility](../accessibility/blob/master/CONTRIBUTING.md)

[1]: https://github.com/stardust-ui/react/tree/master/test/specs/commonTests
[2]: https://facebook.github.io/react/docs/forms.html#controlled-components
[3]: https://facebook.github.io/react/docs/forms.html#uncontrolled-components
[4]: https://github.com/stardust-ui/react/pull/73
[5]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
[6]: https://stardust-ui.github.io/react/glossary
[7]: https://github.com/Semantic-Org/Semantic-UI-React/issues/607
