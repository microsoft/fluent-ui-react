import * as _ from 'lodash'
/**
 * Checks whether provided CSS property value is safe for being rendered by Fela engine.
 */
const isValidCssValue = (value: any) => {
  if (value === null) {
    // FIXME: this does not belong here
    return false
  }

  if (typeof value !== 'string') {
    return true
  }

  const openingBrackets = '({['
  const closingBrackets = ')}]'

  const openingBracketsStack: string[] = []

  /**
   * This loop logic checks whether braces sequence of input argument is valid.
   * Essentially, it ensures that each of the '(', '{', '[' braces
   * - is properly matched by its complementary closing character
   * - closing brace properly corresponds to the last opened one
   */
  for (let i = 0; i < value.length; ++i) {
    const currentCharacter = value[i]
    if (openingBrackets.includes(currentCharacter)) {
      openingBracketsStack.push(currentCharacter)
    } else if (closingBrackets.includes(currentCharacter)) {
      const lastOpeningBracket = openingBracketsStack.pop()
      if (
        lastOpeningBracket &&
        openingBrackets.indexOf(lastOpeningBracket) !== closingBrackets.indexOf(currentCharacter)
      ) {
        return false
      }
    }
  }

  return openingBracketsStack.length === 0
}

export default (config?: { skip?: string[] }) => {
  const cssPropertiesToSkip = [...((config && config.skip) || [])]

  const sanitizeCssStyleObject = styles => {
    const processedStyles = Array.isArray(styles) ? [] : {}

    Object.keys(styles).forEach(cssPropertyNameOrIndex => {
      const cssPropertyValue = styles[cssPropertyNameOrIndex]

      if (_.isPlainObject(cssPropertyValue) || _.isArray(cssPropertyValue)) {
        processedStyles[cssPropertyNameOrIndex] = sanitizeCssStyleObject(cssPropertyValue)
        return
      }

      const isPropertyToSkip = cssPropertiesToSkip.some(
        propToExclude => propToExclude === cssPropertyNameOrIndex,
      )
      if (isPropertyToSkip || isValidCssValue(cssPropertyValue)) {
        processedStyles[cssPropertyNameOrIndex] = cssPropertyValue
      }
    })

    return processedStyles
  }

  return sanitizeCssStyleObject
}
