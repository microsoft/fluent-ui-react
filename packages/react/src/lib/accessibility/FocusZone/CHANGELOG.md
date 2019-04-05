## FocusZone Changelog

This is a list of changes made to this Stardust copy of FocusZone in comparison with the original [Fabric FocusZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusZone/FocusZone.tsx).

### fixes
- With `defaultTabbableElement` prop set tab indexes are not updated accordingly ([#342](https://github.com/stardust-ui/react/pull/342))
- Remove unused prop `componentRef` ([#397](https://github.com/stardust-ui/react/pull/397))
- Fix `defaultTabbableElement` prop to be as a function ([#450](https://github.com/stardust-ui/react/pull/450))
- Remove role="presentation" @sophieH29 ([#530](https://github.com/stardust-ui/react/pull/530))
- Respect `defaultTabbable` element when FocusZone container receives focus @sophieH29 ([#637](https://github.com/stardust-ui/react/pull/637))
- Fix `FocusZone` - add `shouldResetActiveElementWhenTabFromZone` prop @sophieH29 ([#614](https://github.com/stardust-ui/react/pull/614))
- Make `FocusZoneTabbableElements` a usual enum @layershifter ([#867](https://github.com/stardust-ui/react/pull/867))
- Update tabindexes and focus alignment when item is focused programatically @sophieH29 ([#1098](https://github.com/stardust-ui/react/pull/1098))

### Features
- Add embed mode for FocusZone and new Chat behavior ([#233](https://github.com/stardust-ui/react/pull/233))
    - Replaced `onFocusNotification` with a regular `onFocus` event callback to pass unit tests with embed.
    - Replaced `ref={this.setRef}` with `this.setRef(this)` in `componentDidMount` to support functional components, which is needed to pass unit tests with embed.
    - Renamed `defaultActiveElement` to `defaultTabbableElement` and changed behavior:
        - Changed to query only descendants of the focus zone instead of the whole document, which enables to write simpler selectors. Note that we do not lose any functionality by this, because selecting elements outside of focus zone had no effect.
        - Changed not to call `this.focus()` on component mount (this was causing issues e.g., in docsite, where every change in source code would refocus the mounted component). Instead, you can now use a new property `shouldFocusOnMount`.
- Enable RTL @sophieH29 ([#646](https://github.com/stardust-ui/react/pull/646))

- Add `shouldFocusFirstElementWhenReceivedFocus` prop, which forces focus to first element when container receives focus @sophieH29 ([#469](https://github.com/stardust-ui/react/pull/469))
- Handle keyDownCapture based on `shouldHandleKeyDownCapture` prop @sophieH29 ([#563](https://github.com/stardust-ui/react/pull/563)) 

### feat(FocusZone): Implement FocusZone into renderComponent [#116](https://github.com/stardust-ui/react/pull/116)
- Prettier and linting fixes, e.g., removing semicolons, removing underscores from private methods.
- Moved `IS_FOCUSABLE_ATTRIBUTE` and others to `focusUtilities.ts`.
- Added prop types, default props, and handled props.
- Added `preventDefaultWhenHandled` property and method, added to `_onKeyDown`.
- Renamed boolean callback properties to better reflect their purpose.
- Renamed `elementType` to `as`.
- Removed deprecated properties.
- Removed `shouldWrapFocus` functionality as it is not necessary for Stardust now and maybe never will.
- In order to handle custom components in `as`, the `ref` and `_root` were changed to rely on `ReactDOM.findDOMNode` which seems to be necessary because of react-hot-loader. Please see the corresponding [issue #964 at react-hot-loader](https://github.com/gaearon/react-hot-loader/issues/964).
- Added better typings so that FocusZone passes strict type checks.
- Fixed `focusLast` mistakes: added it to `FocusZone.types.ts`, fixed a return value, and fixed its comment.
- Replaced Fabric dependencies accordingly:
    - `BaseComponent` removed.
    - `EventGroup` replaced with vanilla JS approach.
    - `KeyCodes` replaced with `keyboard-key` functionality.
    - `css` replaced with `classnames` functionality.
    - `htmlElementProperties`, `elementContains`, and `shouldWrapFocus` all removed as the no wrapping functionality was removed.
    - `getDocument` replaced with vanilla JS approach.
    - `getId` replaced with `_.uniqueId`.
    - `getNativeProps` replaced with `getUnhandledProps`.
    - `getParent` replaced with vanilla JS approach.
    - `getRTL` replaced with an `isRtl` property.
    - `createRef` replaced with a custom object and a callback which is necessary anyway because of custom component handling, see above for details.
    - Focus related utilities moved to `focusUtilities.ts`.

## FocusTrapZone Changelog

This is a list of changes made to the Stardust copy of FocusTrapZone in comparison with the original [Fabric FocusTrapZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusTrapZone/FocusTrapZone.tsx).

### fixes
- Do not focus trigger on outside click @sophieH29 ([#627](https://github.com/stardust-ui/react/pull/627))
- Do not hide aria-live regions from accessibility tree @sophieH29 ([#917](https://github.com/stardust-ui/react/pull/917))
- Do not propagate any keyboard events @sophieH29 ([#1180](https://github.com/stardust-ui/react/pull/1180))

### features
- Add focus trap zone [#239](https://github.com/stardust-ui/react/pull/239)
    - Used Stardust utils instead of Fabric utilities:
    - Used `EventListener` [#949](https://github.com/stardust-ui/react/pull/949)
    - Extended `React.Component` instead of Fabric `BaseComponent`.
    - Used `ReactDOM.findDOMNode` reference instead of `createRef` for `_root`.
    - Got rid of `componentWillMount` as it deprecated in higher versions of React.
    - Added `aria-hidden` to the body children outside of the Popup to prevent screen reader from reading background information.
    - Renamed `focus` method to `_findElementAndFocusAsync`, made it private and removed `IFocusTrapZone` interface as it's no longer needed.
