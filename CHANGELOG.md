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

### BREAKING CHANGES
- Change font ramp and Text size API @codepretty ([#214](https://github.com/stardust-ui/react/pull/214))

### Features
- Add embed mode for `FocusZone` and use it in newly added Chat behaviors @tomasiser ([#233](https://github.com/stardust-ui/react/pull/233))

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
- Preserve fonts and static styles in mergeThemes @levithomason ([#217](https://github.com/stardust-ui/react/pull/217))

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
