## Optimize APIs and patterns for developers over designers

Why?
- There are thousands of them.  The cost of features and bugs is far greater.

How?
- Prefer readable and meaningful typed intellisense theme information, opposed to cryptic or unorganized theme information that requires lookups or design assistance to understand.
- Variable names should always resolve to the correct value for the current theme, automatically.
- All theme values should appear in intellisense everywhere they are accessible.  Merge variable values, for instance, should appear in the variable prop of components. 

## No site variables in style functions

Why?
Prevent developers from assigning colors which breaks theme switching.

How?
- Consider hoisting colors out of site variables.
- Consumers define component variable object for each theme type (light/dark/contrast).
- Rely on consistent and comprehensive component variables and remove site variables from style arg all together.

## If possible, allow design to own the theme

Goals
- Design doesn't want to mock up dark / high contrast
- Ease of adding new themes types, (default, dark, ...someNewThing)

Why?
- Time waste in transferring design updates.  Design owns the responsibility but does not have the capability of updating styles.
- Developers should not try to (or be allowed) to do design work.  It is slow and often comes out less than ideal.

How?
- Try to remove processes in getting design updates into code.  Ideally, design changes would safely appear in applications.

Optimizations for designers at no expense to developers:
- Keep names consistent for sanity and learning what they mean. gray02 is always the same hex value, regardless of theme/usage.


***

### Style Problems

- Style functions have complex deeply nested logic that is hard to update/maintain
- Variable files are full of dead variables that do nothing in the styles
- Cannot generate stylesheets due to lack of knowledge about what props trigger which style function code paths

### Style Solution

Write styles as cascading map of props object matchers to style objects.  Compute and assign in order.
- Flattens stylesheets, removes all logic (since logic is prop based only)
- Enables automated unit testing of styles to ensure styles change on variable change.
- Enables computing css selectors for each style in order to generate a flat stylesheet.

```jsx
const menuStyles = {
  root: ({ props, variables }) => {

    return [
      [{ primary: true, active: true, underlined: true }, {
        display: 'block',
        color: variables.colors[props.color],
      }],

      // Equivalent to CSS:
      // .primary.active.underlined {
      //   display: block;
      //   color: 'purple';
      // }
    ]
  }
}
```

## Tests to add

Resolve theme, throw on duplicate variable definitions:
- Dark theme defines text success color the same as the light theme it inherited from
- Resolve style functions, assert changes to each variable result in changed style (no unused variables) 
