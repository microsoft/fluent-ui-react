/**
 * To run:
 *  nodemon --watch 'src/themes/toCSS.ts' --exec 'ts-node src/themes/toCSS.ts'
 */
// import { cssifyObject } from 'css-in-js-utils'
import * as _ from 'lodash'
import { ThemePrepared } from '@stardust-ui/react/src'

export const fs = require('fs')
export const pkg = require('../../package.json')

// ============================================================
// Utilities
// ============================================================

// For a given base style and override style, returns only those
// properties in the override which update the base style.
// Duplicate or unnecessary properties are removed.
export const getOverrideStyles = (base = {}, override = {}) => {
  return Object.keys(base).reduce((acc, next) => {
    if (base[next] !== override[next]) {
      acc[next] = _.isPlainObject(base[next]) ? getOverrideStyles(base[next]) : base[next]
    }

    return acc
  }, {})
}

export const sortObject = unsorted => {
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
export const nameToSelector = (name: string) => `.ui-${_.kebabCase(name)}`

export const slotToSelector = (slot: string) => `__${_.kebabCase(slot)}`

export const propsToSelector = (props: object) => {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key]
    const kebabKey = _.kebabCase(key)

    const className = value === true ? kebabKey : `${kebabKey}-${_.kebabCase(value)}`

    return `.${className}`
  }, '')
}
export const makeSelector = (name: string, slot: string, props: object) => {
  return slot === 'root'
    ? nameToSelector(name) + propsToSelector(props)
    : nameToSelector(name) + slotToSelector(slot) + propsToSelector(props)
}

// ============================================================
// JS Style Objects
// ============================================================

export const jsStyleToCSSObject = (styleObject = {}) => {
  return Object.keys(styleObject).reduce((acc, key) => {
    const value = styleObject[key]
    const cssKey = /[A-Z]/.test(key) ? _.kebabCase(key) : key

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

export const cssObjectToString = (cssObject = {}) => {
  return (
    JSON.stringify(cssObject, null, 2)
      // remove double quotes
      .replace(/"/gm, '')
      // quote content properties
      .replace(/ content: (.*),/gm, ' content: "$1",')
      // remove colon before curly braces
      .replace(/: \{/gm, ' {')
      // remove commas
      .replace(/,$/gm, '')
      // add semis
      .replace(/([^{}])$/gm, '$1;')
      // remove empty rules
      .replace(/^.*\{\}\n/gm, '')
  )
}

export const jsStyleSheetToCSSString = (jsStyleObject = {}) => {
  return Object.keys(jsStyleObject)
    .reduce((cssFile, selector) => {
      const style = cssObjectToString(jsStyleToCSSObject(jsStyleObject[selector]))
      return [...cssFile, `${selector} ${style}`]
    }, [])
    .join('\n\n')
}

// ============================================================
// Stardust Theme Utils
// ============================================================

export const makeStyleArg = (name: string, props: object, theme: ThemePrepared) => {
  const SEE_FINDINGS_RADIO_GROUP_ITEM = {}

  return {
    rtl: false,
    disableAnimations: false,
    props: {
      isFromKeyboard: false, // see FINDINGS 3
      // ..._.get(stardust, `${name}.defaultProps`, {}), // see FINDINGS 1
      ...props,
    },
    variables: theme.componentVariables[name]
      ? theme.componentVariables[name](theme.siteVariables, SEE_FINDINGS_RADIO_GROUP_ITEM)
      : {},
    colors: {},
    theme,
  }
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

export function toSCSS(theme = {}, opts = {}) {
  // TODO: we should have a function to prepare an input theme
  const { componentStyles = {}, componentVariables = {}, siteVariables = {} } = theme as any
  const { name = '', version = '', gitHubURL = '', npmURL = '', docsURL = '' } = opts as any

  let result = [
    `/*`,
    ` * Name    : ${name}`,
    ` * Version : ${version}`,
    ` * GitHub  : ${gitHubURL}`,
    ` * NPM     : ${npmURL}`,
    ` * Docs    : ${docsURL}`,
    ` */`,
    '',
  ].join('\n')

  const componentNames = Object.keys(componentStyles)
  console.log('componentNames', componentNames)

  componentNames.forEach(name => {
    if (typeof componentStyles[name] !== 'function') {
      return console.log('Skipping old style signature:', name)
    }

    const headerLength = 40
    const paddingLength = Math.floor((headerLength - name.length) / 2)
    const padding = ' '.repeat(paddingLength)

    result += `\n/${'*'.repeat(headerLength - 1)}\n`
    result += `${padding}${name}${padding}\n`
    result += `${'*'.repeat(headerLength - 1)}/\n\n`

    const variables = componentVariables[name] ? componentVariables[name](siteVariables) : {}
    const styles = componentStyles[name](variables)
    const anatomy = Object.keys(styles)

    anatomy.forEach(slot => {
      styles[slot].forEach(([propsMatcher, styleObject]) => {
        const slotSelector = makeSelector(name, slot, propsMatcher)
        const slotStyle = cssObjectToString(jsStyleToCSSObject(styleObject))
        result += `${slotSelector}${slotStyle}\n`
      })
    })
  })

  return result
}

// const makeStyleSheet = spec => {
//   const [baseProps, ...restProps] = spec.definition
//
//   // TODO: make styles for all anatomy parts
//   // const anatomy = Object.keys(buttonStyles)
//
//   const baseStyle = themes.teams.componentStyles[COMPONENT_NAME].root(makeStyleArg(spec.name, { props: baseProps }))
//   const baseSelector = nameToSelector(spec.name) + propsToSelector(baseProps)
//
//   const styleSheet = { [baseSelector]: baseStyle }
//
//   return restProps.reduce((acc, props) => {
//     const style = themes.teams.componentStyles[COMPONENT_NAME].root(makeStyleArg(spec.name, { props }))
//     const selector = nameToSelector(spec.name) + propsToSelector(props)
//
//     acc[selector] = getOverrideStyles(style, baseStyle)
//
//     return acc
//   }, styleSheet)
// }
//
// const jsStyleSheet = makeStyleSheet(spec)
//
// console.log(_.mapValues(jsStyleSheet, (val, key) => cssifyObject(val)))

/*
============================================================

                         FINDINGS

============================================================

TODO
 - [ ] stardust.scss .ui-icon style is missing font-family value
 - [ ] stardust.scss .ui-layout style is missing grid-template-columns value

# 1. defaultProps
Many styles are dependant on defaultProp values.  Some styles break (statusStyles) when the default
props are not present.

Aside from breaking, there are some components where a default prop value is going to make sense. In
those cases, the default "style props" should likely be part of the base theme.  This way, when
calling the style functions, the correct "base" style is produced for the component.

If we leave defaultProps in each component, then styles have a hard dependency on components.

# 2. Prop Permutations
In order to generate styles for each type, state, and variation we need to have props objects
that describe each of these.  In order to invoke a style object code path, we need to pass the
correct props to the style function.

This has consequences and benefits.  It means we need to produce a _definition_ of each component.
This definition should codify the design terms available to a component.

In order to produce a stylesheet with the proper flow and optimizations, we need to know which order
these design terms are applied.  This way the base style is defined at the top of the sheet and more
detailed definitions are at the bottom.  This order also has to be shared and adopted, else, we
won't be able to reliably produce styles.

# 3. isFromKeyboard
https://github.com/stardust-ui/react/issues/749

There is no way to encode this in a flat stylesheet.  Even if we produce two flat styles, one with
keyboard focus and one without, we will have to decide on a selector to use in the stylesheet. This
means consumers will also have to use a similar utility and creating matching elements in order to
apply the style.

# 4. RadioGroupItem

The variables for this file require props to be provided.  This is the only file doing so.
Only styles should be dependant on runtime values, such as props.  Variables should be static.

# 5. dropdownSearchInputStyles
https://github.com/stardust-ui/react/issues/753

This style file has no root key.

# 6. inputStyles

The `root` key is applied to the `wrapper` slot in the render function.

# 7. attachmentStyles

Does not gracefully handle undefined props.progress in the "progress" slot styles for width.

# 8. Missing variables for menuDividerStyles and menuItemStyles

There are variables for the Menu itself, but not for the divider or item subcomponents.
*/
