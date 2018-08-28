## FocusZone Changelog

This is a list of changes made to this Stardust copy of FocusZone in comparison with the original [Fabric FocusZone @ 0f567e05952c6b50c691df2fb72d100b5e525d9e](https://github.com/OfficeDev/office-ui-fabric-react/blob/0f567e05952c6b50c691df2fb72d100b5e525d9e/packages/office-ui-fabric-react/src/components/FocusZone/FocusZone.tsx).

### feat(FocusZone): Implement FocusZone into renderComponent [#116](https://github.com/stardust-ui/react/pull/116)
- Prettier and linting fixes, e.g., removing semicolons, removing underscores from private methods.
- Replacing path `../../Utilities` with `@uifabric/utilities`.
- Moving `IS_FOCUSABLE_ATTRIBUTE` to `../interfaces` and exporting `FOCUSZONE_ID_ATTRIBUTE` so it can be used in unit tests.
- Adding prop types.
- Adding `preventDefaultWhenHandled` property and method, added to `_onKeyDown`.