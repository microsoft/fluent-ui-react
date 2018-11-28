Add a feature
=============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Propose feature](#propose-feature)
- [Prototype](#prototype)
- [Spec out the API](#spec-out-the-api)
- [Create a component](#create-a-component)
  - [How to create a component](#how-to-create-a-component)
  - [Good practice](#good-practice)
  - [Display Name and Class Name](#display-name-and-class-name)
  - [Using propTypes](#using-proptypes)
  - [State](#state)
  - [Conformance Test](#conformance-test)
  - [Add doc site example](#add-doc-site-example)
  - [Commit Messages](#commit-messages)
- [Open PR](#open-pr)
- [Review & Finalize](#review--finalize)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Propose feature

Before starting on a new feature, be sure it has been approved by the maintainers and community. To do that, please file an RFC under the [Issues][1] tab so that a decision can be taken quicker. Doing this will potentially save you wasted time.

## Prototype

Build a minimal prototype showcasing the proposed feature. Do not worry about testing or documentation at this phase, this is just to push some changes for collaborative review.

## Spec out the API

Review the documentation for the component. Spec out the component's proposed API. The spec should demonstrate how component's API you are proposing will be used by Stardust consumer. You can reference this [API proposal][2] for the Menu Icons.

Once the component spec is solidified, it's time to write some code. The following sections cover everything you'll need to spec and build your awesome component.

## Create a component

### How to create a component

You can create a new component `MyComponent` by following the example of an existing component (e.g. Button) or by running the command
```
yarn generate:component MyComponent
```

The corresponding component directory trees are going to be created in correct places:
  - the component under `/src/components/MyComponent`,
  - the docs under `/docs/src/examples/components/MyComponent`,
  - the tests under `/test/specs/components/MyComponent`

You can customize the styles of your component by adding necessary variables and styles as part of your theme. 
E.g. for update on the `teams` theme: `/src/themes/`

### Good practice

Generally if you're updating a component, push a small change so that your PR could be reviewed quickly.

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

You can now iterate on the component in `/src` and your doc site example will hot reload your changes. Use this workflow to iterate on the prototype for your proposed feature.

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

### State

Strive to use stateless functional components when possible:

```tsx
function MyComponent(props) {
  return <div {...props} />
}
```

If you're component requires event handlers, it is a stateful class component. Want to know [why][8]?

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

### Conformance Test

Review [common tests](test-a-feature.md#common-tests) below. You should now add the [`isConformant()`](test-a-feature.md#isconformant-required) common test and get it to pass. This will validate the `displayName` and `className` and multiple other aspects to help you get your component off the ground.

### Add doc site example

Create a new documentation example that demonstrates usage of the new feature.
1. Create a new example in `/docs/src/examples/components` under the appropriate component.
1. Add your example to the `index.ts` in respective directory.
1. Running `yarn start` should now show your example in the doc site.

### Commit Messages

Please follow the [Angular Git Commit Guidelines][6] format.

## Open PR

Open a PR as soon as possible with as little code as necessary to show the feature. This way, we can iteratively collaborate on the design of the feature.

## Review & Finalize

After iterating on the feature with the maintainers, you will add full test coverage and documentation. See the individual guides for instructions.

- [Test a component](test-a-feature.md)
- [Writing documentation](document-a-feature.md)

[1]: https://github.com/stardust-ui/react/issues
[2]: https://github.com/stardust-ui/react/pull/73
[3]: https://github.com/stardust-ui/react/blob/master/src/lib/AutoControlledComponent.tsx
[4]: https://facebook.github.io/react/docs/forms.html#controlled-components
[5]: https://facebook.github.io/react/docs/forms.html#uncontrolled-components
[6]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
[7]: https://stardust-ui.github.io/react/glossary
[8]: https://github.com/Semantic-Org/Semantic-UI-React/issues/607
