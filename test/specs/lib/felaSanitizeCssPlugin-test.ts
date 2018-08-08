import sanitizeCss from 'src/lib/felaSanitizeCssPlugin'

const validStringStyle = {
  display: 'block',
  margin: '0 0 0 0',
}

const validNumericStyle = {
  top: 0,
}

const invalidCssValue = 'rgba('

const invalidCssStyle = {
  color: invalidCssValue,
}

const assertCssPropertyValue = (value: string, isValid: boolean) => {
  test(`assert that '${value}' is ${isValid ? 'valid' : 'invalid'}`, () => {
    const sanitize = sanitizeCss()

    const style = { display: value }
    const sanitizedStyle = sanitize(style)

    expect(sanitizedStyle).toEqual(isValid ? style : {})
  })
}

const sanitize = sanitizeCss()

describe('tests', () => {
  test('should ensure there are no non-closed brackets in CSS property value', () => {
    const style = {
      ...validStringStyle,
      ...invalidCssStyle,
    }

    expect(sanitize(style)).toEqual(validStringStyle)
  })

  test('should skip numeric CSS property values', () => {
    expect(sanitize(validNumericStyle)).toEqual(validNumericStyle)
  })

  test('should recursively process nested objects', () => {
    const style = {
      ...validStringStyle,
      '::before': {
        ...validStringStyle,
        ...invalidCssStyle,
      },
    }

    expect(sanitize(style)).toEqual({
      ...validStringStyle,
      '::before': {
        ...validStringStyle,
      },
    })
  })

  test('should skip excluded CSS props', () => {
    const cssPropertyToExclude = 'myProperty'

    const sanitize = sanitizeCss({
      skip: [cssPropertyToExclude],
    })

    const style = {
      validStringStyle,
      [cssPropertyToExclude]: invalidCssValue,
    }

    expect(sanitize(style)).toEqual(style)
  })

  describe('should properly filter invalid bracket sequences', () => {
    assertCssPropertyValue('rgba(', false)
    assertCssPropertyValue('rgba(0,0', false)
    assertCssPropertyValue('rgba(0,0}', false)

    assertCssPropertyValue(`url('../../lib')`, true)
  })
})
