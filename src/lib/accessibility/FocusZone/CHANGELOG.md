## FocusZone Changelog

This is a list of changes made to this Stardust copy of FocusZone in comparison with the original [Fabric FocusZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusZone/FocusZone.tsx).

### feat(FocusZone): Add embed mode for FocusZone and new Chat behavior [#233](https://github.com/stardust-ui/react/pull/233)
- Replaced `onFocusNotification` with a regular `onFocus` event callback to pass unit tests with embed.
- Replaced `ref={this.setRef}` with `this.setRef(this)` in `componentDidMount` to support functional components, which is needed to pass unit tests with embed.
- Renamed `defaultActiveElement` to `defaultTabbableElement` and changed behavior:
    - Changed to query only descendants of the focus zone instead of the whole document, which enables to write simpler selectors. Note that we do not lose any functionality by this, because selecting elements outside of focus zone had no effect.
    - Changed not to call `this.focus()` on component mount (this was causing issues e.g., in docsite, where every change in source code would refocus the mounted component). Instead, you can now use a new property `shouldFocusOnMount`.

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