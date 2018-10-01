CONTRIBUTING
============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
  - [Useful Commands](#useful-commands)
- [Workflow](#workflow)
  - [Setup](#setup)
  - [Add a feature](#add-a-feature)
  - [Test a feature](#test-a-feature)
  - [Document a feature](#document-a-feature)
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

### Setup
- [Setup Local Development](setup-local-development.md)

### Add a feature
- [Add a feature](add-a-feature.md)

### Test a feature
- [Test a feature](test-a-feature.md)

### Document a feature
- [Document a feature](document-a-feature.md)

You can find different
## Accessibility

- [Role and aria props](#role-and-aria-props)
- [Focus](#focus)

### Role and aria props

ARIA landmarks are attributes you can add to elements in your page to define areas like the main content or a navigation region.
It is used to help the screen readers to find the correct elements on the page, where the semantic HTML is not able to cover
it (like for elements of type pop-up).

It is represented through the `role` and `aria-*` attributes which are usually added to divs and spans.

Stardust provides already the needed ARIA attributes to make its components accessible.

For example, to make the RadioGroup component accessible, you will find the generated HTML having the following look:
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

More details at [Accessibility][2]

[1]: https://nodejs.org/
[2]: https://github.com/stardust-ui/accessibility/blob/master/CONTRIBUTING.md
