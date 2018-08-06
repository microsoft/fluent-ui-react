export interface IClasses {
  [key: string]: string
}

/**
 * @param rules
 * @param props
 * @param variables
 * @param theme
 * @returns {{}}
 */
const getClasses = (
  renderer,
  props,
  rules,
  variables: any = () => {},
  theme: any = {},
): IClasses => {
  const { renderRule } = renderer
  const ruleProps = {
    props,
    theme,
    variables: variables(theme.siteVariables),
    rtl: theme.rtl,
  }

  return Object.keys(rules).reduce((acc, ruleName) => {
    acc[ruleName] = renderRule(rules[ruleName], ruleProps)

    return acc
  }, {})
}

export default getClasses
