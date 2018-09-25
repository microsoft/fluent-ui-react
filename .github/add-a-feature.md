Add a feature
=============

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->



<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Propose feature

Before starting on a new feature, be sure it has been approved by the maintainers and community. To do that, please file an RFC under the Issues tab in `https://github.com/stardust-ui/react` so that a decision can be done quicker. Doing this will potentially save you wasted time.

## Prototype

Build a minimal prototype showcasing the proposed feature. Do not worry about testing or documentation at this phase, this is just to push some changes for collaborative review.

### Add your feature

You can create a new component `MyComponent` by following the example of an existing component (e.g. Button) or by running the command
```
yarn generate:component MyComponent
```

The corresponding component directory trees are going to be created in correct places:
  - the component under `/src/components/MyComponent`,
  - the docs under `/docs/src/examples/components/MyComponent`,
  - the tests under `/test/specs/components/MyComponent`
You can now iterate on the component in `/src` and your doc site example will hot reload your changes. Use this workflow to iterate on the prototype for your proposed feature.

### Add doc site example

Create a new documentation example that demonstrates usage of the new feature.
1. Create a new example in `/docs/src/examples/components` under the appropriate component.
1. Add your example to the `index.ts` in respective directory.
1. Running `yarn start` should now show your example in the doc site.

## Open PR

Open a PR as soon as possible with as little code as necessary to show the feature. This way, we can iteratively collaborate on the design of the feature.

## Review & Finalize

After iterating on the feature with the maintainers, you will add full test coverage and documentation. See the individual guides for instructions.

- [Test a component](test-a-feature.md)
- [Writing documentation](document-a-feature.md)
