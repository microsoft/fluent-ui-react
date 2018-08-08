const isValidCssValue = (value: any) => {
  if (typeof value !== 'string') {
    return true
  }

  const openingBrackets = '({['
  const closingBrackets = ')}]'

  const openingBracketsStack = []

  for (let i = 0; i < value.length; ++i) {
    const currentCharacter = value[i]
    if (openingBrackets.includes(currentCharacter)) {
      openingBracketsStack.push(currentCharacter)
    } else if (closingBrackets.includes(currentCharacter)) {
      const lastOpeningBracket = openingBracketsStack.pop()
      if (
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
