<!--[ INSTRUCTIONS ]-----------------------------------------------------------

  Add your PR as line under [Unreleased].  The following headings are allowed:

  ### BREAKING CHANGES
  ### Fixes
  ### Features
  ### Performance
  ### Documentation

  Add a line under the appropriate header using this format:
  - <A helpful short description> @<github username> (<PR number>)

------------------------------------------------------------------------------->
# Changelog
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixes
- Update `ChatMessage` styles in Teams themes @layershifter ([#1246](https://github.com/stardust-ui/react/pull/1246))
- Fix `propTypes` warning in `ListItem` @layershifter ([#1266](https://github.com/stardust-ui/react/pull/1266))

<!--------------------------------[ v0.29.0 ]------------------------------- -->
## [v0.29.0](https://github.com/stardust-ui/react/tree/v0.29.0) (2019-04-24)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.28.1...v0.29.0)

### BREAKING CHANGES
- Rename `inputFocusBorderBottomColor` to `inputFocusBorderColor` in `InputVariables` @layershifter ([#1247](https://github.com/stardust-ui/react/pull/1247))

### Fixes
- Fix onClick in `DropdownItem` to accept user callback and have its event propagation stopped @silviuavram ([#1248](https://github.com/stardust-ui/react/pull/1248))
- Fix a11y message cleanup for add and remove items in `Dropdown` @silviuavram ([#1237](https://github.com/stardust-ui/react/pull/1237))

### Features
- Move `Input` styles to Base theme @layershifter ([#1247](https://github.com/stardust-ui/react/pull/1247))
- Add `role` attribute to `Popup`'s content in accessibility behaviors @sophieH29 ([1253](https://github.com/stardust-ui/react/pull/1253))

<!--------------------------------[ v0.28.1 ]------------------------------- -->
## [v0.28.1](https://github.com/stardust-ui/react/tree/v0.28.1) (2019-04-23)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.28.0...v0.28.1)

### Fixes
- Fix missing npm packages in v0.28.0 @layershifter ([#1251](https://github.com/stardust-ui/react/pull/1251))
<!--------------------------------[ v0.28.0 ]------------------------------- -->
## [v0.28.0](https://github.com/stardust-ui/react/tree/v0.28.0) (2019-04-22)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.27.0...v0.28.0)

### BREAKING CHANGES
- Add `box-sizing: border-box` to all elements, as well as before and after pseudo elements in Teams theme @mnajdova ([#1057](https://github.com/stardust-ui/react/pull/1057))

### Fixes
- Fix overflowing focus outline for `Grid` items for Teams theme @Bugaa92 ([#1195](https://github.com/stardust-ui/react/pull/1195))
- Fix routing for accessibility documentation @sophieH29 ([#1208](https://github.com/stardust-ui/react/pull/1208))
- Fix `content` prop type in `Dialog` @layershifter ([#1212](https://github.com/stardust-ui/react/pull/1212))
- Fix themeing for Teams theme at mention nubbin and left bar in `ChatMessage` [redlines] @codepretty ([#1232](https://github.com/stardust-ui/react/pull/1232))
- Add `keyboard` up & down key controls for the `Tree` component @priyankar205 ([#1219](https://github.com/stardust-ui/react/pull/1219))
- Add `keyboard` enter & spacebar key controls for the `Tree` component @priyankar205 ([#1233](https://github.com/stardust-ui/react/pull/1233))
- Simplify DOM structure in `List` component when not all slot are defined @layershifter ([#1218](https://github.com/stardust-ui/react/pull/1218))
- `Menu` as `Toolbar` - left/right arrow keys should not activate prev/next parent when focus in in the toolbar submenu @sophieH29 ([#1199](https://github.com/stardust-ui/react/pull/1199))
- Add `isFromKeyboard` to `Alert` component @layershifter ([#1238](https://github.com/stardust-ui/react/pull/1238))

### Features
- Add `Embed` and `Video` components @stuartlong ([#1108](https://github.com/stardust-ui/react/pull/1108))
- Move `Flex` styles to `base` theme @kuzhelov ([#1206](https://github.com/stardust-ui/react/pull/1206))
- Add file video icon on `Icon` component @luzhon  ([#1205](https://github.com/stardust-ui/react/pull/1250))
- Export `call-missed-line` icon in Teams theme @96andrei ([#1203](https://github.com/stardust-ui/react/pull/1203))
- Add `pointing` prop to `Popup` ([#1198](https://github.com/stardust-ui/react/pull/1198))
- [Teams Theme] Export missing read-aloud icon in Teams Theme @joheredi ([#1225](https://github.com/stardust-ui/react/pull/1225))
- Add styles for scrollbar to `ProviderBox` in Teams Theme ([#1223](https://github.com/stardust-ui/react/pull/1223))
- Export `FocusZoneMode` type @sophieH29 ([#1229](https://github.com/stardust-ui/react/pull/1229))

<!--------------------------------[ v0.27.0 ]------------------------------- -->
## [v0.27.0](https://github.com/stardust-ui/react/tree/v0.27.0) (2019-04-10)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.26.0...v0.27.0)

### BREAKING CHANGES
- Rename `flipInRtl` Icon's `slot` to `svgFlippingInRtl` in Teams theme @mnajdova ([#1179](https://github.com/stardust-ui/react/pull/1179))
- Do not set html `font-size` in theme static styles @miroslavstastny ([#1190](https://github.com/stardust-ui/react/pull/1190))

### Fixes
- Fix the reset of the `highlightedIndex` when search query changes @silviuavram ([#1168](https://github.com/stardust-ui/react/pull/1168))
- Fix click triggering logic of `Space` and `Enter` keys for `MenuItem` @kuzhelov ([#1175](https://github.com/stardust-ui/react/pull/1175))
- Truncate `content` and `header` of `ListItem` when used from `DropdownSelectedItem` @silviuavram ([#1161](https://github.com/stardust-ui/react/pull/1161))
- Fix `rotate` prop on `Icon` not working in `rtl` @mnajdova ([#1179](https://github.com/stardust-ui/react/pull/1179))
- Updated theming for `Attachment` for Teams, Teams Dark and Teams Contrast @bcalvery ([#1033](https://github.com/stardust-ui/react/pull/1033))
- `FocusTrapZone` - Do not propagate any keyboard events @sophieH29 ([#1180](https://github.com/stardust-ui/react/pull/1180))
- Capture effect of `Esc` key down event within component for `Popup` and `Dropdown` @kuzhelov ([#1183](https://github.com/stardust-ui/react/pull/1183))
- Fix prop types of `MenuItem` @kuzhelov ([#1197](https://github.com/stardust-ui/react/pull/1197))
- Fix example's code of `Theming Examples` guide @kuzhelov ([#1192](https://github.com/stardust-ui/react/pull/1192))

### Features
- Add `Reaction` variables to Teams dark and HOC themes @mnajdova ([#1152](https://github.com/stardust-ui/react/pull/1152))
- Move `Grid`'s and `Image`'s styles and variables from Teams to base theme @mnajdova ([#1182](https://github.com/stardust-ui/react/pull/1182))
- Export `play` and `pause` icons in Teams theme @layershifter ([#1189](https://github.com/stardust-ui/react/pull/1189))
- Export `eye` and `eye-slash` icons in Teams theme @alinais ([#1194](https://github.com/stardust-ui/react/pull/1194))

### Performance
- Drop usages of `FelaTheme` component and use `React.Context` to get `theme` directly @layershifter ([#1163](https://github.com/stardust-ui/react/pull/1163))
- Use `tslib` to replace helpers with their imports, reduces bundle size @layershifter ([#1184](https://github.com/stardust-ui/react/pull/1184))

<!--------------------------------[ v0.26.0 ]------------------------------- -->
## [v0.26.0](https://github.com/stardust-ui/react/tree/v0.26.0) (2019-04-03)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.25.1...v0.26.0)

### BREAKING CHANGES
- Remove `Indicator` component, the usages should be replaced with the `Icon` component @mnajdova ([#1120](https://github.com/stardust-ui/react/pull/1120))
- Add shorthand support for `header` and `content` in `Dropdown`,` DropdownSelectedItem.slotClassNames.removeIcon` usages should be replaced with `DropdownSelectedItem.slotClassNames.icon` @silviuavram ([#1054](https://github.com/stardust-ui/react/pull/1054))
- `react@16.8` and `react-dom@16.8` are now required @layershifter ([#1147](https://github.com/stardust-ui/react/pull/1147))
- Remove `truncateStart`, `truncateMain` and `truncateEnd` props from `Layout` component and `truncateContent` and `truncateHeader` props from `ItemLayout` component @Bugaa92 ([#1127](https://github.com/stardust-ui/react/pull/1127))
- `color` and `backgroundColor` variables were moved from `PopupContent` to `popup` slot of `Popup` component @kuzhelov ([#1121](https://github.com/stardust-ui/react/pull/1121))

### Fixes
- Update vertical && pointing `Menu` styles @jaanus03 ([#1116](https://github.com/stardust-ui/react/pull/1116))
- Fix in `Dropdown`, close it after `searchQuery` will become empty @layershifter ([#1124](https://github.com/stardust-ui/react/pull/1124))
- Correctly align RTL text in LTR theme and vice versa @miroslavstastny ([#1115](https://github.com/stardust-ui/react/pull/1115))
- `chatBehavior` - remove role 'presentation' @sophieH29 ([#1137](https://github.com/stardust-ui/react/pull/1137))
- Temporarily remove static type references in `slotClassNames` to prevent circular dependency crashes @kuzhelov ([#1145](https://github.com/stardust-ui/react/pull/1145))
- Fix `EventListener` to not rerender on `listener` prop change @layershifter ([#1132](https://github.com/stardust-ui/react/pull/1132))
- Fix circular dependencies from inferior modules to `index` files @kuzhelov ([#1148](https://github.com/stardust-ui/react/pull/1148))
- Fix Invalid DOM property `stop-color` in Teams theme icons @codepretty ([#1157](https://github.com/stardust-ui/react/pull/1157))
- Fix invalid import in `Alert` @mnajdova ([#1159](https://github.com/stardust-ui/react/pull/1159))

### Features
- Add predefined icon set for the usages in the `Input`, `Dropdown` and `AccordionTitle` components @mnajdova ([#1120](https://github.com/stardust-ui/react/pull/1120))
- Add `Popup` styles to Teams Dark and High Contrast themes @kuzhelov ([#1121](https://github.com/stardust-ui/react/pull/1121))
- export `flag` icon in Teams theme @jaanus03 ([#1133](https://github.com/stardust-ui/react/pull/1133))
- Make `MenuItem`'s submenu open state controlled @sophieH29 ([#1125](https://github.com/stardust-ui/react/pull/1125))
- Add behaviors for `Alert` component @jurokapsiar ([#1119](https://github.com/stardust-ui/react/pull/1119))
- Add functionality for programmatically setting the source in the `what-input` service and used it in the `Popup` component @mnajdova ([#1151](https://github.com/stardust-ui/react/pull/1151))

<!--------------------------------[ v0.25.1 ]------------------------------- -->
## [v0.25.1](https://github.com/stardust-ui/react/tree/v0.25.1) (2019-03-29)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.25.0...v0.25.1)

### Fixes
- Fix narration for `Menu` @miroslavstastny ([#1105](https://github.com/stardust-ui/react/pull/1105))
- Fix `timestamp` to be shown if the `reactionGroup` prop is applied on the `ChatMessage` component in Teams theme @mnajdova ([#1100](https://github.com/stardust-ui/react/pull/1100))
- Fix typings for `FlexProps` and `FlexItemProps` @miroslavstastny ([#1089](https://github.com/stardust-ui/react/pull/1089))
- Fix `selectableFocusHoverColor` value in `List` for Teams theme @layershifter ([#1113](https://github.com/stardust-ui/react/pull/1113))
- Align `slotClassNames` property for all components @Bugaa92 ([#1093](https://github.com/stardust-ui/react/pull/1093))
- Fix `selectedBackgroundColor`/`selectableFocusHoverColor` value in `List` for Teams Dark and Teams HC themes @layershifter ([#1117](https://github.com/stardust-ui/react/pull/1117))
- Fix `Dropdown` multiple selection tab behavior and single search selection blur reset @silviuavram ([#1118](https://github.com/stardust-ui/react/pull/1118))
- Add missing types to `role` in accessibility @layershifter ([#1125](https://github.com/stardust-ui/react/pull/1126))

### Features
- Add `attached` prop on the `ChatMessage` component, which is automatically set by the `ChatItem` component @mnajdova ([#1100](https://github.com/stardust-ui/react/pull/1100))
- Align `Alert` component styles to latest design for Teams theme @Bugaa92 ([#1111](https://github.com/stardust-ui/react/pull/1111))
- Add support for SVG animations to `Loader`, update in Teams theme @layershifter ([#1097](https://github.com/stardust-ui/react/pull/1097))
- Export `ban` and `exclamation-circle` icons in Teams theme @kuzhelov ([#1123](https://github.com/stardust-ui/react/pull/1123))

### Documentation
- Fix example permalinks @miroslavstastny ([#1122](https://github.com/stardust-ui/react/pull/1122))

<!--------------------------------[ v0.25.0 ]------------------------------- -->
## [v0.25.0](https://github.com/stardust-ui/react/tree/v0.25.0) (2019-03-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.24.0...v0.25.0)

### BREAKING CHANGES
- `Provider` now renders `div` element with `dir`, `color` and `background` @miroslavstastny ([#852](https://github.com/stardust-ui/react/pull/852))

### Fixes
- Fix `RadioButtonGroup` Teams theme styles to be correct @notandrew ([#830](https://github.com/stardust-ui/react/pull/830))

<!--------------------------------[ v0.24.0 ]------------------------------- -->
## [v0.24.0](https://github.com/stardust-ui/react/tree/v0.24.0) (2019-03-25)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.23.1...v0.24.0)

### BREAKING CHANGES
- Use regular components instead of `Label` in `RadioGroupItem` @layershifter ([#1070](https://github.com/stardust-ui/react/pull/1070))
- Remove `Flex.Gap` component, and convert the `gap` styles to `margins` on the child elements of the `Flex` component @mnajdova ([#1074](https://github.com/stardust-ui/react/pull/1074))
- `Dropdown`: control highlightedIndex from `Dropdown` @silviuavram ([#966](https://github.com/stardust-ui/react/pull/966))

### Fixes
- Add aria posinset and setsize, hide menu indicator from narration @jurokapsiar ([#1066](https://github.com/stardust-ui/react/pull/1066))
- Fix applying accessibility key handlers @layershifter ([#1072](https://github.com/stardust-ui/react/pull/1072))
- Fix `shrink` prop behavior for `Flex.Item` @kuzhelov ([#1086](https://github.com/stardust-ui/react/pull/1086))
- Disable `devMode` for Fela by default @layershifter ([#1090](https://github.com/stardust-ui/react/pull/1090))
- Fix accessibility types for aria attributes @layershifter ([#1087](https://github.com/stardust-ui/react/pull/1087))
- Fix `action` prop size issue for `Alert` @Bugaa92 ([#1083](https://github.com/stardust-ui/react/pull/1083))
- Fix issues with clicks inside nested `Popup`s @layershifter ([#949](https://github.com/stardust-ui/react/pull/949))

### Features
- Add `Alert` component @Bugaa92 ([#1063](https://github.com/stardust-ui/react/pull/1063))
- Add `placeholderColor` variable for `Input` component in Teams theme @layershifter ([#1092](https://github.com/stardust-ui/react/pull/1092))
- Add and export files icons in Teams theme @codepretty ([#1094](https://github.com/stardust-ui/react/pull/1094))

### Documentation
- Add layout guide @kuzhelov ([#1091](https://github.com/stardust-ui/react/pull/1091))

<!--------------------------------[ v0.23.1 ]------------------------------- -->
## [v0.23.1](https://github.com/stardust-ui/react/tree/v0.23.1) (2019-03-13)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.23.0...v0.23.1)

### Fixes
- Do not propagate keyboard events outside `Popup`'s content only when focus trap is used @sophieH29 ([#1028](https://github.com/stardust-ui/react/pull/1028))
- Narrate the first adding/selection of a `Dropdown` item using aria live @silviuavram ([#1032](https://github.com/stardust-ui/react/pull/1032))
- `*Props` interfaces accept additional props @layershifter ([#1042](https://github.com/stardust-ui/react/pull/1042))
- `chatBehavior` - Use `FocusZone`'s Embed mode instead of Wrap mode @sophieH29 ([#1044](https://github.com/stardust-ui/react/pull/1044))
- Fix broken border in `Input` when it's focused in Teams theme @layershifter ([#1041](https://github.com/stardust-ui/react/pull/1041))

### Features
- Add `inline` prop in the `Popup` for rendering the content next to the trigger element @mnajdova ([#1017](https://github.com/stardust-ui/react/pull/1017))
- Add `exclusive` prop in the `Tree` for expanding one tree item at a time
@priyankar205 ([#1018](https://github.com/stardust-ui/react/pull/1018))
- Export `call-pstn` and `skype-logo` SVG icons to the Teams theme @thewulf7 ([#929](https://github.com/stardust-ui/react/pull/968))
- Export some Office brand SVG icons to the Teams theme, including `word`, `word-color`, `excel`, `excel-color`, `powerpoint`, `powerpoint-color`, `onenote`, `onenote-color` @codepretty ([#938](https://github.com/stardust-ui/react/pull/938))

### Documentation
- Add disabled state to menu as toolbar doc example @codepretty ([#933](https://github.com/stardust-ui/react/pull/933))

<!--------------------------------[ v0.23.0 ]------------------------------- -->
## [v0.23.0](https://github.com/stardust-ui/react/tree/v0.23.0) (2019-03-06)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.22.1...v0.23.0)

### BREAKING CHANGES
- Changed types of the slot's inside the `ListItem` component (`media`, `content`, `contentMedia`, `header`, `headerMedia` and `endMedia`) from `any` to `ShorthandValue` @mnajdova ([#886](https://github.com/stardust-ui/react/pull/886))
- Changed class names of the slots inside the `ListItem` (`ItemLayout`'s classnames were replaced with `ListItem`'s) @mnajdova ([#886](https://github.com/stardust-ui/react/pull/886))
- Replace the `outline` variable with the `outline` prop in `Icon` @layershifter ([#1002](https://github.com/stardust-ui/react/pull/1002))

### Fixes
- Remove space between `Button.Group` items without `circular` prop @Bugaa92 ([#973](https://github.com/stardust-ui/react/pull/973))
- Fix allow `Text` component when rendered as div to behave as block element in Teams theme @mnajdova ([#940](https://github.com/stardust-ui/react/pull/940))
- Correctly apply static styles if the first `Provider` rendered is RTL @miroslavstastny ([#960](https://github.com/stardust-ui/react/pull/960))
- Fix font-based `Icon` styles in Teams theme @kuzhelov ([#976](https://github.com/stardust-ui/react/pull/976))
- Refactor the `ListItem` component to use the `Flex` components instead of `ItemLayout` @mnajdova ([#886](https://github.com/stardust-ui/react/pull/886))
- Fixed distance of the `content` and `reactionGroup` from the `badge` in the `ChatMessage` component for Teams theme @mnajdova ([#986](https://github.com/stardust-ui/react/pull/986))
- Do not propagate keyboard events outside `Popup`'s content @sophieH29 ([#987](https://github.com/stardust-ui/react/pull/987/))
- Fixed emoji `Icon` spacing issue and added settings `Icon` ([#991](https://github.com/stardust-ui/react/pull/991))
- Call update `node` if it was changed for `Ref` component @layershifter ([#993](https://github.com/stardust-ui/react/pull/993))
- Close previous `Popup` on enter key @jongsue ([#985](https://github.com/stardust-ui/react/pull/985))
- Fixed Shift+Tab navigation from `DropdownSelectedItem` @silviuavram ([#1004](https://github.com/stardust-ui/react/pull/1004))
- Fixed color of the `timestamp` in `ChatMessages` marked as `mine` in Teams theme @mnajdova ([#1010](https://github.com/stardust-ui/react/pull/1010))
- Updated table `Icon` & search `Icon` ([#1011](https://github.com/stardust-ui/react/pull/1011))
- Improve `Menu` styling, vertical menu in Teams theme ([#934](https://github.com/stardust-ui/react/pull/934))

### Features
- Add `delay` prop for `Loader` component @layershifter ([#969](https://github.com/stardust-ui/react/pull/969))
- Add `getNextElement`, `getPreviousElement` and `focusAsync` to exported as `FocusZoneUtilities` @layershifter ([#981](https://github.com/stardust-ui/react/pull/981))
- Add `Reaction` and `ReactionGroup` components @mnajdova ([#959](https://github.com/stardust-ui/react/pull/959))
- Add `reactionGroup` and `reactionGroupPosition` props to the `ChatMessage` component @mnajdova ([#959](https://github.com/stardust-ui/react/pull/959))
- Set `aria-modal` attribute for both Dialog and Popup with focus trap @sophieH29 ([#995](https://github.com/stardust-ui/react/pull/995))
- Allow arrays as shorthand for the Components containing prop of type `CollectionShorthand` @mnajdova ([#996](https://github.com/stardust-ui/react/pull/996))
- Allow to pass `children` and `content` to `MenuDivider` @layershifter ([#1009](https://github.com/stardust-ui/react/pull/1009))
- Add `AutoFocusZone` component, for focusing inner element on mount @mnajdova ([#1015](https://github.com/stardust-ui/react/pull/1015))

### Documentation
- Add `MenuButton` prototype (only available in development mode) @layershifter ([#947](https://github.com/stardust-ui/react/pull/947))

<!--------------------------------[ v0.22.1 ]------------------------------- -->
## [v0.22.1](https://github.com/stardust-ui/react/tree/v0.22.1) (2019-02-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.22.0...v0.22.1)

### Fixes
- Fix `createComponent()` typings and documentation examples @Bugaa92 ([#954](https://github.com/stardust-ui/react/pull/954))

### Documentation
- Fix the sidebar missing items for docsite @alinais ([#971](https://github.com/stardust-ui/react/pull/971))

<!--------------------------------[ v0.22.0 ]------------------------------- -->
## [v0.22.0](https://github.com/stardust-ui/react/tree/v0.22.0) (2019-02-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.21.1...v0.22.0)

### BREAKING CHANGES
- Remove logic for adding borders by default if the `Icon` has the `circular` prop @mnajdova ([#907](https://github.com/stardust-ui/react/pull/907))

### Fixes
- Display correctly images in portrait mode inside `Avatar` @layershifter ([#899](https://github.com/stardust-ui/react/pull/899))
- Expose `Popup`'s content Ref @sophieH29 ([#913](https://github.com/stardust-ui/react/pull/913))
- Fix `Button` Teams theme styles to use semibold weight @notandrew ([#829](https://github.com/stardust-ui/react/pull/829))
- Fix conflicts of generated names in Fela with FontAwesome @layershifter ([#951](https://github.com/stardust-ui/react/pull/951))
- Call callbacks after the clear action in `Input` and `Dropdown` @layershifter ([#956](https://github.com/stardust-ui/react/pull/956))
- Fix `ChatMessage` styles for Teams theme @kuzhelov ([#962](https://github.com/stardust-ui/react/pull/962))
- Fix the order of applied props in `Status` component @layershifter ([#961](https://github.com/stardust-ui/react/pull/961))
- Remove redundant margins for `Button` and `Icon` components and fix layout of `Dialog` component and affected examples @Bugaa92 ([#945](https://github.com/stardust-ui/react/pull/945))
- Prevent appearance of `actions` slot on hover over area outside of `ChatMessage` @kuzhelov ([#953](https://github.com/stardust-ui/react/pull/953))
- Export variables for the `DropdownItem`, `DropdownSearchInput` and `DropdownSelectedItem` components in Teams theme ([#967](https://github.com/stardust-ui/react/pull/967))

### Features
- Export `lock` SVG icon @VyshnaviDasari ([#906](https://github.com/stardust-ui/react/pull/906))
- Adding status behavior @kolaps33 ([#880](https://github.com/stardust-ui/react/pull/880))
- Add basic animation library for Teams theme @bhamlefty @mnajdova ([#871](https://github.com/stardust-ui/react/pull/871))
- Export `accept` and `urgent` SVG icons to the Teams theme @joheredi([#929](https://github.com/stardust-ui/react/pull/929))
- Add `open`, `defaultOpen` and `onOpenChange` props for `Dropdown` component (controlled mode) @Bugaa92 ([#900](https://github.com/stardust-ui/react/pull/900))
- Add `accessibility` prop to all components that supports it @layershifter ([#927](https://github.com/stardust-ui/react/pull/927))
- Export `FocusZone` types @sophieH29 ([#943](https://github.com/stardust-ui/react/pull/943/))
- Export `chevron-down`, `download`, `search`, `email` and `star` SVG icons to the Teams theme @pajindal([#955](https://github.com/stardust-ui/react/pull/955))

### Documentation
- Add `Editable Area with Dropdown` prototype for mentioning people using `@` character (only available in development mode) @Bugaa92 ([#931](https://github.com/stardust-ui/react/pull/931))
- Adjust styles of `Portal` examples @kuzhelov ([#953](https://github.com/stardust-ui/react/pull/953))

<!--------------------------------[ v0.21.1 ]------------------------------- -->
## [v0.21.1](https://github.com/stardust-ui/react/tree/v0.21.1) (2019-02-14)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.21.0...v0.21.1)

### BREAKING CHANGES
- Removed colors from `siteVariables` in Teams theme @mnajdova ([#858](https://github.com/stardust-ui/react/pull/858))

### Features
- Export `arrow-up`,`arrow-down` and `chat` SVG icon @VyshnaviDasari ([#873](https://github.com/stardust-ui/react/pull/873))
- Export `FocusZone`'s utilities @sophieH29 ([#876](https://github.com/stardust-ui/react/pull/876))
- Add `clearable` prop for `Dropdown` @layershifter ([#885](https://github.com/stardust-ui/react/pull/885))

### Fixes
- Properly handle falsy values provided as `Flex` and `Flex.Item` children @kuzhelov ([#890](https://github.com/stardust-ui/react/pull/890))
- Update cached `rem` size value of `pxToRem` on theme static styles render @kuzhelov ([#883](https://github.com/stardust-ui/react/pull/883))
- Stardust in TS project with `--isolatedModules` can be built @layershifter ([#894](https://github.com/stardust-ui/react/pull/894))
- Keyframes are behaving as expected when RTL is dynamically switched @layershifter ([#894](https://github.com/stardust-ui/react/pull/894))
- Fix inserting char at a cursor position will the cursor to end in `Dropdown` @layershifter ([#897](https://github.com/stardust-ui/react/pull/897))
- Replace margins with padding in `chatItemStyles` for Teams theme ([#878](https://github.com/stardust-ui/react/pull/878))

<!--------------------------------[ v0.21.0 ]------------------------------- -->
## [v0.21.0](https://github.com/stardust-ui/react/tree/v0.21.0) (2019-02-12)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.20.0...v0.21.0)

### BREAKING CHANGES
- Changed site variables' `colors.black` to be `#000` instead of `grey[900](#252424)` in Teams theme @mnajdova ([#855](https://github.com/stardust-ui/react/pull/855))

### Features
- Add single search flavor for `Dropdown` component @Bugaa92 ([#839](https://github.com/stardust-ui/react/pull/839))
- Add multiple selection flavor for `Dropdown` component @Bugaa92 ([#845](https://github.com/stardust-ui/react/pull/845))
- Add `black` and `white` options for the `color` prop of the `Label` component @mnajdova ([#855](https://github.com/stardust-ui/react/pull/855))
- Add `Flex` component @kuzhelov ([#802](https://github.com/stardust-ui/react/pull/802))
- Add `inline` prop for `Dropdown` component @Bugaa92 ([#863](https://github.com/stardust-ui/react/pull/863))

### Fixes
- Focus the last focused element which triggered `Popup` on ESC @sophieH29 ([#861](https://github.com/stardust-ui/react/pull/861))
- Changing the focus zone to embed for gridBehavior @kolaps33 ([#844] (https://github.com/stardust-ui/react/pull/844))
- Add polyfills to correctly work in IE11 @layershifter ([#868](https://github.com/stardust-ui/react/pull/868))
- Fix selectors for `ItemLayout` class names in the `listItemStyles` in Teams theme @mnajdova([#882](https://github.com/stardust-ui/react/pull/882))

### Documentation
- Add screener with steps testing documentation @silviuavram ([#856](https://github.com/stardust-ui/react/pull/856))
- Move color palette link to prototypes section @codepretty ([#884](https://github.com/stardust-ui/react/pull/884))

<!--------------------------------[ v0.20.0 ]------------------------------- -->
## [v0.20.0](https://github.com/stardust-ui/react/tree/v0.20.0) (2019-02-06)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.19.2...v0.20.0)

### BREAKING CHANGES
- Generalize size values for `Avatar` and `Status` components @kuzhelov ([#828](https://github.com/stardust-ui/react/pull/828))
- Remove `AvatarPropsWithDefaults` and `StatusPropsWithDefaults` from public API @kuzhelov ([#828](https://github.com/stardust-ui/react/pull/828))
- Rename `combobox` to `root` in `dropdownSearchInputStyles` @layershifter ([#816](https://github.com/stardust-ui/react/pull/816))
- Renamed class names for the slots inside the `ItemLayout` component @mnajdova ([#827](https://github.com/stardust-ui/react/pull/827))

### Features
- Accessibility for menu divider @jurokapsiar ([#822](https://github.com/stardust-ui/react/pull/822))
- Add static outline and filled class names to icons in Teams theme @miroslavstastny ([#834](https://github.com/stardust-ui/react/pull/834))
- Added slot class names in `ChatMessage`, `ChatItem`, `Dropdown`, `ItemLayout`, `Layout`, `MenuItem` @mnajdova ([#827](https://github.com/stardust-ui/react/pull/827))
- Add `badge` and `badgePosition` properties on the `ChatMessage` @mnajdova ([#823](https://github.com/stardust-ui/react/pull/823))
- Add `hasMention`, `isImportant`, `hasMentionColor` and `isImportantColor` in ChatMessage variables in Teams theme @mnajdova ([#841](https://github.com/stardust-ui/react/pull/841))
- Add `actionMenu` prop to `ChatMessage` component @layershifter ([#811](https://github.com/stardust-ui/react/pull/811))
- Add `rtl` field in the `SvgIconFuncArg`, and used it in Teams theme's number-list icon ([#851](https://github.com/stardust-ui/react/pull/851))
- Add keyboard navigation between selected items in `Dropdown` multiple version @silviuavram ([#842](https://github.com/stardust-ui/react/pull/842))

### Fixes
- Fix `Dropdown` component styles regression @Bugaa92 ([#824](https://github.com/stardust-ui/react/pull/824))
- Update vulnerable version of `lodash` dependency  @kuzhelov ([#840](https://github.com/stardust-ui/react/pull/840))
- Add `displayName` property to `Ref` and `Provider` components @layershifter ([#836](https://github.com/stardust-ui/react/pull/836))
- Wrap error text of docs code editor @kuzhelov ([#843](https://github.com/stardust-ui/react/pull/843))

<!--------------------------------[ v0.19.2 ]------------------------------- -->
## [v0.19.2](https://github.com/stardust-ui/react/tree/v0.19.2) (2019-02-01)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.19.1...v0.19.2)

### Features
- Export `triangle-down` and `triangle-right` icons in Teams theme @codepretty ([#785](https://github.com/stardust-ui/react/pull/785))
- Add RTL examples for `Button` and `Divider` components @mnajdova ([#792](https://github.com/stardust-ui/react/pull/792))
- Add mechanism for marking icons that should rotate in RTL in Teams theme; marked icons: `send`, `bullets`, `leave`, `outdent`, `redo`, `undo`, `send` @mnajdova ([#788](https://github.com/stardust-ui/react/pull/788))
- Remove ability to introduce global style overrides for HTML document from `pxToRem` @kuzhelov ([#789](https://github.com/stardust-ui/react/pull/789))
- Padding variable for horizontal menu @jurokapsiar ([#808](https://github.com/stardust-ui/react/pull/808))
- Remove handledProps from behaviors @jurokapsiar ([#805](https://github.com/stardust-ui/react/pull/805))
- Add `create` shorthand factory to `Header` component @layershifter ([#809](https://github.com/stardust-ui/react/pull/809))
- Add `keyframeParams` prop in the `Animation` component and the `animation` prop @mnajdova ([#794](https://github.com/stardust-ui/react/pull/794))
- Add `Dialog` component @layershifter ([#790](https://github.com/stardust-ui/react/pull/790))
- Add sample screener tests with steps for `Dropdown` @silviuavram ([#797](https://github.com/stardust-ui/react/pull/797))
- Add shorthand support for `triggerButton` in `Dropdown` @silviuavram ([#815](https://github.com/stardust-ui/react/pull/815))
- Add toggle functionality in the `Popoup` even if the `trigger` is not button @kolaps33 ([#758](https://github.com/stardust-ui/react/pull/758))

### Fixes
- Handle `onClick` and `onFocus` on ListItems correctly @layershifter ([#779](https://github.com/stardust-ui/react/pull/779))
- Remove popup trigger button default role @jurokapsiar ([#806](https://github.com/stardust-ui/react/pull/806))
- Improve `Dropdown` component styles @Bugaa92 ([#786](https://github.com/stardust-ui/react/pull/786))
- Preserve outside click subscription on `Popup` and `MenuItem` component updates @kuzhelov ([#803](https://github.com/stardust-ui/react/pull/803))
- Exports `Menu`'s variables as `MenuItem` and `MenuDivider`'s variables in `Teams` theme @mnajdova ([#814](https://github.com/stardust-ui/react/pull/814))
- Fix `Avatar` - Add white circle border in contrast theme @bcalvery ([#795](https://github.com/stardust-ui/react/pull/795))
- Dix `MenuDivider` not shown on horizontal `Menu` @mnajdova ([#813](https://github.com/stardust-ui/react/pull/813))

<!--------------------------------[ v0.19.1 ]------------------------------- -->
## [v0.19.1](https://github.com/stardust-ui/react/tree/v0.19.1) (2019-01-29)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.19.0...v0.19.1)

### Fixes
- Fix layout of `Accordion` panel's title @kuzhelov ([#780](https://github.com/stardust-ui/react/pull/780))
- Allow to use `createRef()` API with `triggerRef` prop in `Portal` component @layershifter ([#787](https://github.com/stardust-ui/react/pull/787))

<!--------------------------------[ v0.19.0 ]------------------------------- -->
## [v0.19.0](https://github.com/stardust-ui/react/tree/v0.19.0) (2019-01-28)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.18.0...v0.19.0)

### BREAKING CHANGES
- Update variable names in themes, add missing sizes @layershifter ([#762](https://github.com/stardust-ui/react/pull/762))
- Rename `toggleButton` prop to `toggleIndicator` and make it visible by default @layershifter ([#729](https://github.com/stardust-ui/react/pull/729))
- Remove `props` from variables resolution process @kuzhelov ([#770](https://github.com/stardust-ui/react/pull/770))
- Update Fela and is deps to latest, `10.1.3` is required @layershifter ([#768](https://github.com/stardust-ui/react/pull/768))
- Replaced `gutterPosition` with `contentPosition` in ChatItem (`contentPosition='end'` should be added on the ChatItems containing ChatMessage with `mine` prop for teams theme) @mnajdova ([#767](https://github.com/stardust-ui/react/pull/767))

### Features
- Add `loading` prop for `Dropdown` @layershifter ([#729](https://github.com/stardust-ui/react/pull/729))
- Export `close` icon in Teams theme @alinais ([#774](https://github.com/stardust-ui/react/pull/774))
- Add `attached` prop for ChatItem @mnajdova ([#767](https://github.com/stardust-ui/react/pull/767))

### Fixes
- Make `headerMedia` visible for screen readers in `ListItem` @layershifter ([#772](https://github.com/stardust-ui/react/pull/772))
- Cleanup for `Dropdown` examples' accessibility and added localisation example. @silviuavram ([#771](https://github.com/stardust-ui/react/pull/771))
- Fix highlighted selected option in single selection `Dropdown` when opened @silviuavram ([#726](https://github.com/stardust-ui/react/pull/726))

<!--------------------------------[ v0.18.0 ]------------------------------- -->
## [v0.18.0](https://github.com/stardust-ui/react/tree/v0.18.0) (2019-01-24)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.17.0...v0.18.0)

### BREAKING CHANGES
- Forwarding props for `createShorthand` calls if the value is a React element @mnajdova ([#759](https://github.com/stardust-ui/react/pull/759))
- Rename `Slot` component to `Box` and export it @Bugaa92 ([#713](https://github.com/stardust-ui/react/pull/713))

### Fixes
- Fix focus outline visible only during keyboard navigation in `ListItem` @layershifter ([#727](https://github.com/stardust-ui/react/pull/727))
- Pass `jest --detectLeaks` tests @miroslavstastny ([#718](https://github.com/stardust-ui/react/pull/718))
- Fix Avatar's size example @mnajdova ([#745](https://github.com/stardust-ui/react/pull/745))
- Fix teams theme `Status` and `Chat.Message` styles ([#747](https://github.com/stardust-ui/react/pull/747))
- Fix `Popup` - do not stop event propagation when pressing Esc on trigger element @sophieH29 ([#750](https://github.com/stardust-ui/react/pull/750))
- Fix alignment of `Layout`'s `main` area @kuzhelov ([#752](https://github.com/stardust-ui/react/pull/752))
- Call `Popup` `onOpenChange` on all user initiated events @levithomason ([#619](https://github.com/stardust-ui/react/pull/619))
- Fix `ChatMessage` - Author element should always be rendered @sophieH29 ([#761](https://github.com/stardust-ui/react/pull/761))

### Features
- Add and export 'missed call' icon in Teams theme @codepretty ([#748](https://github.com/stardust-ui/react/pull/748))
- Add `Indicator` component and used it in `MenuItem` and `AccordionTitle` @mnajdova ([#721](https://github.com/stardust-ui/react/pull/721))
- Expose `renderItem` and `renderSelectedItem` callbacks API for `Dropdown` @layershifter ([#746](https://github.com/stardust-ui/react/pull/746))
- Add RTL support for the strings used inside the components @mnajdova ([#704](https://github.com/stardust-ui/react/pull/704))

### Documentation
- Refine Shorthand docs page content @kuzhelov ([#751](https://github.com/stardust-ui/react/pull/751))

<!--------------------------------[ v0.17.0 ]------------------------------- -->
## [v0.17.0](https://github.com/stardust-ui/react/tree/v0.17.0) (2019-01-17)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.16.2...v0.17.0)

### BREAKING CHANGES
- Rename `DropdownLabel` to `DropdownSelectedItem` and extract styles @layershifter ([#725](https://github.com/stardust-ui/react/pull/725))
- Make element type of component's event handler to be `HTMLElement` @kuzhelov ([#740](https://github.com/stardust-ui/react/pull/740))

### Fixes
- Remove `render` from default factories options @layershifter ([#735](https://github.com/stardust-ui/react/pull/735))

### Features
- Add accessibility for submenu in toolbar and menu behavior @kolaps33 ([#686](https://github.com/stardust-ui/react/pull/686))

### Documentation
- Fix ignored initial state of knobs @layershifter ([#720](https://github.com/stardust-ui/react/pull/720))
- Fix unclearable example's code @layershifter ([#720](https://github.com/stardust-ui/react/pull/720))
- Add ability to export examples to CodeSandbox @layershifter ([#731](https://github.com/stardust-ui/react/pull/731))
- Fix remove empty item in docs sidebar @layershifter ([#728](https://github.com/stardust-ui/react/pull/728))

<!--------------------------------[ v0.16.2 ]------------------------------- -->
## [v0.16.2](https://github.com/stardust-ui/react/tree/v0.16.2) (2019-01-14)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.16.1...v0.16.2)

### Features
- Add `Loader` component @layershifter ([#685](https://github.com/stardust-ui/react/pull/685))
- Add `color` prop to `Label` component @Bugaa92 ([#647](https://github.com/stardust-ui/react/pull/647))
- Add `accessibility` and `styles` to the API of `createComponent` @kuzhelov ([#714](https://github.com/stardust-ui/react/pull/714))

### Fixes
- Fix doc layout for Menu component @codepretty ([#695](https://github.com/stardust-ui/react/pull/695))
- Fix focus outline visible only during keyboard navigation @kolaps33 ([#689](https://github.com/stardust-ui/react/pull/689))
- Fix handling changes of `renderer` prop in `Provider` @layershifter ([#702](https://github.com/stardust-ui/react/pull/702))
- Fix Menu themeing styles @codepretty ([#708](https://github.com/stardust-ui/react/pull/708))
- Prevent infinite rendering loop start on `Popup` open @kuzhelov ([#705](https://github.com/stardust-ui/react/pull/705))
- Correctly handle disabled `Menu.Item` in styles and accessibility @miroslavstastny ([#694](https://github.com/stardust-ui/react/pull/694))

<!--------------------------------[ v0.16.1 ]------------------------------- -->
## [v0.16.1](https://github.com/stardust-ui/react/tree/v0.16.1) (2019-01-10)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.16.0...v0.16.1)

### Features
- Add `on` and `mouseLeaveDelay` props to `Popup` component @mnajdova ([#622](https://github.com/stardust-ui/react/pull/622))
- Add Dropdown Single Selection variant @silviuavram ([#584](https://github.com/stardust-ui/react/pull/584))
- Add `MenuDivider` component and `kind` prop to the `items` inside of the `Menu` for creating different components @mnajdova ([#682](https://github.com/stardust-ui/react/pull/682))

### Fixes
- Fix unicode arrow characters to be RTL aware @mnajdova ([#690](https://github.com/stardust-ui/react/pull/690))
- Fix positioning of `Popup` with changable content @layershifter ([#678](https://github.com/stardust-ui/react/pull/678))
- Fix default props in `Accordion` and `Dropdown` components @layershifter ([#675](https://github.com/stardust-ui/react/pull/675))
- Refactor render method of `Label` component and simplify docs @davezuko ([#642](https://github.com/stardust-ui/react/pull/642))
- Fix shorthand prop type @kuzhelov ([#697](https://github.com/stardust-ui/react/pull/697))
- Export `ShorthandRenderer` type @miroslavstastny ([#698](https://github.com/stardust-ui/react/pull/698))
- Temporary revert `pxToRem` changes introduced by [#371](https://github.com/stardust-ui/react/pull/371) @kuzhelov ([#700](https://github.com/stardust-ui/react/pull/700))

### Documentation
- Add ability to edit examples' code in JavaScript and TypeScript @layershifter ([#650](https://github.com/stardust-ui/react/pull/650))
- Fix broken switch to Children API when an example is not present @layershifter ([#650](https://github.com/stardust-ui/react/pull/650))

<!--------------------------------[ v0.16.0 ]------------------------------- -->
## [v0.16.0](https://github.com/stardust-ui/react/tree/v0.16.0) (2019-01-07)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.15.0...v0.16.0)

### BREAKING CHANGES
- Change available `size` prop values in `Icon` component @codepretty ([#640](https://github.com/stardust-ui/react/pull/640))
- renamed Teams theme menu variables the contains props names as prefixes @mnajdova ([#539](https://github.com/stardust-ui/react/pull/539))

### Fixes
- Ensure `Popup` properly flips values of `offset` prop in RTL @kuzhelov ([#612](https://github.com/stardust-ui/react/pull/612))
- Fix `List` - items should be selectable @sophieH29 ([#566](https://github.com/stardust-ui/react/pull/566))
- Respect `defaultTabbable` element when `FocusZone` container gets focus @sophieH29 ([#637](https://github.com/stardust-ui/react/pull/637))
- Fix `FocusZone` - fix last breaking changes and make improvements for `Chat` usage @sophieH29 ([#614](https://github.com/stardust-ui/react/pull/614))
- Fix `defaultOpen` prop in the `Popup` component @mnajdova ([#659](https://github.com/stardust-ui/react/pull/659))
- Fix `Chat` - added themes values for dark and contrast @bcalvery ([#652](https://github.com/stardust-ui/react/pull/652))
- Fix compatibility with TypeScript 3.2 and handle `null` as a valid value in all optional props @layershifter ([#550](https://github.com/stardust-ui/react/pull/550))
- Fix `MenuItem` - `onFocus` is not handled as prop @sophieH29 ([#677](https://github.com/stardust-ui/react/pull/677))
- Unifying the arrow unicode characters used in different components @mnajdova ([#673](https://github.com/stardust-ui/react/pull/673))

### Features
- Add `color` prop to `Text` component @Bugaa92 ([#597](https://github.com/stardust-ui/react/pull/597))
- Add `color` prop to `Header` and `HeaderDescription` components @Bugaa92 ([#628](https://github.com/stardust-ui/react/pull/628))
- Export initial set of compose icons in Teams theme @joheredi ([#638](https://github.com/stardust-ui/react/pull/638))
- Add and export compose icons in Teams theme @joheredi ([#639](https://github.com/stardust-ui/react/pull/639))
- Add `menu` prop to `MenuItem` @mnajdova ([#539](https://github.com/stardust-ui/react/pull/539))
- Enable RTL for `FocusZone` @sophieH29 ([#646](https://github.com/stardust-ui/react/pull/646))
- Add `color` prop to `Segment` component @Bugaa92 ([#632](https://github.com/stardust-ui/react/pull/632))
- Export `table-add` and `table-delete` SVG icon in Teams theme @VyshnaviDasari ([#643](https://github.com/stardust-ui/react/pull/643))
- Add handling of `Enter` and `Spacebar` in List component @jurokapsiar ([#279](https://github.com/stardust-ui/react/pull/279))
- Enable RTL for keyboard handlers @sophieH29 ([#656](https://github.com/stardust-ui/react/pull/656))
- Add `color` prop to `Icon` component @Bugaa92 ([#651](https://github.com/stardust-ui/react/pull/651))
- Create a `base` theme with Text component example @almedint ([#618](https://github.com/stardust-ui/react/pull/618))
- Adding attachment behavior to handle space/enter key @kolaps33 ([#375](https://github.com/stardust-ui/react/pull/375))

### Documentation
- Add more accessibility descriptions to components and behaviors @jurokapsiar  ([#648](https://github.com/stardust-ui/react/pull/648))

<!--------------------------------[ v0.15.0 ]------------------------------- -->
## [v0.15.0](https://github.com/stardust-ui/react/tree/v0.15.0) (2018-12-17)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.14.0...v0.15.0)

### BREAKING CHANGES
- `type` prop is replaced with `color` in `Divider` component @layershifter ([#558](https://github.com/stardust-ui/react/pull/558))
- Remove `createColorVariants` and `setColorLightness` utils @layershifter ([#583](https://github.com/stardust-ui/react/pull/583))
- Remove `accessibility` prop (and corresponding behavior) from `ButtonGroup` @kolaps33 ([#605](https://github.com/stardust-ui/react/pull/605))
- Add `gutter` prop to `Chat.Item`, removed `avatar` from `Chat.Message`, renamed `content` slot to `message` for `Chat.Item`, deprecated Children API for `Chat` components @Bugaa92 ([#556](https://github.com/stardust-ui/react/pull/556))

### Fixes
- Fix `Provider` is not executing staticStyles with the merged siteVariables @mnajdova ([#559](https://github.com/stardust-ui/react/pull/559))
- Decouple `pxToRem` from HTML page's font size @kuzhelov ([#371](https://github.com/stardust-ui/react/pull/371))
- The border color of the Icon is inherited if no value is provided for the `color` and `borderColor` variables @mnajdova ([#569](https://github.com/stardust-ui/react/pull/569))
- Do not focus `Popup`'s trigger on outside click @sophieH29 ([#578](https://github.com/stardust-ui/react/pull/578))
- Add `https` protocol to all urls used in the scripts and stylesheets in index.ejs @mnajdova ([#571](https://github.com/stardust-ui/react/pull/571))
- Fix support for fallback values in styles (`color: ['#ccc', 'rgba(0, 0, 0, 0.5)']`) @miroslavstastny ([#573](https://github.com/stardust-ui/react/pull/573))
- Fix styles for RTL mode of doc site component examples @kuzhelov ([#579](https://github.com/stardust-ui/react/pull/579))
- Prevent blind props forwarding for `createShorthand` calls if the value is a React element and remove manual check for `Input` `wrapper` @Bugaa92 ([#496](https://github.com/stardust-ui/react/pull/496))
- Fix issue with bundling package with Rollup and Parcel @layershifter ([#570](https://github.com/stardust-ui/react/pull/570))
- Fix `pxToRem` referenced for `Dropdown` component styles @kuzhelov ([#590](https://github.com/stardust-ui/react/pull/590))
- Fix `Popup` logic of handling `content` value provided as React element @kuzhelov ([#592](https://github.com/stardust-ui/react/pull/592))
- Do not handle `FocusZone`'s keyDownCapture in `chatBehavior` @sophieH29 ([#563](https://github.com/stardust-ui/react/pull/563))
- Fix `getKeyDownHandler` to pass props for client's onKeyDown handler @sophieH29 ([#595](https://github.com/stardust-ui/react/pull/595))
- Fix `Popup` not closing on outside click @kuzhelov ([#598](https://github.com/stardust-ui/react/pull/598))
- Fix multiple React's warnings about keys in docs @layershifter ([#602](https://github.com/stardust-ui/react/pull/602))
- Fix incorrect handling of `isFromKeyboard` in `Menu` @layershifter ([#596](https://github.com/stardust-ui/react/pull/596))
- Fix property names used in shorthand factories @kuzhelov ([#591](https://github.com/stardust-ui/react/pull/591))

### Features
- `Ref` components uses `forwardRef` API by default @layershifter ([#491](https://github.com/stardust-ui/react/pull/491))
- Label Processed Teams icons moved to Stardust theme @kuzhelov ([#574](https://github.com/stardust-ui/react/pull/574))
- Add `Dropdown` component @silviuavram ([#422](https://github.com/stardust-ui/react/pull/422))
- Export `call-recording` SVG icon @Bugaa92 ([#585](https://github.com/stardust-ui/react/pull/585))
- Export `canvas-add-page` SVG icon @priyankar205 ([#601](https://github.com/stardust-ui/react/pull/601))
- Add `sizeModifier` variable (with `x` and `xx` values) to `Icon`'s Teams theme styles @priyankar205 ([#601](https://github.com/stardust-ui/react/pull/601))
- Add `offset` prop to `Popup` to extend set of popup positioning options @kuzhelov ([#606](https://github.com/stardust-ui/react/pull/606))

### Documentation
- Add `prettier` support throughout the docs @levithomason  ([#568](https://github.com/stardust-ui/react/pull/568))
- Display available behaviors for component @jurokapsiar ([#510](https://github.com/stardust-ui/react/pull/510))
- Fix `createComponent()` instructions for `className` @levithomason  ([#599](https://github.com/stardust-ui/react/pull/599))

<!--------------------------------[ v0.14.0 ]------------------------------- -->
## [v0.14.0](https://github.com/stardust-ui/react/tree/v0.14.0) (2018-12-05)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.13.3...v0.14.0)

### BREAKING CHANGES
- Add `render` callback as an option for shorthand value @kuzhelov ([#562](https://github.com/stardust-ui/react/pull/562))
- Rename `renderContent` and `renderTitle` to `renderPanelContent` and `renderPanelTitle` for `Accordion` @kuzhelov ([#562](https://github.com/stardust-ui/react/pull/562))

<!--------------------------------[ v0.13.3 ]------------------------------- -->
## [v0.13.3](https://github.com/stardust-ui/react/tree/v0.13.3) (2018-12-05)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.13.2...v0.13.3)

### Fixes
- Revert breaking change: `render` callback as an option for shorthand value introduced in #519 @kuzhelov ([#561](https://github.com/stardust-ui/react/pull/561))

<!--------------------------------[ v0.13.2 ]------------------------------- -->
## [v0.13.2](https://github.com/stardust-ui/react/tree/v0.13.2) (2018-12-05)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.13.1...v0.13.2)

### Documentation
- Add the concept of the color palette @layershifter ([#451](https://github.com/stardust-ui/react/pull/451))

### Fixes
- Add `react-dom` as available import in the editor @mnajdova ([#553](https://github.com/stardust-ui/react/pull/553))
- Fix incorrect and missing filled or outline versions of Teams SVG icons @codepretty ([#552](https://github.com/stardust-ui/react/pull/552))
- Fix truncate styles in Teams team for the `Button`'s `content` prop used as element @mnajdova ([#551](https://github.com/stardust-ui/react/pull/551))
- Fix HTML preview in the editor @layershifter ([#555](https://github.com/stardust-ui/react/pull/555))
- Fix icon overlapping for `iconOnly` prop in `Menu` component with @Bugaa92 ([#486](https://github.com/stardust-ui/react/pull/486))

### Features
- Add `render` callback as an option for shorthand value @kuzhelov ([#519](https://github.com/stardust-ui/react/pull/519))
- Add `color` prop to `Divider` component @layershifter ([#451](https://github.com/stardust-ui/react/pull/451))

<!--------------------------------[ v0.13.1 ]------------------------------- -->
## [v0.13.1](https://github.com/stardust-ui/react/tree/v0.13.1) (2018-12-03)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.13.0...v0.13.1)

### Fixes
- Prevent blind props forwarding if `Input`'s wrapper is defined as React element @kuzhelov ([#453](https://github.com/stardust-ui/react/pull/453))
- Fix invalid whatInput import @miroslavstastny ([#541](https://github.com/stardust-ui/react/pull/541))
- Fix invalid typings and propTypes for the content prop @mnajdova ([#528](https://github.com/stardust-ui/react/pull/528))
- Fix Teams SVG icons @kuzhelov ([#544](https://github.com/stardust-ui/react/pull/544))

### Features
- Add all default size Teams icons processed & ready to be consumed by Stardust as needed @codepretty ([#478](https://github.com/stardust-ui/react/pull/478))
- Add `Tree` Component @priyankar205 ([#479](https://github.com/stardust-ui/react/pull/479))
- Add several Teams SVG icons @kuzhelov ([#544](https://github.com/stardust-ui/react/pull/544))

<!--------------------------------[ v0.13.0 ]------------------------------- -->
## [v0.13.0](https://github.com/stardust-ui/react/tree/v0.13.0) (2018-11-27)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.12.1...v0.13.0)

### BREAKING CHANGES
- Rename `Transition` component to `Animation`, and `animationName` property to `name` @mnajdova ([#505](https://github.com/stardust-ui/react/pull/505))

### Fixes
- Do not enforce yarn 1.10 via engines @Bugaa92 ([#531](https://github.com/stardust-ui/react/pull/531))

### Documentation
- Add `Animations` guide as part of the `Theming` docs page @mnajdova ([#505](https://github.com/stardust-ui/react/pull/505))

<!--------------------------------[ v0.12.1 ]------------------------------- -->
## [v0.12.1](https://github.com/stardust-ui/react/tree/v0.12.1) (2018-11-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.12.0...v0.12.1)

### Features
- Add `createComponent` function in the public API @mnajdova ([#503](https://github.com/stardust-ui/react/pull/503))
- Apply `dir=auto` attribute to string content of `Text` @kuzhelov  ([#5](https://github.com/stardust-ui/react/pull/5))
- Improve `Menu` accessibility behaviors @sophieH29 ([#523](https://github.com/stardust-ui/react/pull/523))
- Add ability to style every slot of `Chat.Message` and remove dependency on `Layout` component @Bugaa92 ([#518](https://github.com/stardust-ui/react/pull/518))

### Fixes
- Fix the behaviour of `AutoControlledComponent` when `undefined` is passed as a prop value @layershifter ([#499](https://github.com/stardust-ui/react/pull/499))
- Stop event propagation when press Escape on the popup @sophieH29 ([#515](https://github.com/stardust-ui/react/pull/515))
- Remove role="presentation" from `chatMessageBehavior` and `FocusZone` @sophieH29 ([#530](https://github.com/stardust-ui/react/pull/530))

### Documentation
- Add `Integrate Custom Components` guide page in the docs @mnajdova ([#517](https://github.com/stardust-ui/react/pull/517))

<!--------------------------------[ v0.12.0 ]------------------------------- -->
## [v0.12.0](https://github.com/stardust-ui/react/tree/v0.12.0) (2018-11-19)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.11.0...v0.12.0)

### Documentation
- Replace react-docgen with react-docgen-typescript for generating the props from the TS props interfaces @mnajdova ([#460](https://github.com/stardust-ui/react/pull/460))

### BREAKING
- Replace the `type` prop with `secondary` and `primary` for `Button` @layershifter ([#419](https://github.com/stardust-ui/react/pull/419))
- Replace the `type` prop with `secondary` and `primary` for `Menu` @layershifter ([#429](https://github.com/stardust-ui/react/pull/429))

### Fixes
- Fix endMedia to not be removed from DOM on mouseleave for `ListItem` @musingh1 ([#278](https://github.com/stardust-ui/react/pull/278))
- Fix focus behavior for `List` @kuzhelov ([#413](https://github.com/stardust-ui/react/pull/413))
- Remove `Sizes` and `Weights` enums, use typed string in `Text` instead @jurokapsiar ([#446](https://github.com/stardust-ui/react/pull/446))
- Fix React's version in `peerDependencies` @layershifter ([#452](https://github.com/stardust-ui/react/pull/452))
- Added Dark and Contrast theme variables for `Header` @bcalvery ([#427](https://github.com/stardust-ui/react/pull/427))
- Fix Teams Icons styles to match spec @codepretty ([#441](https://github.com/stardust-ui/react/pull/441))
- Fix styles as functions in shorthands are not applied @mnajdova ([#470](https://github.com/stardust-ui/react/pull/470))
- Add `lodash` typings and fix compilation errors @Bugaa92 ([#438](https://github.com/stardust-ui/react/pull/438))
- Remove unsafe `listRef` from `List` API @kuzhelov ([#489](https://github.com/stardust-ui/react/pull/489))
- Fix Popup trigger's props are not passed in onClick handler @sophieH29 ([#521](https://github.com/stardust-ui/react/pull/521))

### Features
- Make `Grid` keyboard navigable by implementing `gridBehavior` @sophieH29 ([#398](https://github.com/stardust-ui/react/pull/398))
- Set the ref of the `FocusZone` in `Embed` mode @sophieH29 ([#435](https://github.com/stardust-ui/react/pull/435))
- Close `Popup` on outside click @kuzhelov ([#410](https://github.com/stardust-ui/react/pull/410))
- Set default `chatBehavior` which uses Enter/Esc keys @sophieH29 ([#443](https://github.com/stardust-ui/react/pull/443))
- Add `iconPosition` property to `Input` component @mnajdova ([#442](https://github.com/stardust-ui/react/pull/442))
- Add `color`, `inverted` and `renderContent` props and `content` slot to `Segment` component @Bugaa92 ([#389](https://github.com/stardust-ui/react/pull/389))
- Add focus trap behavior to `Popup` @kuzhelov ([#457](https://github.com/stardust-ui/react/pull/457))
- Export `Ref` component and add `handleRef` util @layershifter ([#459](https://github.com/stardust-ui/react/pull/459))
- Add `wrapper` slot to `MenuItem` @miroslavstastny ([#323](https://github.com/stardust-ui/react/pull/323))
- Add `Transition` component @mnajdova ([#414](https://github.com/stardust-ui/react/pull/414))
- Add generic `animation` property to the UIComponents @mnajdova ([#414](https://github.com/stardust-ui/react/pull/414))
- Add accessibility behavior `dialogBehavior` @sophieH29 ([#490](https://github.com/stardust-ui/react/pull/490))

### Documentation
- Add all missing component descriptions and improve those existing @levithomason ([#400](https://github.com/stardust-ui/react/pull/400))
- Replace the `type` prop with `secondary` and `primary` in Glossary @layershifter ([#432](https://github.com/stardust-ui/react/pull/432))

<!--------------------------------[ v0.11.0 ]------------------------------- -->
## [v0.11.0](https://github.com/stardust-ui/react/tree/v0.11.0) (2018-10-30)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.10.0...v0.11.0)

### BREAKING
- Export all typings at the top-level API @levithomason ([#382](https://github.com/stardust-ui/react/pull/382))

### Fixes
- Fix build on Windows @jurokapsiar ([#383](https://github.com/stardust-ui/react/pull/383))
- Add warning for rendering components outside provider @Bugaa92 ([#378](https://github.com/stardust-ui/react/pull/378))
- Fix icon colors for Teams theme @codepretty ([#384](https://github.com/stardust-ui/react/pull/384))
- Do not render the Attachment's `progress` value to the DOM @levithomason ([#402](https://github.com/stardust-ui/react/pull/402))
- Add dark theme and contrast theme for Avatar and Status Indicator @bcalvery ([#373](https://github.com/stardust-ui/react/pull/373))
- Add contrast theme and update dark theme for Button @bcalvery ([#381](https://github.com/stardust-ui/react/pull/381))
- Add Segment background color @levithomason ([#408](https://github.com/stardust-ui/react/pull/408))
- Make `eventStack` subscription logic to be always async @kuzhelov ([#391](https://github.com/stardust-ui/react/pull/391))
- Fix for dotted focus outline in Firefox for `Button` component in docs @Bugaa92 ([#390](https://github.com/stardust-ui/react/pull/390))

### Features
- Export `mergeThemes` @levithomason ([#285](https://github.com/stardust-ui/react/pull/285))
- Add Focus Trap Zone @sophieH29 ([#239](https://github.com/stardust-ui/react/pull/239))
- Add compose icons to Teams theme @joheredi ([#396](https://github.com/stardust-ui/react/pull/396))
- Expose access to input element of `Input` via `inputRef` prop @silviuavram ([#377](https://github.com/stardust-ui/react/pull/377))
- Adding `Partial` utility to enable partial Variables implementations @kuzhelov ([#373](https://github.com/stardust-ui/react/pull/373))

### Documentation
- Add `Provider` examples @levithomason ([#285](https://github.com/stardust-ui/react/pull/285))
- Add transparent button to examples @levithomason ([#407](https://github.com/stardust-ui/react/pull/407))
- Add component descriptions and fix accessibility errors @levithomason ([#387](https://github.com/stardust-ui/react/pull/387))

<!--------------------------------[ v0.10.0 ]------------------------------- -->
## [v0.10.0](https://github.com/stardust-ui/react/tree/v0.10.0) (2018-10-19)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.9.1...v0.10.0)

### BREAKING
- Removed `type...` prefix from multiple variables in `buttonStyles.ts` @bcalvery ([#336](https://github.com/stardust-ui/react/pull/336))

### Documentation
- Add `Usage` examples for `Button` showing style override @bcalvery ([#336](https://github.com/stardust-ui/react/pull/336))

### Fixes
- Fix for cropped rounded corners in `Menu` component @Bugaa92 ([#360](https://github.com/stardust-ui/react/pull/360))
- Remove hardcoded `status` size calculations in `Avatar` component @Bugaa92 ([#358](https://github.com/stardust-ui/react/pull/358))
- Remove necessity to use `skipLibCheck` flag for client's typescript projects that consume Stardust @kuzhelov ([#367](https://github.com/stardust-ui/react/pull/367))

### Features
- Add `target` prop to `Popup` @kuzhelog ([#356](https://github.com/stardust-ui/react/pull/356))
- Add new `Input` component with `wrapper` prop @Bugaa92 ([#326](https://github.com/stardust-ui/react/pull/326))
- Add `Form` and `Form.Field` components @mnajdova ([#353](https://github.com/stardust-ui/react/pull/353))

<!--------------------------------[ v0.9.1 ]------------------------------- -->
## [v0.9.1](https://github.com/stardust-ui/react/tree/v0.9.1) (2018-10-11)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.9.0...v0.9.1)

### Fixes
- Fix Button's `renderIcon` prop @levithomason ([#347](https://github.com/stardust-ui/react/pull/347))

### Features
- Make `content` to be a shorthand prop for `Popup` @kuzhelov ([#322](https://github.com/stardust-ui/react/pull/322))
- Add base focus handling for `List` component @smykhailov ([#256](https://github.com/stardust-ui/react/pull/256))
- Add generic `Slot` component (used internally) and use it as shorthand for `Button` `content` prop @Bugaa92 ([#335](https://github.com/stardust-ui/react/pull/335))
- Add `fitted` prop to `Divider` @gopalgoel19 ([#333](https://github.com/stardust-ui/react/pull/333))
- Add `content` and `renderContent` to Chat API @levithomason ([#348](https://github.com/stardust-ui/react/pull/348))

<!--------------------------------[ v0.9.0 ]------------------------------- -->
## [v0.9.0](https://github.com/stardust-ui/react/tree/v0.9.0) (2018-10-07)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.8.0...v0.9.0)

### BREAKING
- Add `render*` props for each shorthand prop @levithomason ([#328](https://github.com/stardust-ui/react/pull/328))

### Fixes
- Fix FocusZone with defaultTabbableElement prop set tabindexes are not updated accordingly @sophieH29
([#342](https://github.com/stardust-ui/react/pull/342))
- Fix Attachment `styles` prop typing @levithomason ([#299](https://github.com/stardust-ui/react/pull/299))
- Fix generation of `key` for the `Accordion.Content` @mnajdova ([#305](https://github.com/stardust-ui/react/pull/305))
- Ensure `Popup` is rendered as direct child of `body` element in the DOM tree @kuzhelov ([#302](https://github.com/stardust-ui/react/pull/302))
- Fix toggle logic of `Popup` as reaction on key press events @kuzhelov ([#304](https://github.com/stardust-ui/react/pull/304))
- Fix for `RadioGroup`: made `label` accept react nodes as value and fixed keyboard navigation @Bugaa92 ([#287](https://github.com/stardust-ui/react/pull/287))
- Handle FontAwesome brand icons @levithomason ([#320](https://github.com/stardust-ui/react/pull/320))
- Make `debug` a runtime dependency ([#301](https://github.com/stardust-ui/react/issues/301))
- Fix duplicated handling of 'change' event by `Input` @kuzhelov ([#310](https://github.com/stardust-ui/react/pull/310))
- Make theme variables and styles types extensible @levithomason ([#292](https://github.com/stardust-ui/react/pull/292))

### Features
- Add focus styles for `Menu.Item` component @Bugaa92 ([#286](https://github.com/stardust-ui/react/pull/286))
- Add keyboard handling and ARIA attributes for `ButtonGroup`, `Tablist` and `Toolbar` behaviors @jurokapsiar ([#254](https://github.com/stardust-ui/react/pull/254))
- Add autocontrolled mode for `Popup` @kuzhelov ([#319](https://github.com/stardust-ui/react/pull/319)
- Improve accessibility behaviors @sophieH29 ([#247](https://github.com/stardust-ui/react/pull/247))

### Documentation
- Improve `Contributing` documentation for accessibility @jurokapsiar ([#303](https://github.com/stardust-ui/react/pull/303))
- Add theme switcher for exploring different themes on the docs (only available in development mode) @mnajdova ([#280](https://github.com/stardust-ui/react/pull/280))
- Add `Prototypes` section and `Chat Pane` prototype (only available in development mode) @Bugaa92 ([#235](https://github.com/stardust-ui/react/pull/235))
- Remove cruft prop `suiVersion` from the `ComponentExample` component @layershifter ([#329](https://github.com/stardust-ui/react/pull/329))

<!--------------------------------[ v0.8.0 ]------------------------------- -->
## [v0.8.0](https://github.com/stardust-ui/react/tree/v0.8.0) (2018-10-01)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.7.0...v0.8.0)

### BREAKING CHANGES
- Change font ramp and Text size API @codepretty ([#214](https://github.com/stardust-ui/react/pull/214))
- Add `ChatItem` component that can be used inside the `Chat` via the Children API or the `items` prop, instead of the `Chat.Message` used directly in the previous `messages` prop @mnajdova ([#255](https://github.com/stardust-ui/react/pull/255))
- Make `Popup` to be a controlled component @kuzhelov ([#282](https://github.com/stardust-ui/react/pull/282))

### Features
- Add embed mode for `FocusZone` and use it in newly added Chat behaviors @tomasiser ([#233](https://github.com/stardust-ui/react/pull/233))
- Add default accessibility behavior to `Popup` @sophieH29 ([#218](https://github.com/stardust-ui/react/pull/218))

### Documentation
- Improve `Contributing` documentation @alinais, @levithomason ([#189](https://github.com/stardust-ui/react/pull/189))

<!--------------------------------[ v0.7.0 ]------------------------------- -->
## [v0.7.0](https://github.com/stardust-ui/react/tree/v0.7.0) (2018-09-25)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.6.0...v0.7.0)

### BREAKING CHANGES
- Add `image` and `label` shorthands props for `Avatar` @mnajdova ([#270](https://github.com/stardust-ui/react/pull/270))

### Features
- Add `Attachment` component @levithomason ([#220](https://github.com/stardust-ui/react/pull/220))
- Add `atMention="me"` value to Text API @codepretty ([#277](https://github.com/stardust-ui/react/pull/277))

### Documentation
- Add `Theming` guide @almedint, @levithomason ([#152](https://github.com/stardust-ui/react/pull/152))
- Update `Theming` guide @levithomason ([#274](https://github.com/stardust-ui/react/pull/274))
- Add `Theming Examples` guide @almedint ([#252](https://github.com/stardust-ui/react/pull/252))

<!--------------------------------[ v0.6.0 ]------------------------------- -->
## [v0.6.0](https://github.com/stardust-ui/react/tree/v0.6.0) (2018-09-24)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.5.2...v0.6.0)

### BREAKING CHANGES
- Fixed `Divider` wrong usage of the `typeSecondary{color, backgroundColor}` and `default{color, backgroundColor}` variables; renamed `default{color, backgroundColor}` variables to `color` and `backgroundColor` @mnajdova ([#234](https://github.com/stardust-ui/react/pull/234))
- Restrict the `styles` prop to styling the root element only @levithomason ([#238](https://github.com/stardust-ui/react/pull/238))
- Add `RadioGroup` compliant with ARIA patterns. `Radio` changed to `RadioGroup.Item` @jurokapsiar ([#229](https://github.com/stardust-ui/react/pull/229))
- `Divider` refactored variables names and the way they are used @codepretty ([#249](https://github.com/stardust-ui/react/pull/249))

### Fixes
- Allow string or number as Input value @levithomason ([#250](https://github.com/stardust-ui/react/pull/250))
- Do not throw on missing Icon names @levithomason ([#251](https://github.com/stardust-ui/react/pull/251))

### Features
- Add `author` and `timestamp` props for `Chat.Message` component @Bugaa92 ([#242](https://github.com/stardust-ui/react/pull/242))
- Add support for custom (theme-defined) SVG and font-based icons @kuzhelov ([#260](https://github.com/stardust-ui/react/pull/260))

<!--------------------------------[ v0.5.2 ]------------------------------- -->
## [v0.5.2](https://github.com/stardust-ui/react/tree/v0.5.2) (2018-09-14)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.5.1...v0.5.2)

### Fixes
- Fix Provider incorrectly rendering font face rules @levithomason ([#227](https://github.com/stardust-ui/react/pull/227))

### Features
- Add `FocusZone` to `renderComponent`, change `Menu` behavior to support arrow keys @tomasiser ([#116](https://github.com/stardust-ui/react/pull/116))
- Add `value`, `disabled`, `checked`, `defaultChecked` and `onChange` props to `Radio` component @mnajdova ([#206](https://github.com/stardust-ui/react/pull/206))

### Performance
- Enable Webpack tree shaking with `sideEffects: false` @levithomason ([#224](https://github.com/stardust-ui/react/pull/224))

<!--------------------------------[ v0.5.1 ]------------------------------- -->
## [v0.5.1](https://github.com/stardust-ui/react/tree/v0.5.1) (2018-09-11)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.5.0...v0.5.1)

### Fixes
- Fixed fonts to support zwj gender emojis ([#215](https://github.com/stardust-ui/react/pull/215))
- Correct Teams theme site variables @sergiorv ([#110](https://github.com/stardust-ui/react/pull/110))
- Fixed missing colors in Teams' siteVariables @mnajdova ([#200](https://github.com/stardust-ui/react/pull/200))
- Fixed Teams' siteVariables font sizes @levithomason ([#204](https://github.com/stardust-ui/react/pull/204))
- Fixed docs examples of `Text` component @codepretty ([#205](https://github.com/stardust-ui/react/pull/205))
- Preserve fonts and static styles in `mergeThemes` @levithomason ([#217](https://github.com/stardust-ui/react/pull/217))

### Features
- Add `state` to `props` in component styling functions @Bugaa92 ([#173](https://github.com/stardust-ui/react/pull/173))
- Add `avatar` prop to `Chat.Message` subcomponent @Bugaa92 ([#159](https://github.com/stardust-ui/react/pull/159))
- add `iconOnly` prop to `Button` @mnajdova ([#182](https://github.com/stardust-ui/react/pull/182))
- Add Label `image` and `imagePosition`, removed `onIconClick` prop  @mnajdova ([#55](https://github.com/stardust-ui/react/pull/55/))
- Add `ButtonGroup` component @mnajdova ([#179](https://github.com/stardust-ui/react/pull/179))
- Add Button `text` prop @mnajdova ([#177](https://github.com/stardust-ui/react/pull/177))
- Add accessibility keyboard action handlers @sophieH29 ([#121](https://github.com/stardust-ui/react/pull/121))
- Add accessibility description for `Text` component @codepretty ([#205](https://github.com/stardust-ui/react/pull/205))
- Add `Portal`, `PortalInner` and `Ref` components base implementation @Bugaa92 ([#144](https://github.com/stardust-ui/react/pull/144))
- Support all Semantic UI FontAwesome icon names @levithomason ([#211](https://github.com/stardust-ui/react/pull/211))
- Add `Popup` component base implementation @Bugaa92 ([#150](https://github.com/stardust-ui/react/pull/150))
- Add Input `inline` prop @alinais ([#120](https://github.com/stardust-ui/react/pull/120))
- Add `Status` as a separate component @musingh1 ([#208](https://github.com/stardust-ui/react/pull/208))

### Documentation
- Add `behaviors` section to the menu, under the components @kolaps33 ([#119](https://github.com/stardust-ui/react/pull/119))
- Add accessibility description for behaviors @kolaps33 ([#181](https://github.com/stardust-ui/react/pull/181))

<!--------------------------------[ v0.5.0 ]------------------------------- -->
## [v0.5.0](https://github.com/stardust-ui/react/tree/v0.5.0) (2018-08-30)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.4.0...v0.5.0)

### BREAKING CHANGES
- Rework Provider API and `themes` pattern to resolve import issue @levithomason ([#114](https://github.com/stardust-ui/react/pull/114))

### Fixes
- Adjust layout and rendered HTML of Input @kuzhelov ([#127](https://github.com/stardust-ui/react/pull/127))
- Fix Button component's layout and icon color @kuzhelov ([#135](https://github.com/stardust-ui/react/pull/135))

<!--------------------------------[ v0.4.0 ]------------------------------- -->
## [v0.4.0](https://github.com/stardust-ui/react/tree/v0.4.0) (2018-08-29)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.3.0...v0.4.0)

### BREAKING CHANGES
- Split Menu `shape` prop to separate `pills`, `pointing` and `underlined` props @miroslavstastny ([#114](https://github.com/stardust-ui/react/pull/114))

### Fixes
- Fix docs pages presenting examples of wrong component @kuzhelov ([#124](https://github.com/stardust-ui/react/pull/124))
- Fix component variables when merging themes @levithomason ([#128](https://github.com/stardust-ui/react/pull/128))
- Fix docs *Maximize* for shorthand examples @miroslavstastny ([#122](https://github.com/stardust-ui/react/pull/122))
- Fix Button styles when rendered as an anchor @levithomason ([#145](https://github.com/stardust-ui/react/pull/145))
- Fix Layout doc page showing ItemLayout examples @levithomason ([#160](https://github.com/stardust-ui/react/pull/160))

### Features
- Add basic `Radio` component @alinais ([#100](https://github.com/stardust-ui/react/pull/100))
- Add `descriptionColor` to Header @kuzhelov ([#78](https://github.com/stardust-ui/react/pull/78))
- Add accessibility behavior description @kolaps33 ([#74](https://github.com/stardust-ui/react/pull/74))
- Add strict null checks for generated TS types @smykhailov ([#108](https://github.com/stardust-ui/react/pull/108))
- Export themes at `@stardust-ui/react/themes` @levithomason ([#145](https://github.com/stardust-ui/react/pull/145))
- Add support for Menu `vertical pointing` prop @miroslavstastny ([#123](https://github.com/stardust-ui/react/pull/123))

### Documentation
- Add a Quick Start guide @levithomason ([#145](https://github.com/stardust-ui/react/pull/145))

<!--------------------------------[ v0.3.0 ]------------------------------- -->
## [v0.3.0](https://github.com/stardust-ui/react/tree/v0.3.0) (2018-08-22)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.7...v0.3.0)

### BREAKING CHANGES
- Remove Children API support from Menu component @miroslavstastny ([#111](https://github.com/stardust-ui/react/pull/111))

### Fixes
- Fix wrong typings generated for dist @kuzhelov ([#99](https://github.com/stardust-ui/react/pull/99))
- Fix components generation script @kuzhelov ([#105](https://github.com/stardust-ui/react/pull/105))
- Reactivate tests for `Text` @kuzhelov ([#104](https://github.com/stardust-ui/react/pull/104))
- Fix Button icon color @levithomason ([#102](https://github.com/stardust-ui/react/pull/102))
- Fix `icon` shorthand property for Button @kuzhelov ([#112](https://github.com/stardust-ui/react/pull/112))

### Features
- Add Menu `iconOnly`, MenuItem `iconOnly` and `icon` props @miroslavstastny ([#73](https://github.com/stardust-ui/react/pull/73))
- Add `Grid` component base implementation @Bugaa92 ([#93](https://github.com/stardust-ui/react/pull/93))
- Add basic `Segment` component @kuzhelov ([#103](https://github.com/stardust-ui/react/pull/103))

<!--------------------------------[ v0.2.7 ]------------------------------- -->
## [v0.2.7](https://github.com/stardust-ui/react/tree/v0.2.7) (2018-08-13)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.6...v0.2.7)

### Fixes
- Add selection property to child items in ListExampleSelection so that styles and roles are applied properly @jurokapsiar ([#70](https://github.com/stardust-ui/react/pull/70))
- Menu `onClick` handler moved from `li` to `a` (accessibility) @miroslavstastny ([#61](https://github.com/stardust-ui/react/pull/61))
- Image `fluid` is applied on the avatar variations @mnajdova ([#77](https://github.com/stardust-ui/react/pull/77))
- Include missing `types` directory in dist @smykhailov ([#76](https://github.com/stardust-ui/react/pull/76))
- Temporarily disable Provider.Consumer typings to avoid TS bug @levithomason ([#88](https://github.com/stardust-ui/react/pull/88))
- Fix `MenuItem` broken styles @miroslavstastny ([#94](https://github.com/stardust-ui/react/pull/94))

### Features
- Add `color` variables to Header and Header.Description @kuzhelov ([#72](https://github.com/stardust-ui/react/pull/72))
- Add `ItemLayout` component @mnajdova ([#60](https://github.com/stardust-ui/react/pull/60))
- Add Input `clearable` prop @alinais ([#37](https://github.com/stardust-ui/react/pull/37))

<!--------------------------------[ v0.2.6 ]------------------------------- -->
## [v0.2.6](https://github.com/stardust-ui/react/tree/v0.2.6) (2018-08-09)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.5...v0.2.6)

### Fixes
- Remove unused dependencies and move development dependencies to devDependencies @levithomason ([#51](https://github.com/stardust-ui/react/pull/51))
- Fix Avatar alignment issue and initials for long names @mnajdova ([#38](https://github.com/stardust-ui/react/pull/38))
- Changing the default styles for Input component @alinais ([#25](https://github.com/stardust-ui/react/pull/25))
- Upgrade Typescript to version 3.0.1 @luzhon ([#67](https://github.com/stardust-ui/react/pull/67))
- Prevent Fela from rendering CSS property values that could crash all styling on the page @kuzhelov ([#65](https://github.com/stardust-ui/react/pull/65))

### Features
- Behaviors for accessibility roles and other ARIA attributes @smykhailov, @jurokapsiar, @sophieH29 ([#29](https://github.com/stardust-ui/react/pull/29))
- Update styles for Menu underlined primary @miroslavstastny ([#20](https://github.com/stardust-ui/react/pull/20))
- Add Avatar `getInitials` prop and `presenceIndicatorBackground` variable @mnajdova ([#38](https://github.com/stardust-ui/react/pull/38))
- Add `fluid` variant and size variables to Image @kuzhelov ([#54](https://github.com/stardust-ui/react/pull/54))
- Add SVG icons support @kuzhelov ([#50](https://github.com/stardust-ui/react/pull/50))
- Add `fluid` prop and variation and width variables to Input @alinais ([#59](https://github.com/stardust-ui/react/pull/59))
- Support `styles` prop and nested theme Providers @levithomason ([#16](https://github.com/stardust-ui/react/pull/16))

<!--------------------------------[ v0.2.5 ]------------------------------- -->
## [v0.2.5](https://github.com/stardust-ui/react/tree/v0.2.5) (2018-08-03)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.4...v0.2.5)

### Fixes
- Include typings for each module target in dist @levithomason ([#48](https://github.com/stardust-ui/react/pull/48))

<!--------------------------------[ v0.2.4 ]------------------------------- -->
## [v0.2.4](https://github.com/stardust-ui/react/tree/v0.2.4) (2018-08-03)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.3...v0.2.4)

### Fixes
- Replaced Header `subheader` with `description` and fixed it to render well-formed HTML @mnajdova ([#17](https://github.com/stardust-ui/react/pull/17))
- Removed allowSyntheticDefaultImports from shared tsconfig but allow it on docs @aniknafs ([#46](https://github.com/stardust-ui/react/pull/46))

### Features
- Add Icon `xSpacing` prop @Bugaa92 ([#22](https://github.com/stardust-ui/react/pull/22))
- Add Button `icon` prop and Text `truncated` prop @Bugaa92 ([#13](https://github.com/stardust-ui/react/pull/13))
- Add Button `disabled` prop @Bugaa92 ([#14](https://github.com/stardust-ui/react/pull/14))
- Add Label `icon`, `onIconClick` and `iconPosition` props @mnajdova ([#19](https://github.com/stardust-ui/react/pull/19))
- Add Menu `vertical` prop @miroslavstastny ([#21](https://github.com/stardust-ui/react/pull/21))
- Add Menu support for `shape="pills" vertical` @miroslavstastny ([#36](https://github.com/stardust-ui/react/pull/36))
- Add Icon support for `background` variable @kuzhelov ([#47](https://github.com/stardust-ui/react/pull/47))

### Documentation
- Improve UX for "knobs" form on component examples @levithomason ([#20](https://github.com/stardust-ui/react/pull/20))
- Use correct styles in RTL component preview @miroslavstastny ([#34](https://github.com/stardust-ui/react/pull/34))

<!--------------------------------[ v0.2.3 ]------------------------------- -->
## [v0.2.3](https://github.com/stardust-ui/react/tree/v0.2.3) (2018-07-24)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.2...v0.2.3)

### Fixes
- Make Chat.Messages position relative to contain absolutely positioned children @levithomason (7625becc55fc051175fa3143bdfbc212de2d436c)

### Features
- Add Button `fluid` prop @Bugaa92 ([#6](https://github.com/stardust-ui/react/pull/6))
- Add Icon `disabled` prop @Bugaa92 ([#12](https://github.com/stardust-ui/react/pull/12))

<!--------------------------------[ v0.2.2 ]------------------------------- -->
## [v0.2.2](https://github.com/stardust-ui/react/tree/v0.2.2) (2018-07-24)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.1...v0.2.2)

### Fixes
- Fix Layout vertical prop not making layouts vertical @levithomason ([#10](https://github.com/stardust-ui/react/pulls/10))

<!--------------------------------[ v0.2.1 ]------------------------------- -->
## [v0.2.1](https://github.com/stardust-ui/react/tree/v0.2.1) (2018-07-20)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.2.0...v0.2.1)

### Fixes
- Remove broken normalize.css button styles @levithomason ([#79](https://github.com/stardust-ui/react-old/pulls/79))
- Add missing Button styles @levithomason ([#82](https://github.com/stardust-ui/react-old/pulls/82))
- Fix Accordion to hide the content provided as nested children when closed ([#108](https://github.com/stardust-ui/react-old/pull/108))

### Features
- Add `rtl` flag to rules (styles) function @kuzhelov ([#109](https://github.com/stardust-ui/react-old/pull/109))
- Add Icon `circular` and `bordered` props @kuzhelov ([#85](https://github.com/stardust-ui/react-old/pull/85))
- Add Divider `type` and `important` props @mnajdova ([#67](https://github.com/stardust-ui/react-old/pulls/67))
- Add Avatar component @mnajdova ([#75](https://github.com/stardust-ui/react-old/pull/75))
- Add Menu `shape` property for describing the shape of the component, instead using the type property @mnajdova ([#68](https://github.com/stardust-ui/react-old/pull/68))
- Add Input component @alinais ([#64](https://github.com/stardust-ui/react-old/pull/64))
- Add Text `important` prop @mnajdova ([#120](https://github.com/stardust-ui/react-old/pull/120))
- Add Avatar `alt` prop @mnajdova ([#124](https://github.com/stardust-ui/react-old/pull/124))

### Documentation
- Add accessibility section to each component @mnajdova ([#46](https://github.com/stardust-ui/react-old/pulls/46))
- Fix down doc site, bad links, and bad image src paths @levithomason ([#77](https://github.com/stardust-ui/react-old/pulls/77))
- Add JSX and HTML code preview and card view for component examples in the doc site @Bugaa92 ([#62](https://github.com/stardust-ui/react-old/pull/62))
- Add shorthand examples for the Label component @mnajdova ([#99](https://github.com/stardust-ui/react-old/pull/99))
- Replace `stardust` imports with `@stardust-ui/react-old` to reflect the new npm package @davezuko ([#115](https://github.com/stardust-ui/react-old/pull/115]))
- Further improve code edit experience @levithomason ([#100](https://github.com/stardust-ui/react-old/pulls/100))
- Improve general clarity in README @davezuko ([#118](https://github.com/stardust-ui/react-old/pull/118]))

<!--------------------------------[ v0.2.0 ]------------------------------- -->
## [v0.2.0](https://github.com/stardust-ui/react-old/tree/v0.2.0) (2018-07-10)
[Compare changes](https://github.com/stardust-ui/react-old/compare/v0.1.0...v0.2.0)

### Fixes
- Fix merging of theme values for nested Providers @kuzhelov ([#55](https://github.com/stardust-ui/react-old/pulls/55))

### Features
- Publish TypeScript typings with package @levithomason (54caeb56219e2d92d2e2fe24da4b797ea92e9d09)
- Add Chat component @levithomason ([#32](https://github.com/stardust-ui/react-old/pulls/32))
- Add Menu `secondary` and `pointing` props @mnajdova ([#49](https://github.com/stardust-ui/react-old/pulls/49))
- Add Menu `items` shorthand prop @miroslavstastny ([#41](https://github.com/stardust-ui/react-old/pulls/41))

### Documentation
- Fix nav links for examples, remove introduction @seankeating ([#58](https://github.com/stardust-ui/react-old/pulls/58))
- Fix live edit for component variables @kuzhelov ([#55](https://github.com/stardust-ui/react-old/pulls/55))

### Performance
- Implement a base UIComponent @levithomason ([#21](https://github.com/stardust-ui/react-old/pulls/21))

<!--------------------------------[ v0.1.0 ]------------------------------- -->
## [v0.1.0](https://github.com/stardust-ui/react-old/tree/v0.2.0) (2018-07-05)

Initial prototype release
