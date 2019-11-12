import { ThemeIconSpec, ThemeIcons, SvgIconSpec, ThemePrepared } from '../types'

import animations from './animations'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndStyles } from './components/Icon/svg'

import { TeamsSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'
import { createTheme } from '../createTheme'
// import menuStyles from './components/Menu/menuStyles'
// import menuItemStyles from './components/Menu/menuItemStyles'
// import menuDividerStyles from './components/Menu/menuDividerStyles'
// import menuVariables from './components/Menu/menuVariables'
// import { felaRenderer } from '../../lib'

const declareSvg = (svgIcon: SvgIconSpec): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
})

export const getIcon = (iconAndMaybeStyles): SvgIconSpec => {
  return (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)
}

const themeIcons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = getIcon(iconAndMaybeStyles)

  return { ...accIcons, ...{ [iconName]: declareSvg(icon) } }
}, {})

const icons: ThemeIcons = {
  ...themeIcons,
  'stardust-checkmark': themeIcons['accept'],
  'stardust-circle': themeIcons['stardust-circle'],
  'stardust-close': themeIcons['close'],
  'stardust-arrow-up': themeIcons['triangle-up'],
  'stardust-arrow-down': themeIcons['triangle-down'],
  'stardust-arrow-end': themeIcons['triangle-right'],
  'stardust-menu-arrow-down': themeIcons['chevron-down-medium'],
  'stardust-menu-arrow-end': themeIcons['chevron-right-medium'],
  'stardust-pause': themeIcons['pause'],
  'stardust-play': themeIcons['play'],
}

/*
 * Style refactoring start
 */

// const menuResolvedVariables = menuVariables(siteVariables)
// const menuRules = menuStyles(menuResolvedVariables)
// const menuItemRules = menuItemStyles(menuResolvedVariables)
// const menuDividerRules = menuDividerStyles(menuResolvedVariables)

// const selectorObjectToCssSelector = (obj, baseClassName) => {
//   let cssSelector = baseClassName || ''
//   Object.keys(obj).forEach(key => {
//     if (obj[key] === true) {
//       cssSelector += `.${key}`
//     } else if (obj[key] === false) {
//       cssSelector += `:not(.${key})`
//     } else {
//       cssSelector += `.${key}--${obj[key]}`
//     }
//   })
//   return cssSelector
// }

// const generateStylesheetObject = (rules, base) => {
//   return Object.keys(rules).reduce((accR, next) => {
//     const tuples = rules[next]
//     const baseClassName = next === 'root' ? base : `${base}__${next}`
//     const result = tuples.reduce((acc, [selector, style]) => {
//       if (Array.isArray(selector)) {
//         for (let i = 0; i < selector.length; i++) {
//           acc[selectorObjectToCssSelector(selector[i] || {}, baseClassName)] = { ...style, className:selectorObjectToCssSelector(selector[i] || {}, baseClassName) }
//         }
//         return acc
//       }
//       acc[selectorObjectToCssSelector(selector || {}, baseClassName)] = { ...style, className: selectorObjectToCssSelector(selector || {}, baseClassName) }
//       return acc
//     }, {})
//     accR[next] = result
//     return accR
//   }, {})
// }

// const felaParam = {
//   theme: { direction: 'ltr' },
//   displayName: "Menu", // does not affect styles, only used by useEnhancedRenderer in docs
// }

// const menuStylesheet = generateStylesheetObject(menuRules, 'ui-menu')
// const menuItemStylesheet = generateStylesheetObject(menuItemRules, 'ui-menu__item')
// const menuDividerStylesheets = generateStylesheetObject(menuDividerRules, 'ui-menu__divider')

// Object.keys(menuStylesheet).forEach(key => {
//   Object.keys(menuStylesheet[key]).forEach(key1 => {
//     felaRenderer.renderRule(() => (menuStylesheet[key][key1]), felaParam)
//   })
// })

// Object.keys(menuItemStylesheet).forEach(key => {
//   Object.keys(menuItemStylesheet[key]).forEach(key1 => {
//     felaRenderer.renderRule(() => (menuItemStylesheet[key][key1]), felaParam)
//   })
// })

// Object.keys(menuDividerStylesheets).forEach(key => {
//   Object.keys(menuDividerStylesheets[key]).forEach(key1 => {
//     felaRenderer.renderRule(() => (menuDividerStylesheets[key][key1]), felaParam)
//   })
// })

/*
 * Style refactoring END
 */

const teamsTheme: ThemePrepared = createTheme(
  {
    siteVariables,
    componentVariables,
    componentStyles,
    fontFaces,
    staticStyles,
    icons,
    animations,
  },
  'teams',
)

export default teamsTheme
