CONTRIBUTING
============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
  - [Useful Commands](#useful-commands)
- [Workflow](#workflow)
- [Accessibility](#accessibility)
  - [Role and aria props](#role-and-aria-props)
  - [Focus](#focus)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

Make sure you have [Node.js][1] version v8 or later installed.

You can contribute to Stardust by being an official [contributor](setup-local-development.md#contributors) or without permissions, as a [collaborator](setup-local-development.md#collaborators)

### Useful Commands

>This list contains the most useful commands. You should run `yarn run` to see all scripts.

```sh
yarn generate:component    // generates a new component. Will ask for the name of the component

yarn start                 // run doc site

yarn test                  // test once
yarn test:watch            // test on file change

yarn build                 // build everything, will run `gulp build`
yarn build:dist            // build dist
yarn build:docs            // build docs

yarn deploy:docs           // deploy gh-pages doc site

yarn lint                  // lint once
yarn lint:fix              // lint and attempt to fix

yarn prettier              // `prettier --list-different "**/*.{ts,tsx}"`
yarn prettier:fix          // prettier and attempt to fix

yarn ci                    // lint, prettier and test
```

## Workflow

These guides will walk your through various activities for contributing:

- [Setup Local Development](setup-local-development.md)
- [Add a feature](add-a-feature.md)
- [Test a feature](test-a-feature.md)
- [Document a feature](document-a-feature.md)

## Accessibility

Stardust implements accessibility using accessibility behaviors. The behaviors add attributes to the DOM elements (mainly role and aria-* properties) as well as handle keyboard interaction and focus. Every accessible component has a defiault behavior, which can be overriden using the `accessibility` prop.

Behaviors apply properties, focus handling and keyboard handlers to the component slots. When developing a component, the properties and keyboard handlers need to be spreaded to the corresponding slots.

For complete accessibility contributing guide see [Accessibility][2]

- [Role and aria props](#role-and-aria-props)
- [Focus](#focus)
- [Keyboard handling](#keyboard-handling)

### Role and aria props

ARIA [roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) and [attributes](https://www.w3.org/TR/wai-aria-1.1/#introstates) provide information for screen readers to allow the users to navigate in the page/application.

In addition to behaviors, ARIA [landmarks](https://www.w3.org/TR/wai-aria-1.1/#landmark_roles) and [naming props](https://www.w3.org/TR/wai-aria-1.1/#namecalculation) need to be added to the components/elements to form the page structure and provide textual information.

For example, to make an icon-only Button accessible, `aria-label` prop needs to be used:
```html
  <Button type="primary" icon="star" iconOnly aria-label='Favorites' />
```

### Focus

An application should always have an element with [focus](https://www.w3.org/TR/wai-aria-1.1/#managingfocus) when in use. The user can change the focused element by:
- pressing TAB/shift+TAB keys to navigate through the components
- pressing arrow keys to navigate through children (for example menu items in menu)
- using the screen reader with or without virtual cursor

Stardust uses Office UI Fabric [FocusZone](https://developer.microsoft.com/en-us/fabric#/components/focuszone) for basic TAB and arrow key focus handling. To use the focus zone, you can use the `focusZone` configuration in the behavior (for example see [MenuItemBehavior](https://github.com/stardust-ui/react/blob/master/src/lib/accessibility/Behaviors/Menu/MenuBehavior.ts))

Focused component needs to be clearly visible. This is handled in Stardust by focus indicator functionality. Focus indicator will be displayed only if the application is in keyboard mode. Application switches to keyboard mode when a key relevant to navigation is pressed. It disables keyboard mode on mouse click events.

 To style the focused component, you can use the `isFromKeyboard` utility and prop. See [Button component](https://github.com/stardust-ui/react/blob/master/src/components/Button/Button.tsx) and [Button style](https://github.com/stardust-ui/react/blob/master/src/themes/teams/components/Button/buttonStyles.ts) for reference.

### Keyboard handling

In addition to basic focus handling, specific keyboard handlers can be added to the behaviors. These keyboard handlers call actions defined in the components, when corresponding keys are pressed by the user. For reference, see `keyActions` in [MenuItemBehavior](https://github.com/stardust-ui/react/blob/master/src/lib/accessibility/Behaviors/Menu/MenuItemBehavior.ts) and `actionHandlers` in [MenuItem component](https://github.com/stardust-ui/react/blob/master/src/components/Menu/MenuItem.tsx)

[1]: https://nodejs.org/
[2]: https://github.com/stardust-ui/accessibility/blob/master/CONTRIBUTING.md
