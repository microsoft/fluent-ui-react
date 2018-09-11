## FocusZone Changelog

This is a list of changes made to this Stardust copy of FocusZone in comparison with the original [Fabric FocusZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusZone/FocusZone.tsx).

### feat(FocusZone): Implement FocusZone into renderComponent [#116](https://github.com/stardust-ui/react/pull/116)
- Prettier and linting fixes, e.g., removing semicolons, removing underscores from private methods.
- Replaced path `../../Utilities` with `@uifabric/utilities`.
- Moved `IS_FOCUSABLE_ATTRIBUTE` and others to `FocusUtilities.ts`.
- Added prop types.
- Added `preventDefaultWhenHandled` property and method, added to `_onKeyDown`.
- Renamed boolean callback properties to better reflect their purpose.
- Renamed `elementType` to `as`.
- Removed deprecated properties.
- Removed `shouldWrapFocus` functionality as it is not necessary for Stardust now and maybe never will.
- In order to handle custom components in `as`, the `ref` and `_root` were changed to rely on `ReactDOM.findDOMNode` which seems to be necessary because of react-hot-loader. Please see the corresponding [issue #964 at react-hot-loader](https://github.com/gaearon/react-hot-loader/issues/964).
- Added better typings so that FocusZone passes strict type checks.
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
    - Focus related utilities moved to `FocusUtilities.ts`.