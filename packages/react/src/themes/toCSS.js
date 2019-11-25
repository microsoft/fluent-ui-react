/**
 * To run:
 *   - yarn build
 *   - nodemon --watch './packages/react/src/themes/toCSS.js' ./packages/react/src/themes/toCSS.js
 */
/* tslint:disable */
// @ts-ignore-start
// import { cssifyObject } from 'css-in-js-utils'
const _ = require('lodash')

const stardust = require('../../dist/commonjs')
const themes = require('../../dist/commonjs/themes')

const felaPluginRtl = require('fela-plugin-rtl').default

const fs = require('fs')
const pkg = require('../../package.json')

console.clear()
console.log('='.repeat(80))

// const COMPONENT_NAME = 'Button'

// ============================================================
// Utilities
// ============================================================

// For a given base style and override style, returns only those
// properties in the override which update the base style.
// Duplicate or unnecessary properties are removed.
const getOverrideStyles = (base = {}, override = {}) => {
  return Object.keys(base).reduce((acc, next) => {
    if (base[next] !== override[next]) {
      acc[next] = _.isPlainObject(base[next]) ? getOverrideStyles(base[next]) : base[next]
    }

    return acc
  }, {})
}

const sortObject = unsorted => {
  return Object.keys(unsorted)
    .sort()
    .reduce((sorted, key) => {
      const value = unsorted[key]
      sorted[key] = _.isPlainObject(value) ? sortObject(value) : value
      return sorted
    }, {})
}

// ============================================================
// Selectors
// ============================================================
const componentNameToSelector = name => `.ui-${_.kebabCase(name)}`

const themeNameToSelector = themeName => `.${_.kebabCase(themeName)}`

const slotToSelector = slot => `__${_.kebabCase(slot)}`

const propsToSelector = (props = {}) => {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key]
    const kebabKey = _.kebabCase(key)

    const className = value === true ? kebabKey : `${kebabKey}-${_.kebabCase(value)}`

    return `.${className}`
  }, '')
}

const makeSelector = (themeName, componentName, slot, props) => {
  if (slot === 'root') {
    return (
      themeNameToSelector(themeName) +
      componentNameToSelector(componentName) +
      propsToSelector(props)
    )
  }

  return (
    themeNameToSelector(themeName) +
    componentNameToSelector(componentName) +
    slotToSelector(slot) +
    propsToSelector(props)
  )
}

// ============================================================
// JS Style Objects
// ============================================================

const jsStyleToCSSObject = (styleObject = {}) => {
  return Object.keys(styleObject).reduce((acc, key) => {
    const value = styleObject[key]
    let cssKey = /[A-Z]/.test(key) ? _.kebabCase(key) : key

    if (cssKey.startsWith('::')) {
      cssKey = `&` + cssKey
    }

    acc[cssKey] = _.isPlainObject(value) ? jsStyleToCSSObject(value) : value

    return acc
  }, {})
}
/**
 * IN {
 *   '.button': {
 *     color: 'blue',
 *     '&:hover': { color: 'red' }
 *     '.icon': { color: 'inherit' }
 *   }
 * }
 * OUT {
 *   '.button': { color: 'blue' }
 *   '.button:hover': { color: 'red' }
 *   '.button .icon': { color: 'inherit' }
 * }
 */
// const flattenJSStyleSheet = styleSheet => {
//   const flattened = {}
//   const selectors = []
//
//   // TODO: naive, doesn't handle element selectors
//   const isSelector = str => /^[^a-zA-Z]/.test(str.trim())
//
//   // ensures proper spacing between selectors
//   // supports '&' for root selector
//   const joinSelectors = selectors => {
//     return selectors
//       .reduce((acc, next, i) => {
//         const maybeSpace = i > 0 && /^[^&]/.test(next) ? ' ' : ''
//         acc += maybeSpace + next
//         return acc
//       }, '')
//       .replace(/&/g, '')
//   }
//
//   const flattenStyle = style => {
//     Object.keys(style).forEach(key => {
//       if (isSelector(key)) {
//         selectors.push(key)
//         flattenStyle(_.get(styleSheet, selectors))
//       } else {
//         _.set(flattened, [joinSelectors(selectors), key], style[key])
//       }
//     })
//     // once we've finished iterating this style object
//     // we're no longer under the current selector
//     selectors.pop()
//   }
//
//   flattenStyle(styleSheet)
//
//   return flattened
// }

// ============================================================
// CSS String
// ============================================================

const cssObjectToString = (cssObject = {}) => {
  return (
    JSON.stringify(cssObject, null, 2)
      // remove escaping backslashes
      .replace(/\\/gm, '')
      // remove commas
      .replace(/,$/gm, '')
      // remove double quotes
      .replace(/"/gm, '')
      // quote content properties
      .replace(/ content: (.*)/gm, ' content: "$1"')
      // quote url() strings
      .replace(/url\((.*)\)/gm, 'url("$1")')
      // remove colon before curly braces
      .replace(/: \{/gm, ' {')
      // add semis
      .replace(/([^{}])$/gm, '$1;')
      // remove empty rules
      .replace(/^.*\{\}\n/gm, '')
  )
}

const jsStyleSheetToCSSString = (jsStyleObject = {}) => {
  return Object.keys(jsStyleObject)
    .reduce((cssFile, selector) => {
      const style = cssObjectToString(jsStyleToCSSObject(jsStyleObject[selector]))
      return [...cssFile, `${selector} ${style}`]
    }, [])
    .join('\n\n')
}

// ============================================================
// Fluent UI Theme Utils
// ============================================================

const makeStyleArg = (name, props, theme) => {
  return {
    displayName: name,
    props: {
      ..._.get(stardust, `${name}.defaultProps`, {}), // see FINDINGS 1
      ..._.get(stardust, `${name}.prototype.getInitialAutoControlledState`, {}), // see FINDINGS 1
      ...props,
    },
    variables: theme.componentVariables[name]
      ? theme.componentVariables[name](theme.siteVariables)
      : {},
    theme,
    rtl: false,
    disableAnimations: false,
  }
}

const processStyleObj = style => {
  const type = null
  const renderer = null
  const props = { theme: { direction: 'ltr' } }

  return felaPluginRtl()(style, type, renderer, props)
}

// const spec = {
//   name: COMPONENT_NAME,
//   definition: [
//     // ----------------------------------------
//     // Base
//     // ----------------------------------------
//     {},
//
//     // ----------------------------------------
//     // Types
//     // ----------------------------------------
//     { primary: true },
//     { secondary: true },
//
//     // icon
//     // { iconOnly: true },
//     // { iconPosition: 'before' },
//     // { iconPosition: 'after' },
//
//     // ----------------------------------------
//     // States
//     // ----------------------------------------
//     // { active: true },
//     { disabled: true },
//     // { focus: true },
//
//     // ----------------------------------------
//     // Variations
//     // ----------------------------------------
//     // { circular: true },
//     // { fluid: true },
//     { text: true },
//   ],
// }

// ======================================================================
//                               USAGE
// ======================================================================

const propEnumerations = {
  Button: [
    {},
    // .ui-button.icon-only
    // <Button iconOnly icon='user' />

    { content: true },
    { content: false },

    { iconOnly: true },
    { icon: false },

    { icon: true, content: true },
    { icon: true, content: false },

    { icon: false, content: true },
    { icon: false, content: false },
  ],

  // TODO: how?...
  Layout: [
    // no gap
    { start: true },
    { main: true },
    { end: true },

    { start: true, main: true },
    { start: true, end: true },

    { main: true, end: true },
  ],
}

const writeTheme = (filename, themeName, theme) => {
  console.log('###', filename, '###############################')

  const absFilename = `${__dirname}/${filename}.less`

  fs.writeFileSync(
    absFilename,
    [
      `/*`,
      ` * Name    : ${pkg.name}`,
      ` * Version : ${pkg.version}`,
      ` * Theme   : ${absFilename}`,
      ` */`,

      // TODO: static styles should be computed from theme, they are pasted here for testing...

      // normalizeCSS
      themes.teams.staticStyles[0],

      // globalStyles
      `
    body {
      padding: 0;
      margin: 0;
      font-family: "Segoe UI", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4286;
    }
    * {
      box-sizing: border-box;
    }
    *:before {
      box-sizing: border-box;
    }
    *:after {
      box-sizing: border-box;
    }
  `,
    ].join('\n'),
  )

  // TODO: all components...
  Object.keys(theme.componentStyles).forEach(componentName => {
    console.log(componentName)

    // TODO: permutate props for component styles
    const props = propEnumerations[componentName] || [{}]
    const anatomy = Object.keys(theme.componentStyles[componentName])
    const componentStyle = {}

    anatomy.forEach(slot => {
      console.log('  ', slot)
      props.forEach(propObj => {
        console.log('      ', propObj)
        const slotSelector = makeSelector(themeName, componentName, slot, propObj)
        const slotStyleArg = makeStyleArg(componentName, propObj, theme)
        // some styles return undefined, see FINDINGS 10
        const slotStyle = theme.componentStyles[componentName][slot](slotStyleArg) || {}
        const processedSlotStyle = processStyleObj(slotStyle)

        componentStyle[slotSelector] = processedSlotStyle
      })
    })

    let lessString = ''

    const headerLength = 40
    const paddingLength = Math.floor((headerLength - componentName.length) / 2)
    const padding = ' '.repeat(paddingLength)
    lessString += '\n/' + '*'.repeat(headerLength - 1) + '\n'
    lessString += `${padding}${componentName}${padding}` + '\n'
    lessString += '*'.repeat(headerLength - 1) + '/' + '\n\n'
    lessString += jsStyleSheetToCSSString(componentStyle) + '\n'

    fs.appendFileSync(absFilename, lessString)
  })
}

writeTheme('teams', 'teams', themes.teams)
writeTheme('teams-dark', 'teams-dark', themes.teamsDark)
writeTheme('teams-high-contrast', 'teams-high-contrast', themes.teamsHighContrast)

/*
============================================================

                         FINDINGS

============================================================

TODO
 - [ :( ] stardust.scss .ui-icon style is missing font-family value
    - no longer have font based icon styles to test, do this
 - [ ] stardust.scss .ui-layout style is missing grid-template-columns value
 - [ ] document use of util components, render method cleanliness/conformance
 - [ ] render static styles as globals at top of file (normalize, statics font/animations, etc)

# 1. defaultProps & getInitialAutoControlledState
CONCLUSION: Make styles depend on React components to get initial values.  Not idea, but can be abstracted/fixed later.

Many styles are dependant on initial prop/state values.  Some styles break (statusStyles, alertStyles, etc)
when the initial values are not present.

Aside from breaking, there are some components where a default prop value is going to make sense. In
those cases, the default "style props" should likely be part of the base theme.  This way, when
calling the style functions, the correct "base" style is produced for the component.

If we leave defaultProps in each component, then styles have a hard dependency on components.

# 2. Prop Permutations
CONCLUSION: Fact of life, this has to exist somewhere and be maintained in parity with any other style fns.

In order to generate styles for each type, state, and variation we need to have props objects
that describe each of these.  In order to invoke a style object code path, we need to pass the
correct props to the style function.

This has consequences and benefits.  It means we need to produce a _definition_ of each component.
This definition should codify the design terms available to a component.

In order to produce a stylesheet with the proper flow and optimizations, we need to know which order
these design terms are applied.  This way the base style is defined at the top of the sheet and more
detailed definitions are at the bottom.  This order also has to be shared and adopted, else, we
won't be able to reliably produce styles.

# 3. isFromKeyboard (RESOLVED)

# 4. RadioGroupItem (RESOLVED)

# 5. dropdownSearchInputStyles
CONCLUSION: solve at the component API philosophy level, not the theme algorithm.
https://github.com/stardust-ui/react/issues/753

This style file has no root key.

# 6. inputStyles
CONCLUSION: solve at the component API philosophy level, not the theme algorithm.

The `root` key is applied to the `wrapper` slot in the render function.

# 7. attachmentStyles
CONCLUSION: This is an anti-pattern.  Runtime values should not be passed directly to style values: "width: `${p.progress}%`".
Rapidly changing properties with many values (like progress width) should be applied inline for performance reasons.

Does not gracefully handle undefined props.progress in the "progress" slot styles for width.

# 8. Missing variables for menuDividerStyles and menuItemStyles

There are variables for the Menu itself, but not for the divider or item subcomponents.

CONCLUSION: If there is a style function, there must be a variables fn.

9. Slots vs Components
There is no way to tell if top level component name keys in the componentStyles are "ui components" vs "component slots".
Example, how to differentiate a Menu from a MenuItem if BEM selectors are to be generated.

10. Styles returning non-objects (undefined)
Some styles, like Label's icon slot, are completely conditional and may return undefined.
Styles should always return objects. Update typings to ensure this.
*/
