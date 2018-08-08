export interface IClasses {
  [key: string]: string
}

/**
 * @param styles
 * @param props
 * @param variables
 * @param theme
 * @returns {{}}
 */
const getClasses = (
  renderer,
  props,
  styles,
  variables: any = () => {},
  theme: any = {},
): IClasses => {
  const { renderRule } = renderer
  const styleProps = {
    props,
    theme,
    variables: variables(theme.siteVariables),
    rtl: theme.rtl,
  }

  return Object.keys(styles).reduce((acc, styleName) => {
    acc[styleName] = renderRule(styles[styleName], styleProps)

    return acc
  }, {})
}

export default getClasses
