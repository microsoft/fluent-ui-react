# Requirements

## ARIA conformance
In general, components need to conform to the [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/). These practices are evaluated to achieve best possible user experience with supported browser/screen reader combinations.

## Keyboard navigation
- All elements that are interactive need to be focusable using keyboard keys (TAB/Shift+Tab or arrow keys)
- Elements that have click or right-click (contextmenu) handlers need to respond to Enter/Space or secondary action shortcuts. Users need to be able to initiate the click or right click when using screen readers.
- Focused element needs to be highlighted if it was focused by keyboard
- Focus should never go to the ``<body>`` element
- User needs to be able to move focus at any time, focus should not be be 'stuck' on one element
- In RTL mode, left arrow key moves the focus to the next focusable element, right arrow key moves the focus to the previous focusable element within the focus zone.

## Focus
- Whenever possible, focus should land only on elements that have concrete implicit or explicit ARIA role (`<button />`, `role='button'`, `role='menuitem'`, ....)
- onClick event handlers need to be handled on focusable elements with implicit or explicit ARIA role and not on their parent/child elements
- When reacting on focus or on hover screen reader interaction needs to be specified. Some screen readers do not have concept of hovering and not always focus elements, so there needs to be another way for the screen reader users to interact with such elements. For example showing popups on focus or on hover needs to be justified and alternative interaction compatible with the screen readers need to be provided

## Screen reader support
User needs to be able to interact with the application using:
- screen reader with virtual cursor navigation (browse mode)
- screen reader witout virtual cursor navigation (application mode)

All requirements for keyboard navigation are valid in both of these screen reader use cases. User needs to be able to understand which element is focused and how he can interact with it just based on the information provided by the screen reader.

Following combinations of clients and screen readers is supported/required:
- Windows/Chrome - JAWS, NVDA
- Windows/Edge - Narrator
- Windows/Firefox - NVDA
- macOS/Chrome - VoiceOver

## Contrast
- There has to be sufficient contrast between background and foreground of the component (text, icon...) in all component states and themes.

## Zoom
- Elements need to be rendered correctly when zoomed up to 400%

# Components and Behaviors
There are two areas that come together to achieve accessibility:
* Components - implemented for each supported framwork (currently React), when rendered, need to be [semantically correct](https://en.wikipedia.org/wiki/Semantic_HTML)
* Behaviors - framework independent, intended to add ARIA roles, ARIA attributes and keyboard handling on top of the components based on their type and state. In the future, behaviors development will move from the [Stardust react](https://github.com/stardust-ui/react) repo to [Stardust accessibility](https://github.com/stardust-ui/accessibility) repo.

**Accessibility behaviors** reflect the need to have a set of validated and carefully tested alternatives available for the consumers that guarantee the accessibility of the component in various use cases. In some cases, accessibility can be highly oppinionated and the behaviors allow consumers to implement accessibility aspects of the components in a customized way, that better fits the requirements of the consumer.

Accessibility behavior is a function that takes properties of the component combined with state and maps it to:
- `role`, `aria-*` attributes, `tabIndex` and other attributes related to accessibility
- assignement of keyboard keys to component actions
- focus zone (arrow key navigation) definition

## Component creation process
1. Create accessible component prototype
2. Validate the prototype (test with all supported screen reader / OS combinations)
3. Design and develop the component
4. Test the component
5. Formulate meaningful best practices providing information, what the consumer need to do in order to achive optimal experience
6. Extend accessibility validation schema to reflect the best practices

## Using behaviors in the components
Every component relevant to accessibility needs to have:
- default accessibility behavior, including specification or description in it's `@accessibility` jsdoc section
- optionally other available accessibility attributes, listed in `@available` jsdoc section
- `accessibility` property with default value specified
- Best practices section describing concerns that are not covered by the component itself and the user need to implement them or provide required information

# Testing
Every change needs to be tested for following use cases mentioned above.

## Test automation
It is estimated that test automation can discover around 30% of accessibility issues.
Components need to be unit-tested using [axe-core](https://www.deque.com/axe/). Using other test automation tools is also being considered.

## Manual testing
Manual testing with all supported client/screen reader combinations is required.

## Validation framework
Fluent UI development build includes [Ability attributes](https://github.com/microsoft/ability-attributes) validation framework that validates the accessibility on the documentation page in real time. Any detected error is immediately reported in the bottom edge of the window.

The [schema](https://github.com/microsoft/fluent-ui-react/blob/master/packages/ability-attributes/schema.json) that defines the accessibility rules is higly customizable and needs to reflect current state of the components.