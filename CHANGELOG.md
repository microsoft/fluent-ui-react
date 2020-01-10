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

<!--------------------------------[ v0.43.0 ]------------------------------- -->
## [v0.43.0](https://github.com/microsoft/fluent-ui-react/tree/v0.43.0) (2020-01-08)
[Compare changes](https://github.com/microsoft/fluent-ui-react/compare/v0.42.0..v0.43.0)

### BREAKING CHANGES
- Use `tooltipAsLabelBehavior` as default `Tooltip` behavior @silviuavram ([#2195](https://github.com/microsoft/fluent-ui-react/pull/2195))

### Features
- Add `tag` icon in Teams theme @codepretty ([#2180](https://github.com/microsoft/fluent-ui-react/pull/2180))
- Add `inverted` prop and style for `Button` for Teams theme @notandrew ([#2076](https://github.com/microsoft/fluent-ui-react/pull/2076))
- Add `vertical` prop to `Divider` @silviuavram ([#2141](https://github.com/microsoft/fluent-ui-react/pull/2141))
- Support clickable cells in `Table`, add prototype for table with sorting @jurokapsiar ([#2183](https://github.com/microsoft/fluent-ui-react/pull/2183))

### Fixes
- Fix `toggle` changing width during animation in Teams theme @mnajdova ([#2189](https://github.com/microsoft/fluent-ui-react/pull/2189))
- Update `SplitButton` styles in Teams theme [redlines] @notandrew ([#2108](https://github.com/microsoft/fluent-ui-react/pull/2108))
- Fix `Popup` positioning in multiple cases @layershifter ([#2187](https://github.com/microsoft/fluent-ui-react/pull/2187))
- Fix click outside in `Popup` when `trigger` is not defined @layershifter ([#2202](https://github.com/microsoft/fluent-ui-react/pull/2202))
- Use `debounce` from `lodash` in `Dropdown` and `Carouel` @silviuavram ([#2203](https://github.com/microsoft/fluent-ui-react/pull/2203))

<!--------------------------------[ v0.42.0 ]------------------------------- -->
## [v0.42.0](https://github.com/microsoft/fluent-ui-react/tree/v0.42.0) (2019-12-12)
[Compare changes](https://github.com/microsoft/fluent-ui-react/compare/v0.41.01..v0.42.0)

### BREAKING CHANGES
- Rename all "Stardust UI" references to "Fluent UI" @levithomason ([#2165](https://github.com/microsoft/fluent-ui-react/pull/2165))

### Fixes
- Fix colors expand for `border-color` shorthand @layershifter ([#2160](https://github.com/microsoft/fluent-ui-react/pull/2160))

### Features
- Adding `table` navigation @kolaps33 ([#2147](https://github.com/microsoft/fluent-ui-react/pull/2147))

<!--------------------------------[ v0.41.1 ]------------------------------- -->
## [v0.41.1](https://github.com/microsoft/fluent-ui-react/tree/v0.41.1) (2019-12-10)
[Compare changes](https://github.com/microsoft/fluent-ui-react/compare/v0.41.0...v0.41.1)

### Fixes
- Prevent text highlight on icon consecutive clicks in `Checkbox` @silviuavram ([#2154](https://github.com/microsoft/fluent-ui-react/pull/2154))
- Always handle provided onKeyDown event be propagated in inner zone @kolaps33 ([#2140](https://github.com/microsoft/fluent-ui-react/pull/2140))
- Fixed newly packages to have publishConfig set to public @kenotron ([#2161](https://github.com/microsoft/fluent-ui-react/pull/2161))
- Rename `lib` directories to `utils` @ecraig12345 ([#2153](https://github.com/microsoft/fluent-ui-react/pull/2153))

### Features
- Add a new experimental @fluentui/react-theming package that includes a `compose()` @kenotron ([#2152](https://github.com/microsoft/fluent-ui-react/pull/2152))
- Add `closed-captions` icon in Teams theme @codepretty ([#2100](https://github.com/stardust-ui/react/pull/2100))

### Features
- Add `presenter`, `no-presenter`, `volume-down`, `volume`, `volume-up` icons to Teams theme @codepretty ([#2156](https://github.com/microsoft/fluent-ui-react/pull/2156))

<!--------------------------------[ v0.41.0 ]------------------------------- -->
## [v0.41.0](https://github.com/microsoft/fluent-ui-react/tree/v0.41.0) (2019-12-04)
[Compare changes](https://github.com/microsoft/fluent-ui-react/compare/v0.40.4...v0.41.0)

### BREAKING CHANGES
- Control Tree `activeItemIds` through `expanded` TreeItem prop @silviuavram ([#2061](https://github.com/stardust-ui/react/pull/2061))
- Rename all @stardust-ui scope to @fluentui ([#2117](https://github.com/microsoft/fluent-ui-react/pull/2117))

### Fixes
- Update Silver color scheme, changing `backgroundHover` and `backgroundPressed` for high-contrast theme @pompomon ([#2078](https://github.com/microsoft/fluent-ui-react/pull/2078))
- Updating the `attachment` component styles to match Teams theme @notandrew ([#2012](https://github.com/stardust-ui/react/pull/2012))
- Removed `shadowLevel1Darker` in Teams themes and changed all references to `shadowLevel1Dark` affecting `Button` and `ChatMessage` variables files @bcalvery ([#2098](https://github.com/microsoft/fluent-ui-react/pull/2098))
- Honor `disableAnimations` prop in `Provider` @miroslavstastny ([#2087](https://github.com/microsoft/fluent-ui-react/pull/2087))
- `Dialog` content should have 100% width @jurokapsiar ([#2104](https://github.com/microsoft/fluent-ui-react/pull/2104))
- Allow focusing radio and checkbox in the focus zone @jurokapsiar ([#2103](https://github.com/microsoft/fluent-ui-react/pull/2103))
- Apply unhandled props of `Ref` to the children if used @jurokapsiar ([#2105](https://github.com/microsoft/fluent-ui-react/pull/2105))
- Add necessary `-ms-grid-` styles to `Layout` for IE11 @jurokapsiar ([#2106](https://github.com/microsoft/fluent-ui-react/pull/2106))
- Accessibility `splitButton` & `menuButton` - screen reader fixes @kolaps33 ([#2090](https://github.com/microsoft/fluent-ui-react/pull/2090))
- Accessibility `menuButton` add aria-controls attribute based on `open` prop @kolaps33 ([#2107](https://github.com/microsoft/fluent-ui-react/pull/2107))
- Fix the 500 color variant for `steelLight` in category color scheme @natashamayurshah ([#2089](https://github.com/microsoft/fluent-ui-react/pull/2089))
- Fix focus handling cases in `MenuButton` and `SplitButton` @silviuavram ([#2145](https://github.com/microsoft/fluent-ui-react/pull/2145))

### Features
- Add `Table` component base implementation @pompomon ([#2099](https://github.com/microsoft/fluent-ui-react/pull/2099))
- Add bounce animation to button clicks in Teams theme @notandrew ([#1724](https://github.com/stardust-ui/react/pull/1724))
- Update Silver color scheme, adding `foregroundHover`, `foregroundPressed` and `background` definitions @pompomon ([#2078](https://github.com/microsoft/fluent-ui-react/pull/2078))
- Expanding experimental accessibility schema to more components @mshoho ([#2052](https://github.com/stardust-ui/react/pull/2052))
- Add base `Carousel` component @silviuavram ([#1979](https://github.com/microsoft/fluent-ui-react/pull/1979))
- Add support for render props pattern via `children` prop to shorthands @layershifter ([#1951](https://github.com/stardust-ui/react/pull/1951))

### Documentation
- Add usage example for `Tooltip` on disabled elements @mnajdova ([#2091](https://github.com/microsoft/fluent-ui-react/pull/2091))
- Prototype for hexgonal avatars @mnajdova ([#2093](https://github.com/microsoft/fluent-ui-react/pull/2093))

<!--------------------------------[ v0.40.4 ]------------------------------- -->
## [v0.40.4](https://github.com/stardust-ui/react/tree/v0.40.4) (2019-11-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.40.3...v0.40.4)

### Fixes
- Trigger `whatInput` cleanup when last `Provider` with custom `target` gets removed @silviuavram ([#2127](https://github.com/microsoft/fluent-ui-react/pull/2127))

### Performance
- Allow suppression of action menu positioning in `ChatMessage` @jurokapsiar ([#2126](https://github.com/microsoft/fluent-ui-react/pull/2126))

<!--------------------------------[ v0.40.3 ]------------------------------- -->
## [v0.40.3](https://github.com/stardust-ui/react/tree/v0.40.3) (2019-11-08)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.40.2...v0.40.3)

### Performance
- Add rendering performance telemetry @miroslavstastny ([#2079](https://github.com/microsoft/fluent-ui-react/pull/2079))
- Skip empty frames in mergeThemes @levithomason @miroslavstastny ([#2095](https://github.com/microsoft/fluent-ui-react/pull/2095))
- Lazily evaluate styles and classes @levithomason @miroslavstastny ([#2097](https://github.com/microsoft/fluent-ui-react/pull/2097))

<!--------------------------------[ v0.40.2 ]------------------------------- -->
## [v0.40.2](https://github.com/stardust-ui/react/tree/v0.40.2) (2019-10-30)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.40.1...v0.40.2)

### Fixes
- Update `call-missed-line` icon in Teams theme @codepretty ([#2059](https://github.com/stardust-ui/react/pull/2059))
- Show debug panel correctly for components with no owner @miroslavstastny ([#2055](https://github.com/stardust-ui/react/pull/2055))
- Update `listItem`, `button`, `toolbar`, `toolbarMenu` to use `getBorderFocusStyles` in the Teams theme @bcalvery ([#2011](https://github.com/stardust-ui/react/pull/2011))
- Correctly handle empty key actions in RTL @miroslavstastny ([#2060](https://github.com/stardust-ui/react/pull/2060))
- Accessibility improvements for `tree` and `splitButton` @kolaps33 ([#2032](https://github.com/stardust-ui/react/pull/2032))
- Update color scheme values in Teams theme @codepretty ([#2063](https://github.com/stardust-ui/react/pull/2063))
- Fixing a core keydown disconnect issue @dzearing ([#2056](https://github.com/stardust-ui/react/pull/2056))
- Fix blurry content of Popup @jurokapsiar ([#2067](https://github.com/stardust-ui/react/pull/2067))
- MenuButton: do not force pinned in MenuButton @jurokapsiar ([#2066](https://github.com/stardust-ui/react/pull/2066))
- Clean up popper element reference after destroy @jurokapsiar ([#2062](https://github.com/stardust-ui/react/pull/2062))

### Features
- Add `menu` prop on `ToolbarMenuItem` component @mnajdova ([#1984](https://github.com/stardust-ui/react/pull/1984))
- Add `unstable_overflow` to `ChatMessage` to provide more flexible position in overflow containers @layershifter ([#2050](https://github.com/stardust-ui/react/pull/2050))
- Add `foregroundHover2` to Teams theme @miroslavstastny ([#2071](https://github.com/stardust-ui/react/pull/2071))

### Documentation
- Editor Toolbar prototype: Fix overflow menu overflowing in Portal window @miroslavstastny ([#2053](https://github.com/stardust-ui/react/pull/2053))

<!--------------------------------[ v0.40.1 ]------------------------------- -->
## [v0.40.1](https://github.com/stardust-ui/react/tree/v0.40.1) (2019-10-18)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.40.0...v0.40.1)

### Features
- Export `robot`, `tabs` and `plugs` icon to Teams theme @codepretty ([#2026](https://github.com/stardust-ui/react/pull/2026))
- Add CSSinJS debug panel @levithomason @miroslavstastny @mnajdova ([#1974](https://github.com/stardust-ui/react/pull/1974))
- Add ability to set custom footer for `Dialog` @kolaps33 ([#2005](https://github.com/stardust-ui/react/pull/2005))

### Fixes
- Correctly handle RTL in `Alert` component @miroslavstastny ([#2018](https://github.com/stardust-ui/react/pull/2018))
- Popper should use the correct window instance @jurokapsiar ([#2028](https://github.com/stardust-ui/react/pull/2028))
- Checking if the slot attributes are defined @mshoho ([#2040](https://github.com/stardust-ui/react/pull/2040))

### Performance
- Remove redundant usages of `Box` component in `Attachment`, `Popup` and `Tooltip` @layershifter ([#2023](https://github.com/stardust-ui/react/pull/2023))
- Refactor `ListItem` to avoid usages of `Flex` component @layershifter ([#2025](https://github.com/stardust-ui/react/pull/2025))
- Cache resolved component variables @jurokapsiar @miroslavstastny ([#2041](https://github.com/stardust-ui/react/pull/2041))

### Documentation
- Fix 'RTL' and 'Theme it' in examples @miroslavstastny ([#2020](https://github.com/stardust-ui/react/pull/2020))
- Prototype for custom scrollbar for menu, dialog, popup and list @jurokapsiar ([#1962](https://github.com/stardust-ui/react/pull/1962))

<!--------------------------------[ v0.40.0 ]------------------------------- -->
## [v0.40.0](https://github.com/stardust-ui/react/tree/v0.40.0) (2019-10-09)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.39.0...v0.40.0)

### BREAKING CHANGES
- Remove `onReduceItems` prop from Toolbar @miroslavstastny ([#2010](https://github.com/stardust-ui/react/pull/2010))

### Fixes
- Fix `bodyBackground` color for Teams dark theme to be the correct grey value @codepretty ([#1961](https://github.com/stardust-ui/react/pull/1961))
- Updating `Button` styles for Teams dark & high contrast themes to match design @notandrew ([#1933](https://github.com/stardust-ui/react/pull/1933))
- Update Office brand icons in Teams theme with latest version @notandrew ([#1954](https://github.com/stardust-ui/react/pull/1954))
- Fix various component documentation issues @davezuko ([#1992](https://github.com/stardust-ui/react/pull/1992))
- Fix accessibility issue by adding border to reactions in Teams high contrast theme @codepretty ([#2001](https://github.com/stardust-ui/react/pull/2001))

### Features
- Add experimental runtime accessibility attributes validation (the initial step validates the Button component only) @mshoho ([#1911](https://github.com/stardust-ui/react/pull/1911))
- Add `sync` icon to Teams theme @codepretty ([#1973](https://github.com/stardust-ui/react/pull/1973))
- Updating category colors palette and schemes in Teams theme @codepretty ([#1994](https://github.com/stardust-ui/react/pull/1994))
- Add `bell` icon to Teams theme @codepretty ([#1993](https://github.com/stardust-ui/react/pull/1993))
- Simplify rendering when tooltip is not visible @jurokapsiar ([#1981](https://github.com/stardust-ui/react/pull/1981))
- Add `thumbtack`, `thumbtack-slash` and `question-circle` icons to Teams theme @codepretty ([#2000](https://github.com/stardust-ui/react/pull/2000))
- Add `overflow` prop to `Toolbar` @levithomason @miroslavstastny @layershifter ([#2010](https://github.com/stardust-ui/react/pull/2010))

### Documentation
- Copy to clipboard prototype - attached confirmation @jurokapsiar ([#1900](https://github.com/stardust-ui/react/pull/1900))
- Add `EditorToolbar` prototype @layershifter ([#2010](https://github.com/stardust-ui/react/pull/2010))


<!--------------------------------[ v0.39.0 ]------------------------------- -->
## [v0.39.0](https://github.com/stardust-ui/react/tree/v0.39.0) (2019-09-23)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.38.1...v0.39.0)

### BREAKING CHANGES
- Remove base theme and move everything to teams theme @mnajdova ([#1908](https://github.com/stardust-ui/react/pull/1908))

### Fixes
- Fix `Menu` and `Submenu` to use correct indicator icon and have correct width behavior [redlines] @bcalvery ([#1831](https://github.com/stardust-ui/react/pull/1831))
- Fix `CreateShorthandOptions` should be typed @lucivpav ([#1886](https://github.com/stardust-ui/react/pull/1886))
- Add `shadowLevel1Dark` in Teams themes @notandrew ([#1887](https://github.com/stardust-ui/react/pull/1887))
- When merging themes use deep merge for site and component variables @miroslavstastny ([#1907](https://github.com/stardust-ui/react/pull/1907))
- Fix styles for Teams theme for `Textarea` and add support for `inverted`, `fluid` and `resize` props @codepretty ([#1922](https://github.com/stardust-ui/react/pull/1922))
- Fix `Dropdown` to properly accept `id` on `searchInput` @silviuavram ([#1938](https://github.com/stardust-ui/react/pull/1938))
- Fix white flash when activating `Embed` component @lucivpav ([#1909](https://github.com/stardust-ui/react/pull/1909))
- Fix comparison of custom objects in `Dropdown` @lucivpav ([#1943](https://github.com/stardust-ui/react/pull/1943))

### Features
- Add `TextArea` component @lucivpav ([#1897](https://github.com/stardust-ui/react/pull/1897))
- Export `bell-slash` and `bell-snooze` icon to Teams theme @musingh ([#1921](https://github.com/stardust-ui/react/pull/1921))
- Add support for radio & checkbox groups to `Toolbar` component @layershifter ([#1920](https://github.com/stardust-ui/react/pull/1920))
- Add support for `Popup` in `ToolbarMenu` @lucivpav ([#1927](https://github.com/stardust-ui/react/pull/1927))
- Add behaviors for `Tree` as list and linked them using childBehaviors @silviuavram ([#1928](https://github.com/stardust-ui/react/pull/1928))
- Add `notes` icon and update `link` icon in Teams theme @codepretty ([#1953](https://github.com/stardust-ui/react/pull/1953))

### Documentation
- Remove Usage tab @lucivpav ([#1948](https://github.com/stardust-ui/react/pull/1948))
- Put props on a single page, fix props links @lucivpav ([#1892](https://github.com/stardust-ui/react/pull/1892))
- Remove cancel button in a `Dialog` example with a close action @lucivpav ([#1949](https://github.com/stardust-ui/react/pull/1949))

<!--------------------------------[ v0.38.2 ]------------------------------- -->
## [v0.38.2](https://github.com/stardust-ui/react/tree/v0.38.2) (2019-09-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.38.1...v0.38.2)

### Fixes
- Fix comparison for `scrollParent` in `unstable_Popper` @layershifter ([#1959](https://github.com/stardust-ui/react/pull/1959))
- Fix setting `data-whatinput` attribute in child windows @layershifter ([#1972](https://github.com/stardust-ui/react/pull/1972))
- Avoid usages of global `document` and `window` in components @layershifter ([#1970](https://github.com/stardust-ui/react/pull/1970))
- Fix make `tooltip` visible for screen reader @kolaps33 ([#1942](https://github.com/stardust-ui/react/pull/1942))

### Performance
- Resolve styles once in `renderComponent()` @layershifter ([#1957](https://github.com/stardust-ui/react/pull/1957))

<!--------------------------------[ v0.38.1 ]------------------------------- -->
## [v0.38.1](https://github.com/stardust-ui/react/tree/v0.38.1) (2019-09-13)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.38.0...v0.38.1)

### Fixes
- Fix order of applying unhandled props and key handlers @jurokapsiar ([#1901](https://github.com/stardust-ui/react/pull/1901))
- Fix handling of `onMouseEnter` prop in `ChatMessage` @layershifter ([#1903](https://github.com/stardust-ui/react/pull/1903))
- Fix focus styles for `TreeItem` and `HierarchicalTreeItem` @silviuavram ([#1912](https://github.com/stardust-ui/react/pull/1912))
- Use more accurate positioning for `actions` in `Chat.Message` when is inside scrollable containers @layershifter ([#1929](https://github.com/stardust-ui/react/pull/1929))
- Do not force focus inside focus trap zone on outside focus @sophieH29 ([#1930](https://github.com/stardust-ui/react/pull/1930))

### Features
- Add `navigable` `List` variant @jurokapsiar ([#1904](https://github.com/stardust-ui/react/pull/1904))
- Add the `SplitButton` component @silviuavram ([#1789](https://github.com/stardust-ui/react/pull/1798))

### Documentation
- Fix broken code editor in some doc site examples and improve error experience @levithomason ([#1906](https://github.com/stardust-ui/react/pull/1906))
- Add `VirtualizedTree` prototype @silviuavram ([#1890](https://github.com/stardust-ui/react/pull/1890))

<!--------------------------------[ v0.38.0 ]------------------------------- -->
## [v0.38.0](https://github.com/stardust-ui/react/tree/v0.38.0) (2019-09-06)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.37...v0.38.0)

### BREAKING CHANGES
- `Alert`, `Attachment`, `Button`, `ChatMessage`, `Checkbox`, `Embed`, `Grid`, `ListItem`, `RadioGroupItem`, `Reaction`, `Slider`, `ToolbarCustomItem`, `ToolbarItem`, `ToolbarMenuItem` do not have `isFromKeyboard` in their style functions anymore @layershifter ([#1850](https://github.com/stardust-ui/react/pull/1850))
- `AttachmentState`, `ButtonState`, `GridState`, `ListItemState`, `ReactionState`, `ToolbarCustomItemState`, `ToolbarItemState`, `ToolbarMenuItemState` interfaces are no longer exported @layershifter ([#1850](https://github.com/stardust-ui/react/pull/1850))

### Fixes
- Fix `muted` prop in `Video` component @layershifter ([#1847](https://github.com/stardust-ui/react/pull/1847))
- Fix `felaRenderer` is used in `Provider` explicitly @lucivpav ([#1842](https://github.com/stardust-ui/react/pull/1842))
- Fix `selectableListBehavior` to set `tabindex=-1` to `List`'s container to work correctly with screen readers @sophieH29 ([#1858](https://github.com/stardust-ui/react/pull/1858))
- Fix `Checkbox` changed to be vertically aligned to the top of it's content @bcalvery ([#1857](https://github.com/stardust-ui/react/pull/1857))
- Fix `Dropdown` context by passing custom `window` to `Downshift` @silviuavram ([#1884](https://github.com/stardust-ui/react/pull/1884))
- Fix `createShorthandFactory` types @lucivpav ([#1875](https://github.com/stardust-ui/react/pull/1875))
- Fix `Toolbar` overflow screener test @lucivpav ([#1879](https://github.com/stardust-ui/react/pull/1879))

### Features
- Add `yellow`, `green`, `orange`, `pink`, `amethyst`, `silver` and `onyx` color schemes in Teams theme @mnajdova ([#1826](https://github.com/stardust-ui/react/pull/1826))
- Add `Tree` component that is flat DOM structured @silviuavram ([#1779](https://github.com/stardust-ui/react/pull/1779))
- Add `fitted` prop to `Alert` component @layershifter ([#1872](https://github.com/stardust-ui/react/pull/1872))
- Add `backdrop` and `closeOnOutsideClick` props to `Dialog` component @layershifter ([#1847](https://github.com/stardust-ui/react/pull/1847))

### Performance
- Use `Object.assign` in `@babel/plugin-proposal-object-rest-spread` @layershifter ([#1895](https://github.com/stardust-ui/react/pull/1895))

### Documentation
- Add usage example regarding `Checkbox` in `Form` @lucivpav ([#1845](https://github.com/stardust-ui/react/pull/1845))
- Fix styles in `code-sandbox` package @lucivpav ([#1853](https://github.com/stardust-ui/react/pull/1853))
- Adding accessibility tab content @kolaps33 ([#1840](https://github.com/stardust-ui/react/pull/1840))
- Fix CodeSandbox examples versions mismatch @lucivpav ([#1849](https://github.com/stardust-ui/react/pull/1849))
- Update documentation regarding `renderSelectedItem` prop in `Dropdown` @lucivpav ([#1856](https://github.com/stardust-ui/react/pull/1856))
- Fix navigation links pointing to wrong direction @lucivpav ([#1868](https://github.com/stardust-ui/react/pull/1868))
- Add `Copy To Clipboard` prototype @lucivpav ([#1860](https://github.com/stardust-ui/react/pull/1860))

<!--------------------------------[ v0.37.0 ]------------------------------- -->
## [v0.37.0](https://github.com/stardust-ui/react/tree/v0.37.0) (2019-08-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.36.2...v0.37.0)

### BREAKING CHANGES
- Rename `action` slot to `dismissAction` in `Alert` component @layershifter ([#1823](https://github.com/stardust-ui/react/pull/1823))
- To make `dismissAction` slot visible in `Alert` component `dismissible` prop is required now @layershifter ([#1823](https://github.com/stardust-ui/react/pull/1823))
- Fix `Tooltip` shadow incorrect - removed `boxShadowStart`, `boxShadowColor`, `boxShadowEnd` from `tooltipContentVariables`, replaced with `boxShadow` [redlines] @bcalvery ([#1825](https://github.com/stardust-ui/react/pull/1825))

### Fixes
- Update text `Button` styles for Teams Theme to match [redlines] @codepretty ([#1719](https://github.com/stardust-ui/react/pull/1719))
- Fix `Menu` and `MenuItem` styles to match [redlines] @bcalvery ([#1712](https://github.com/stardust-ui/react/pull/1712))
- Make `Embed` focusable via keyboard @lucivpav ([#1758](https://github.com/stardust-ui/react/pull/1758))
- Update screener tests for `Input` to only capture Teams themes @codepretty ([#1801](https://github.com/stardust-ui/react/pull/1801))
- Fix `Checkbox` style bug in background color [redlines] @bcalvery ([#1796](https://github.com/stardust-ui/react/pull/1796))
- Fix bidirectional `FocusZone` to land focus correctly on DOWN key press after series of UP arrow keys @sophieH29 ([#1794](https://github.com/stardust-ui/react/pull/1794))
- Fix `hand` icon in Teams theme @lucivpav ([#1782](https://github.com/stardust-ui/react/pull/1782))
- ESC key should close the last opened `Popup` or `Dialog` if body has focus @sophieH29 ([#1807](https://github.com/stardust-ui/react/pull/1807))
- Fix switching modes in `Dropdown` @layershifter ([#1830](https://github.com/stardust-ui/react/pull/1830))
- Fix a runtime error if context is missing @layershifter ([#1837](https://github.com/stardust-ui/react/pull/1837))
- Fix RTL mode in `Dialog` @lucivpav ([#1828](https://github.com/stardust-ui/react/pull/1828))
- Do not scroll the page when spacebar is pressed on focused `MenuItem`, fix submenu not closing @lucivpav ([#1735](https://github.com/stardust-ui/react/pull/1735))

### Features
- Add `overwrite` prop to `Provider` @layershifter ([#1780](https://github.com/stardust-ui/react/pull/1780))
- Upgrade `FocusZone` to the latest version from `fabric-ui` @sophieH29 ([#1772](https://github.com/stardust-ui/react/pull/1772))
- Add `inverted` prop to `Input` for changing the background color [redlines] @codepretty ([#1684](https://github.com/stardust-ui/react/pull/1684))
- Edit `buttonBehavior` Adding aria-disabled when button has loading state @kolaps33 ([#1789](https://github.com/stardust-ui/react/pull/1789))
- Added `audio-off` and `clipboard-copied-to` icon to Teams theme @bcalvery ([#1792](https://github.com/stardust-ui/react/pull/1792))
- Added `window-maximize`, `window-minimize` and `window-restore` icons to Teams theme @codepretty ([#1803](https://github.com/stardust-ui/react/pull/1803))
- Export `FocusTrapZoneProps` and `AutoFocusZoneProps` from the main package @sophieH29 ([#1795](https://github.com/stardust-ui/react/pull/1795))
- Add `checkable` and `checkableIndicator` to the `Dropdown` and `DropdownItem` components @mnajdova ([#1738](https://github.com/stardust-ui/react/pull/1738))
- Add unified ramp of category colors and category color schemes: `foreground`, `foreground1`, `background` to the Teams themes @natashamayurshah ([#1711](https://github.com/stardust-ui/react/pull/1711))
- Upgrade `FocusTrapZone` to the latest version from `fabric-ui` @sophieH29 ([#1790](https://github.com/stardust-ui/react/pull/1790))
- Add `visible` prop to `Alert` @layershifter ([#1823](https://github.com/stardust-ui/react/pull/1823))
- Add `actions` slot to `Alert` @layershifter ([#1823](https://github.com/stardust-ui/react/pull/1823))
- Add `header` and `icon` slots to `Alert` component @lucivpav ([#1821](https://github.com/stardust-ui/react/pull/1821))

### Documentation
- Restore docs for `Ref` component @layershifter ([#1777](https://github.com/stardust-ui/react/pull/1777))
- Add prototype for expandable control messages in `Chat` @sophieH29 ([#1765](https://github.com/stardust-ui/react/pull/1765))
- Remove Font Awesome icons from docs examples @lucivpav ([#1764](https://github.com/stardust-ui/react/pull/1764))
- Improve QuickStart code example @lucivpav ([#1797](https://github.com/stardust-ui/react/pull/1797))
- Implement component tab UI @lucivpav ([#1784](https://github.com/stardust-ui/react/pull/1784))
- Fix sidebar search input element's background color @lucivpav ([#1836](https://github.com/stardust-ui/react/pull/1836))
- Improve an example on CodeSandbox @layershifter ([#1844](https://github.com/stardust-ui/react/pull/1844))

<!--------------------------------[ v0.36.3 ]------------------------------- -->
## [v0.36.3](https://github.com/stardust-ui/react/tree/v0.36.3) (2019-09-03)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.36.2...v0.36.3)

 ### Fixes
- Use a proper `document` to find nodes in `doesNodeContainClick()` @layershifter ([#1874](https://github.com/stardust-ui/react/pull/1874))
- Correctly define current document object of the `FocusZone` and `FocusTrapZone` @sophieH29 ([#1820](https://github.com/stardust-ui/react/pull/1820))

 ### Performance
- Fix `Popper` positioning called when unnecessary in `Tooltip` @lucivpav ([#1882](https://github.com/stardust-ui/react/pull/1882))

<!--------------------------------[ v0.36.2 ]------------------------------- -->
## [v0.36.2](https://github.com/stardust-ui/react/tree/v0.36.2) (2019-08-19)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.36.1...v0.36.2)

### Fixes
- Update vulnerable version of `lodash` dependency @layershifter ([#1700](https://github.com/stardust-ui/react/pull/1700))
- Use `target` from `Provider` in `ReactDOM.createPortal()` calls @layershifter ([#1810](https://github.com/stardust-ui/react/pull/1810))

### Features
- Add possibility for a Toolbar to rearrange its items according to space available @miroslavstastny ([#1657](https://github.com/stardust-ui/react/pull/1657))
- Focus indicator for additional documents @jurokapsiar ([#1816](https://github.com/stardust-ui/react/pull/1816))

<!--------------------------------[ v0.36.1 ]------------------------------- -->
## [v0.36.1](https://github.com/stardust-ui/react/tree/v0.36.1) (2019-08-09)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.36.0...v0.36.1)

### Features
- Add `loading` and `loader` props to `Button` component @mnajdova ([#1662](https://github.com/stardust-ui/react/pull/1662))

<!--------------------------------[ v0.36.0 ]------------------------------- -->
## [v0.36.0](https://github.com/stardust-ui/react/tree/v0.36.0) (2019-08-08)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.35.0...v0.36.0)

### BREAKING CHANGES
- Fix `firstFocusableSelector` in `FocusTrapZone` and `AutoFocusZone` @sophieH29 ([#1732](https://github.com/stardust-ui/react/pull/1732))
- Rename Popup `shouldTriggerBeTabbable` prop to `tabbableTrigger` @jurokapsiar ([#1696](https://github.com/stardust-ui/react/pull/1696))
- `StackableEventListener` is removed @layershifter ([#1755](https://github.com/stardust-ui/react/pull/1755))
- Rename `Tree` to `HierarchicalTree` @silviuavram ([#1752](https://github.com/stardust-ui/react/pull/1752))

### Fixes
- Require `name` prop in `Icon` component @lucivpav ([#1723](https://github.com/stardust-ui/react/pull/1723))
- Export `broadcast` icon in Teams theme @miroslavstastny ([#1737](https://github.com/stardust-ui/react/pull/1737))
- Ensure `actionsMenu` is not cut-off by the edge of viewport for `ChatMessage` @kuzhelov ([#1739](https://github.com/stardust-ui/react/pull/1739))
- `FocusZone` should respect elements with `contenteditable` attribute on Home/End key press @sophieH29 ([#1749](https://github.com/stardust-ui/react/pull/1749))
- Fix incorrect order of plugin execution in `felaRenderer` @lucivpav ([#1741](https://github.com/stardust-ui/react/pull/1741))

### Features
- Expose `isFromKeyboard` in `Grid` component @sophieH29 ([#1729](https://github.com/stardust-ui/react/pull/1729))
- Add `onActiveIndexChange` prop to `Tree` component @lucivpav ([#1728](https://github.com/stardust-ui/react/pull/1728))
- Add `horizontal` prop for `List` component @mnajdova ([#1721](https://github.com/stardust-ui/react/pull/1721))
- Export `call-blocked` icon to Teams theme @francescopalmiotto ([#1736](https://github.com/stardust-ui/react/pull/1736))
- Add support for component styles debugging @kuzhelov ([#1726](https://github.com/stardust-ui/react/pull/1726))
- Use FocusZone in selectable list @jurokapsiar ([#1757](https://github.com/stardust-ui/react/pull/1757))
- Add `MenuButton` component @jurokapsiar ([#1696](https://github.com/stardust-ui/react/pull/1696))
- Add `useEventListener` hook @layershifter ([#1755](https://github.com/stardust-ui/react/pull/1755))

### Documentation
- Fix code in changing component variables section of theming examples @lucivpav ([#1626](https://github.com/stardust-ui/react/pull/1626))
- Fix layout issue rendering extra space when viewing documentation in Firefox @notandrew ([#1427](https://github.com/stardust-ui/react/pull/1427))
- Add search capability @lucivpav ([#1682](https://github.com/stardust-ui/react/pull/1682))
- Improve `Theme it` section under component examples @layershifter ([#1748](https://github.com/stardust-ui/react/pull/1748))

<!--------------------------------[ v0.35.0 ]------------------------------- -->
## [v0.35.0](https://github.com/stardust-ui/react/tree/v0.35.0) (2019-07-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.34.3...v0.35.0)

### BREAKING CHANGES
-  Add `trapFocus` and `autoFocus` props to `Popup` and remove `popupFocusTrapBehavior` and `popupAutoFocusBehavior` @sophieH29 ([#1565](https://github.com/stardust-ui/react/pull/1565))
- `defaultBehavior` was removed @layershifter ([#1600](https://github.com/stardust-ui/react/pull/1600))
- `ReactElement`s are now handled in the same way as string in all shorthands @layershifter ([#1513](https://github.com/stardust-ui/react/pull/1513))
- `Props` param is required in `ShorthandValue` and `ShorthandCollection` @layershifter ([#1605](https://github.com/stardust-ui/react/pull/1605))
- `LoaderPosition` type is no longer exported @layershifter ([#1634](https://github.com/stardust-ui/react/pull/1634))
- Changed values for `textAlign` prop and renamed it to `align` for `Header` component @Bugaa92 ([#1668](https://github.com/stardust-ui/react/pull/1668))
- `paddingLeftRightValue` variable in `buttonVariables` was renamed to `padding` in Teams theme @layershifter ([#1716](https://github.com/stardust-ui/react/pull/1716))

### Features
- Split action handlers with "OR" condition in accessibility behaviors @sophieH29 ([#1622](https://github.com/stardust-ui/react/pull/1622))
- Add `headerAction` slot to the `Dialog` component @mnajdova ([#1617](https://github.com/stardust-ui/react/pull/1617))
- Add `Slider` component @Bugaa92 ([#1559](https://github.com/stardust-ui/react/pull/1559))
- Add `tooltipAsLabelBehavior` accessibility behavior for `Tooltip` @sophieH29 ([#1635](https://github.com/stardust-ui/react/pull/1635))
- Add outline version of `menu` icon and `files-visio` icon to Teams theme @notandrew ([#1623](https://github.com/stardust-ui/react/pull/1623))
- Add `amethyst` color to the Teams theme color palette @mnajdova ([#1650](https://github.com/stardust-ui/react/pull/1650))
- Export `onedrive` icon to `Teams` theme @chughkartikey ([#1680](https://github.com/stardust-ui/react/pull/1680))
- Add `image-unavailable` icon to Teams Theme @joheredi ([#1633](https://github.com/stardust-ui/react/pull/1633))
- Add bidirectional navigation following DOM in `FocusZone` @sophieH29 ([#1637](https://github.com/stardust-ui/react/pull/1647))
- Open `Popup` on `contextmenu` @jurokapsiar ([#1524](https://github.com/stardust-ui/react/pull/1524))
- Add `align` prop for `Text` component @Bugaa92 ([#1668](https://github.com/stardust-ui/react/pull/1668))
- Add `size` prop for `Button` component @layershifter ([#1716](https://github.com/stardust-ui/react/pull/1716))
- Add `target` prop on `Provider`, allows to specify a `document` where styles should be renderer @layershifter ([#1252](https://github.com/stardust-ui/react/pull/1252))

### Fixes
- Fix `ChatMessage`'s focus border overlays `actionMenu` in Teams theme @mnajdova ([#1637](https://github.com/stardust-ui/react/pull/1637))
- Update `Checkbox` files for Teams Theme to match [redlines] @bcalvery ([#1656](https://github.com/stardust-ui/react/pull/1656))
- Add `color` prop to `Segment` typings @layershifter ([#1702](https://github.com/stardust-ui/react/pull/1702))
- Remove `color` prop from `Dialog` typings @layershifter ([#1702](https://github.com/stardust-ui/react/pull/1702))
- `Loader` uses `Text` component for `label` slot instead of `Box` @layershifter ([#1701](https://github.com/stardust-ui/react/pull/1701))
- Fix test cut off in `Button` component @layershifter ([#1716](https://github.com/stardust-ui/react/pull/1716))
- Close `Toolbar`'s menu when it looses focus @sophieH29 ([#1688](https://github.com/stardust-ui/react/pull/1688))

### Documentation
- Make sidebar categories collapsible @lucivpav ([#1611](https://github.com/stardust-ui/react/pull/1611))
- Fix code in nesting themes section of theming examples @lucivpav ([#1616](https://github.com/stardust-ui/react/pull/1616))
- Make prototypes conditionally public and move them below Behaviors @lucivpav ([#1627](https://github.com/stardust-ui/react/pull/1627))
- Refine component descriptions @kuzhelov ([#1629](https://github.com/stardust-ui/react/pull/1629))
- Add best practices and form usage example for `Slider` component @Bugaa92 ([#1641](https://github.com/stardust-ui/react/pull/1641))
- Add examples with `Tooltip` for the actionable components @mnajdova ([#1636](https://github.com/stardust-ui/react/pull/1636))
- Fix broken fragments on CodeSandbox @lucivpav ([#1655](https://github.com/stardust-ui/react/pull/1655))
- Improve a table with component props in docs @layershifter ([#1634](https://github.com/stardust-ui/react/pull/1634))
- Improve rendering performance for docs examples @Bugaa92 ([#1654](https://github.com/stardust-ui/react/pull/1654))
- Add FAQ entry for `Flex`, `Grid`, `Layout`, `Box`, `Segment` @lucivpav ([#1646](https://github.com/stardust-ui/react/pull/1646))

<!--------------------------------[ v0.34.3 ]------------------------------- -->
## [v0.34.3](https://github.com/stardust-ui/react/tree/v0.34.3) (2019-07-23)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.34.2...v0.34.3)

### Fixes
- Fix nesting issues with `Dialog` component inside `Popup` @layershifter ([#1706](https://github.com/stardust-ui/react/pull/1706))

<!--------------------------------[ v0.34.2 ]------------------------------- -->
## [v0.34.2](https://github.com/stardust-ui/react/tree/v0.34.2) (2019-07-19)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.34.1...v0.34.2)

 ### Fixes
- Fix a gap in `Checkbox` in RTL mode @layershifter ([#1683](https://github.com/stardust-ui/react/pull/1683))
- Fix broken background in `Popup` with `pointing` and `FocusTrap` @layershifter ([#1689](https://github.com/stardust-ui/react/pull/1689))

<!--------------------------------[ v0.34.1 ]------------------------------- -->
## [v0.34.1](https://github.com/stardust-ui/react/tree/v0.34.1) (2019-07-11)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.34.0...v0.34.1)

### Fixes
- Fix `Dropdown` and `DropdownItem` styles to match [redlines] - modified `ListItem` and ListItemStyles to not set gap in component definition @bcalvery ([#1523](https://github.com/stardust-ui/react/pull/1523))
- Fix `Dropdown` highlightedIndex on arrow keydown open @silviuavram ([#1570](https://github.com/stardust-ui/react/pull/1570))
- Fix `Dropdown` ArrowLeft keydown behavior for multiple variants @silviuavram ([#1564](https://github.com/stardust-ui/react/pull/1564))
- Fix styles for shadows in `Popup` in Teams theme [redlines] @codepretty ([#1561](https://github.com/stardust-ui/react/pull/1561))
- Fix typings for `Provider` props @miroslavstastny ([#1601](https://github.com/stardust-ui/react/pull/1601))

### Features
- Add ARIA attributes and focus handling for `RadioGroup` in `Toolbar` @sophieH29 ([#1526](https://github.com/stardust-ui/react/pull/1526))
- Add ARIA attributes and keyboard navigation for `Menu` in `Toolbar` @sophieH29 ([#1553](https://github.com/stardust-ui/react/pull/1553))
- Add `alert`, `info`, `share-alt` and `microsoft-stream` icons to Teams theme @marst89 ([#1544](https://github.com/stardust-ui/react/pull/1544))
- Add `custom` `kind` for `items` in `Toolbar` component @miroslavstastny ([#1558](https://github.com/stardust-ui/react/pull/1558))
- Add static `className` prop to result type of `createComponent` @kuzhelov ([#1563](https://github.com/stardust-ui/react/pull/1563))
- Add `hand` icon to Teams theme @t-proko ([#1567](https://github.com/stardust-ui/react/pull/1567))
- Add accessibility attributes and keyboard handlers for `Tooltip` @sophieH29 ([#1575](https://github.com/stardust-ui/react/pull/1575))
- Add `labelPosition` prop to `Checkbox` component @layershifter ([#1578](https://github.com/stardust-ui/react/pull/1578))
- Pass `props` of `Icon` component to SVG spec @kuzhelov ([#1562](https://github.com/stardust-ui/react/pull/1562))
- Add `speaker-mute` icon to Teams theme @amramornov-ms ([#1598](https://github.com/stardust-ui/react/pull/1598))
- Removed obsolete `play-sound-mute` icon from Teams theme @amramornov-ms ([#1598](https://github.com/stardust-ui/react/pull/1598))
- Add svg pointing beak to the `Tooltip` component in Teams theme @mnajdova ([#1580](https://github.com/stardust-ui/react/pull/1580))
- Add new values to the `brand`, `onyx` colors and `background4` token for default and brand color schemes in Teams theme @mnajdova ([#1581](https://github.com/stardust-ui/react/pull/1581))
- Add additional logic for showing/hiding the `actionMenu` inside the `ChatMessage` in Teams theme, based on a variable @mnajdova ([#1590](https://github.com/stardust-ui/react/pull/1590))

### Documentation
- Ensure docs content doesn't overlap with sidebar @kuzhelov ([#1568](https://github.com/stardust-ui/react/pull/1568))
- Fixing issue with copy icon taking up entire page in Firefox @notandrew ([#1576](https://github.com/stardust-ui/react/pull/1576))
- Add prototype for Custom Styled Toolbar @miroslavstastny ([#1541](https://github.com/stardust-ui/react/pull/1541))
- Add Best Practices section for each component @alinais ([#1550](https://github.com/stardust-ui/react/pull/1550))
- Update `Layout` guide @layershifter ([#1595](https://github.com/stardust-ui/react/pull/1595))
- Fix error when children are missing in `ExampleSnippet` @layershifter ([#1619](https://github.com/stardust-ui/react/pull/1619))

<!--------------------------------[ v0.34.0 ]------------------------------- -->
## [v0.34.0](https://github.com/stardust-ui/react/tree/v0.34.0) (2019-06-26)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.33.0...v0.34.0)

### BREAKING CHANGES
- Type `FontFaceStyle` was renamed to `FontFaceProps` @layershifter ([#1487](https://github.com/stardust-ui/react/pull/1487))
- Type `style` was renamed to `props` on `FontFace` @layershifter ([#1487](https://github.com/stardust-ui/react/pull/1487))
- Remove `boxShadowColor` variable for `Segment` component @Bugaa92 ([#1516](https://github.com/stardust-ui/react/pull/1516))
- Rename prop `forceFocusInsideTrap` to `forceFocusInsideTrapOnOutsideFocus` in `FocusTrapZone` @sophieH29 ([#1505](https://github.com/stardust-ui/react/pull/1505))

### Fixes
- Fix prop types of `Tooltip` component @kuzhelov ([#1499](https://github.com/stardust-ui/react/pull/1499))
- Fix `Popup` styling with `pointer` when it is wrapped by `FocusZones` @layershifter ([#1492](https://github.com/stardust-ui/react/pull/1492))
- Fix `Attachment` more option button invoke correctly action on space/enter @kolaps33 ([#1452](https://github.com/stardust-ui/react/pull/1452))
- Apply custom focus style on `TreeItem` and `TreeTitle` @silviuavram ([#1506](https://github.com/stardust-ui/react/pull/1506))
- Fix `theme` types, remove duplication @kuzhelov ([#1508](https://github.com/stardust-ui/react/pull/1508))
- Fix `RadioGroup` first item should be tabbable by default when none of the items selected @sophieH29 ([#1515](https://github.com/stardust-ui/react/pull/1515))
- Export all accessibility behaviors @jurokapsiar ([#1538](https://github.com/stardust-ui/react/pull/1538))
- Fix `FocusTrapZone` sets focus into zone correctly for lazy loaded content @sophieH29 ([#1505](https://github.com/stardust-ui/react/pull/1505))
- Replace `css-shorthand-expand` with bundled version to make it work in IE11 @layershifter ([#1542](https://github.com/stardust-ui/react/pull/1542))

### Features
- Add 'poll' and 'to-do-list' icons to Teams theme @natashamayurshah ([#1498](https://github.com/stardust-ui/react/pull/1498))
- Add `toolbarBehavior` for `Toolbar` component and apply `buttonBehavior` for `ToolbarItem` component @sophieH29 ([#1468](https://github.com/stardust-ui/react/pull/1468))
- Integrate ARIA HTML design pattern in the `Tree` component @silviuavram ([#1488](https://github.com/stardust-ui/react/pull/1488))
- Add 'broadcast' icon to Teams theme @lawrencecushman ([#1509](https://github.com/stardust-ui/react/pull/1509))
- Add `disabled` prop for `Segment` component @Bugaa92 ([#1516](https://github.com/stardust-ui/react/pull/1516))
- Add `qna` outlined icon to the Teams theme @lawrencecushman ([#1546](https://github.com/stardust-ui/react/pull/1546))
- Add `menu` prop to `Toolbar` @miroslavstastny ([#1518](https://github.com/stardust-ui/react/pull/1518))

### Performance
- Use single Fela renderer for LTR & RTL @layershifter ([#1459](https://github.com/stardust-ui/react/pull/1459))

### Documentation
- Add dedicated docs for the `color palette` and `color schema` @mnajdova ([#1494](https://github.com/stardust-ui/react/pull/1494))

<!--------------------------------[ v0.33.0 ]------------------------------- -->
## [v0.33.0](https://github.com/stardust-ui/react/tree/v0.33.0) (2019-06-13)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.32.0...v0.33.0)

### BREAKING CHANGES
- Rename `toolbarBehavior` to `menuAsToolbarBehavior` and `toolbarButtonBehavior` to `menuItemAsToolbarButtonBehavior` @miroslavstastny ([#1393](https://github.com/stardust-ui/react/pull/1393))
- Rename types related to accessibility @layershifter ([#1421](https://github.com/stardust-ui/react/pull/1421))
- Moved the `rtl` and `renderer` props from the `theme` prop object to the `Provider`'s props API @mnajdova ([#1377](https://github.com/stardust-ui/react/pull/1377))

### Fixes
- Fix click handling on focus for `action` slot in `Attachment` component @Bugaa92 ([#1444](https://github.com/stardust-ui/react/pull/1444))
- Fix Teams' theme list item end media styles @mnajdova ([#1448](https://github.com/stardust-ui/react/pull/1448))
- Fix the order of the fela plugin @mnajdova ([#1461](https://github.com/stardust-ui/react/pull/1461))
- Fix `active` styles for `iconOnly` `MenuItem` in Teams theme @mnajdova ([#1464](https://github.com/stardust-ui/react/pull/1464))
- Fix keypress/click handling for `Popup` content @kuzhelov ([#1482](https://github.com/stardust-ui/react/pull/1482))
- Fix `PopupContent` background color in Teams theme @mnajdova ([#1484](https://github.com/stardust-ui/react/pull/1484))
- Fix merging of item variables in `Menu` and `Toolbar` @miroslavstastny ([#1447](https://github.com/stardust-ui/react/pull/1447))
- Generate IDs for `header` and `content` slots once in `Dialog` component @layershifter ([#1449](https://github.com/stardust-ui/react/pull/1449))

### Features
- Define types for accessibility behaviors props. Do not render `aria-disabled` if the value is `false` @sophieH29 ([#1481](https://github.com/stardust-ui/react/pull/1481))
- Add `Toolbar` component @miroslavstastny ([#1408](https://github.com/stardust-ui/react/pull/1408))
- Add `popup` prop to `Toolbar` component @miroslavstastny ([#1408](https://github.com/stardust-ui/react/pull/1480))
- Add `disableAnimations` boolean prop on the `Provider` @mnajdova ([#1377](https://github.com/stardust-ui/react/pull/1377))
- Integrate `Dropdown` with `Form.Field` @silviuavram ([#1446](https://github.com/stardust-ui/react/pull/1446))
- Add expand/collapse and navigation with `ArrowUp` and `ArrowDown` to `Tree` @silviuavram ([#1457](https://github.com/stardust-ui/react/pull/1457))
- Expand all `Tree` siblings on `asterisk` key @silviuavram ([#1457](https://github.com/stardust-ui/react/pull/1457))
- Add 'data-is-focusable' attribute to `attachmentBehavior` @sophieH29 ([#1445](https://github.com/stardust-ui/react/pull/1445))
- Improve accessibility for `Checkbox` @jurokapsiar ([1479](https://github.com/stardust-ui/react/pull/1479))
- Add `unstable_pinned` prop to `Popup` and `Dropdown` components @Bugaa92 ([#1471](https://github.com/stardust-ui/react/pull/1471))
- Add `Tooltip` component @mnajdova ([#1455](https://github.com/stardust-ui/react/pull/1455))
- Add 'call-control-release' and 'call-control-request' icon to Teams theme @jay-howe ([#1490](https://github.com/stardust-ui/react/pull/1490))

### Documentation
- Remove unfinished themes from the docs themes dropdown on components examples pages @alinais ([#1473](https://github.com/stardust-ui/react/pull/1473))
- Adding table of contents to FAQ page @hughreeling ([#1291](https://github.com/stardust-ui/react/pull/1291))

### Performance
- Use minified version of `normalize.css` and update it to `8.0.1` @layershifter ([#1476](https://github.com/stardust-ui/react/pull/1476))

<!--------------------------------[ v0.32.0 ]------------------------------- -->
## [v0.32.0](https://github.com/stardust-ui/react/tree/v0.32.0) (2019-06-03)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.31.0...v0.32.0)

### BREAKING CHANGES
- Remove convoluted conditions from component's element type calculations @kuzhelov ([#1396](https://github.com/stardust-ui/react/pull/1396))
- Replace `Dropdown` variables: `borderRadius` with `containerBorderRadius`, `openBorderRadius` with `openAboveContainerBorderRadius` and `openBelowContainerBorderRadius`, `listBorderRadius` with `aboveListBorderRadius` and `belowListBorderRadius` @Bugaa92 ([#1312](https://github.com/stardust-ui/react/pull/1312))

### Fixes
- ESC key pressed on a trigger element should propagate event if `Popup` is closed @sophieH29 ([#1373](https://github.com/stardust-ui/react/pull/1373))
- Changing icon behavior as for some cases icon could be visible @kolaps33 ([#1327](https://github.com/stardust-ui/react/pull/1327))
- Firefox: placeholder color should match redlines @notandrew ([#1406](https://github.com/stardust-ui/react/pull/1406))
- `Popup` - fix proptypes for `content` and `trigger` props @miroslavstastny ([#1420](https://github.com/stardust-ui/react/pull/1420))
- Make `contentRef` prop optional for `Accordion.Title` @Bugaa92 ([#1418](https://github.com/stardust-ui/react/pull/1418))
- Call `getDerivedStateFromProps()` from `AutoControlledComponent` in `Dropdown` @layershifter ([#1416](https://github.com/stardust-ui/react/pull/1416))
- Fix `backgroundHover1` color in the Teams dark theme `colorScheme` @mnajdova ([1437](https://github.com/stardust-ui/react/pull/1437))
- Revert changes with different roots in `Icon` component @layershifter ([#1435](https://github.com/stardust-ui/react/pull/1435))
- Fix flickering issues with `Dropdown` and `Popup` components @Bugaa92 ([#1434](https://github.com/stardust-ui/react/pull/1434))

### Features
- Add keyboard navigation and screen reader support for `Accordion` @silviuavram ([#1322](https://github.com/stardust-ui/react/pull/1322))
- Add `expanded` prop to `Accordion` @silviuavram ([#1322](https://github.com/stardust-ui/react/pull/1322))
- Replace `react-popper` package with custom `Popper` component and exposed as `UNSTABLE_Popper` positioning helper @Bugaa92 ([#1358](https://github.com/stardust-ui/react/pull/1358))
- Add strict types for the `colorScheme` props used in the components' `variables` @mnajdova ([#1340](https://github.com/stardust-ui/react/pull/1340))
- Export `message-seen`, `presence-available`, `presence-stroke`, `open-outside` and `eye-friendlier`  icons to Teams theme @joheredi ([#1390](https://github.com/stardust-ui/react/pull/1390))
- Add 'lightning' icon to Teams theme @notandrew ([#1385](https://github.com/stardust-ui/react/pull/1385))
- Add automatic positioning inside viewport for `Menu` with submenus @Bugaa92 ([#1384](https://github.com/stardust-ui/react/pull/1384))
- Add `align`, `position`, `offset` props for `Dropdown` component @Bugaa92 ([#1312](https://github.com/stardust-ui/react/pull/1312))
- Add `Checkbox` component and `toggle` prop for it @layershifter ([#1405](https://github.com/stardust-ui/react/pull/1405))

### Documentation
- Accessibility: improve introduction section @jurokapsiar ([#1368](https://github.com/stardust-ui/react/pull/1368))
- Accessibility: improve accessibility descriptions for components @jurokapsiar ([#1371](https://github.com/stardust-ui/react/pull/1371))

<!--------------------------------[ v0.31.0 ]------------------------------- -->
## [v0.31.0](https://github.com/stardust-ui/react/tree/v0.31.0) (2019-05-21)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.30.0...v0.31.0)

### BREAKING CHANGES
- Restrict Typescript checks for component props @kuzhelov ([#1290](https://github.com/stardust-ui/react/pull/1290))
- Aligned focus styles for `Chat.Message` component with latest Teams theme design @Bugaa92 ([#1269](https://github.com/stardust-ui/react/pull/1269))
- Fix styles for `fill` prop of `Flex` @kuzhelov ([#1352](https://github.com/stardust-ui/react/pull/1352))
- FontAwesome icons is not part of Teams theme more @layershifter ([#1337](https://github.com/stardust-ui/react/pull/1337))

### Fixes
- Fixed `Flex.Item` children prop type @mnajdova ([#1320](https://github.com/stardust-ui/react/pull/1320))
- Fixed `Icon`'s color example to align with the latest color updates @mnajdova ([#1336](https://github.com/stardust-ui/react/pull/1336))
- Fixed `TreeTitle` - `tabIndex` prop should be camel case in behavior @sophieH29 ([#1345](https://github.com/stardust-ui/react/pull/1345))
- Fixed handle refs on updates of `innerRef` prop in `Ref` component @layershifter ([#1331](https://github.com/stardust-ui/react/pull/1331))
- Fixed positioing of `Popup` in scrollable container @layershifter ([#1341](https://github.com/stardust-ui/react/pull/1341))
- Add Teams dark and hc themeing for `Dialog` [redlines] @codepretty ([#1297](https://github.com/stardust-ui/react/pull/1297))
- Remove `NaN` values from positioning styles in `Popup` @kuzhelov ([#1365](https://github.com/stardust-ui/react/pull/1365))

### Features
- Add `selected`, `isFromKeyboard` props to `DropdownItem` @mnajdova ([#1299](https://github.com/stardust-ui/react/pull/1299))
- Add styles for the dark and high contrast Teams themes for the `Dropdown` component @mnajdova ([#1299](https://github.com/stardust-ui/react/pull/1299))
- Highlight options by character keys in `Dropdown` non-search versions @silviuavram ([#1270](https://github.com/stardust-ui/react/pull/1270))
- Aligned link styles for `Chat.Message` component with latest Teams theme design @Bugaa92 ([#1269](https://github.com/stardust-ui/react/pull/1269))
- Export `qna` and `yammer` SVG icons for `Teams` theme @manindr ([#1325](https://github.com/stardust-ui/react/pull/1325))
- Add FontAwesome theme @layershifter ([#1337](https://github.com/stardust-ui/react/pull/1337))
- Add red color scheme in Teams theme @mnajdova ([#1353](https://github.com/stardust-ui/react/pull/1353))

### Documentation
- Clearly identify Slots in DocSite @hughreeling ([#1292](https://github.com/stardust-ui/react/pull/1292))

<!--------------------------------[ v0.30.0 ]------------------------------- -->
## [v0.30.0](https://github.com/stardust-ui/react/tree/v0.30.0) (2019-05-10)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.29.1...v0.30.0)

### BREAKING CHANGES
- Rename `context` prop to `mountNode` in `PortalInner` @layershifter ([#1288](https://github.com/stardust-ui/react/pull/1288))
- Updated Teams' theme color palette values, removed color related site variables @mnajdova ([#1069](https://github.com/stardust-ui/react/pull/1069))
- Remove `defaultTarget` prop in `Popup` component @layershifter ([#1153](https://github.com/stardust-ui/react/pull/1153))
- Add focus border styling mechanism in Teams theme @Bugaa92 ([#1269](https://github.com/stardust-ui/react/pull/1269))

### Fixes
- Fix double rendering of `Popup` component @layershifter ([#1153](https://github.com/stardust-ui/react/pull/1153))
- Docs: fix(docs): Set maximum width for examples @miroslavstastny ([#1319](https://github.com/stardust-ui/react/pull/1319))
- Clearable `Input` can be cleared by Escape keydown @silviuavram ([#1306](https://github.com/stardust-ui/react/pull/1306))

### Features
- Add default child a11y behavior to `Menu` related behaviors @silviuavram ([#1282](https://github.com/stardust-ui/react/pull/1282))
- `Ref` component extracted to a `@stardust-ui/react-component-ref` @layershifter ([#1281](https://github.com/stardust-ui/react/pull/1281))
- added `isRefObject()`, `toRefObject()` utils for React refs @layershifter ([#1281](https://github.com/stardust-ui/react/pull/1281))
- Add new callings icons in Teams theme @codepretty ([#1264](https://github.com/stardust-ui/react/pull/1264))
- Add default aria-labelledby and aria-describedby to Dialog @silviuavram ([#1298](https://github.com/stardust-ui/react/pull/1298))
- Add `mountNode` and `mountDocument` props to allow proper multi-window rendering @layershifter ([#1288](https://github.com/stardust-ui/react/pull/1288))
- Added default and brand color schemes in Teams' theme @mnajdova ([#1069](https://github.com/stardust-ui/react/pull/1069))
- Export `files-upload` SVG icon for `Teams` theme @manindr ([#1293](https://github.com/stardust-ui/react/pull/1293))

<!--------------------------------[ v0.29.1 ]------------------------------- -->
## [v0.29.1](https://github.com/stardust-ui/react/tree/v0.29.1) (2019-05-01)
[Compare changes](https://github.com/stardust-ui/react/compare/v0.29.0...v0.29.1)

### Fixes
- Update `ChatMessage` styles in Teams themes @layershifter ([#1246](https://github.com/stardust-ui/react/pull/1246))
- Fix Teams theme styles for `Alert` [redlines] @codepretty ([#1226](https://github.com/stardust-ui/react/pull/1226))
- Update background color in Teams dark theme for `Chat` message background color @codepretty ([#1256](https://github.com/stardust-ui/react/pull/1256))
- Fix selected status of `Dropdown` when focus is on the `List` @silviuavram ([#1258](https://github.com/stardust-ui/react/pull/1258))
- Fix `propTypes` warning in `ListItem` @layershifter ([#1266](https://github.com/stardust-ui/react/pull/1266))
- Expand css shorthands for correct merging of the styles @mnajdova ([#869](https://github.com/stardust-ui/react/pull/869))

### Features
- Export `call-dialpad` icon in Teams theme @assamad ([#1271](https://github.com/stardust-ui/react/pull/1271))

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
