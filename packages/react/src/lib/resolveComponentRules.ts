import { ComponentSlotStylesInput, ICSSInJSStyle, SelectorStylesArg } from '../../src/themes/types'

export function isObject(item): boolean {
  return typeof item === 'object' && !Array.isArray(item) && item !== null
}

// fast object merge with assumptions
export function deepMergeObjects(target: object, source: object): object {
  Object.keys(source).forEach(key => {
    const value = source[key]

    if (isObject(value)) {
      if (!target[key]) target[key] = {}
      deepMergeObjects(target[key], value)
    } else {
      target[key] = value
    }
  })

  return target
}

const isMatch = (props, selector): boolean => {
  if (selector === null) return true

  return Object.keys(selector).every(k => props[k] === selector[k])
}

const reduceSelectorStyleTuples = (props, tuples: [object, ICSSInJSStyle][]): ICSSInJSStyle => {
  return tuples.reduce((acc, [selector, style]) => {
    return isMatch(props, selector) ? deepMergeObjects(acc, style) : acc
  }, {})
}

// Map reduces object values (array of tuples [selector, style])
const resolveComponentRules = (rules, props = {}): ICSSInJSStyle => {
  return Object.keys(rules).reduce((acc, next) => {
    acc[next] = reduceSelectorStyleTuples(props, rules[next])
    return acc
  }, {})
}

// TODO: temporary during migration to selector/style tuple styles
// Backports selector/style tuple styles to previous signature
export const backportComponentStyle = (selectorStyleFunc): ComponentSlotStylesInput => {
  if (typeof selectorStyleFunc !== 'function') {
    return selectorStyleFunc
  }

  // NOTE: this styled() wrapper, which guarantees safety for dry run, is only necessary for this scenario, to obtain this slots list.
  // After transition to selector styles finishes, it won't be necessary to have it wrapped.
  const resultWithoutArguments = selectorStyleFunc({
    variables: {},
    styled: () => ({}),
  } as SelectorStylesArg)

  return Object.keys(resultWithoutArguments).reduce((acc, part) => {
    acc[part] = ({ props, variables, styles }) => {
      return resolveComponentRules(
        selectorStyleFunc({
          variables,
          styled: applyStyles => applyStyles(styles),
        } as SelectorStylesArg),
        props,
      )[part]
    }
    return acc
  }, {})
}

export default resolveComponentRules
