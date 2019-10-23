import { Alert, Flex, Text } from '@stardust-ui/react'

export const meta = {
 title: 'Design Principles',
 next: { name: 'Shorthand Props', url: '/shorthand-props' },
}
<Flex column hAlign="center" padding="padding.medium">

<Text size='large' color='gray'>
  Stardust uses some unique component patterns.
  These patterns are the result of a great amount thought, debate, and vetting.

This page gives you the assumptions and reasoning we've used that drives our design decisions.

</Text>
</Flex>

## TODO

Walk through a component file and explain WHY each of the design patterns in it exist.

## First Principles

### Future Proofing

- UI libraries and frameworks change, React will be replaced.
- UI designs change more frequently.
- Different products require different component features and behaviors.
- UI 


### Component Anatomies

### Component Anatomies

Standardized component anatomies are at the core of the Stardust's approach to components concept.
A component anatomy is simply a name of component and all of its parts.

Stardust bases on design decisions on these principles:

### Framework Agnostic

Although this doc site is about React components, the internals of these components are built using framework agnostic parts.

### Design Agnostic

Stardust components do not dictate any theme.

### Extend, override, or replace anything at any time

**Why?**

**How?**
Stardust components aim to allow you to extend, override, or replace the state, styling, and accessibility features of any component at any time.
Our components attempt to "do the right thing" by default, but do not lock you in to any decision.

This is usually achieved by allowing the user to pass state, style, and accessibility information through React context or component props.

### Function Components & Class Components

We believe in breaking down utilities to support

## Conformance

All Stardust components are tested against conformance criteria. This ensures that components behave in a consistent and predictable way.

### `test('component info file exists')`

**Problem:**
**Solution:**

**UI Concern:**
**Why Pattern:**

### `test('has a docblock description')`

**Problem:**
**Solution:**

### `test('is a static component on its parent')`

**Problem:**
**Solution:**

### `test('spreads user props')`

**Problem:**
**Solution:**

### `test('renders the component as HTML tags or passes "as" to the next component')`

**Problem:**
**Solution:**

### `test('renders as a functional component or passes "as" to the next component')`

**Problem:**
**Solution:**

### `test('renders as a ReactClass or passes "as" to the next component')`

**Problem:**
**Solution:**

### `test('passes extra props to the component it is renders as')`

**Problem:**
**Solution:**

### `test('defines handled props in Component.handledProps')`

**Problem:**
**Solution:**

### `test('Component.handledProps includes all handled props')`

**Problem:**
**Solution:**

### `test('defines an "accessibility" prop in Component.handledProps')`

**Problem:**
**Solution:**

### `test('spreads "attributes" on root')`

**Problem:**
**Solution:**

### `test('handles events transparently')`

**Problem:**
**Solution:**

### `test('matches constructor name')`

--------------------------

Philosophy
The project should help contributors fall into the pit of success by catching common mistakes

### `throwError(`Components should export a class or function, got: ${componentType}.`)`
Problems
- Sometimes contributors forget to export their component.
- Sometimes contributors export their component incorrectly.

Solutions



throwError(
      [
        'Component is not a named function. This should help identify it:\n\n',
        `${ReactDOMServer.renderToStaticMarkup(<Component />)}`,
      ].join(''),
    )

test('component info file exists
test('has a docblock description
test('is a static component on its parent
test('spreads user props
describe('"as" prop (common)
test('renders the component as HTML tags or passes "as" to the next component
test('renders as a functional component or passes "as" to the next component
test('renders as a ReactClass or passes "as" to the next component
test('passes extra props to the component it is renders as
describe('handles props
test('defines handled props in Component.handledProps
test('Component.handledProps includes all handled props
test('defines an "accessibility" prop in Component.handledProps
test('spreads "attributes" on root
test('handles events transparently
describe('static className (common)
describe('static displayName (common)
test('matches constructor name
