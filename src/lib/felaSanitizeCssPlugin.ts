/**
 * Checks whether provided CSS property value is safe for being rendered by Fela engine.
 */
const isValidCssValue = (value: any) => {
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
    const processedStyles = {}

    Object.keys(styles).forEach(cssPropertyName => {
      const cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        processedStyles[cssPropertyName] = sanitizeCssStyleObject(cssPropertyValue)
        return
      }

      const isPropertyToSkip = cssPropertiesToSkip.some(
        propToExclude => propToExclude === cssPropertyName,
      )
      if (isPropertyToSkip || isValidCssValue(cssPropertyValue)) {
        processedStyles[cssPropertyName] = cssPropertyValue
      }
    })

    return processedStyles
  }

  return sanitizeCssStyleObject
}
