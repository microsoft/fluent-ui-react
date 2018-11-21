import sanitizeCss from 'src/lib/felaSanitizeCssPlugin'

const assertCssPropertyValue = (value: string, isValid: boolean) => {
  test(`assert that '${value}' is ${isValid ? 'valid' : 'invalid'}`, () => {
    const sanitize = sanitizeCss()

    const style = { display: value }
    const sanitizedStyle = sanitize(style)

    expect(sanitizedStyle).toEqual(isValid ? style : {})
  })
}

const sanitize = sanitizeCss()

describe('felaSanitizeCssPlugin', () => {
  test('should ensure there are no non-closed brackets in CSS property value', () => {
    const style = {
      display: 'block',
      backgroundImage: 'url(../../',
    }

    expect(sanitize(style)).toEqual({ display: 'block' })
  })

  test('should skip numeric CSS property values', () => {
    expect(sanitize({ top: 0 })).toEqual({ top: 0 })
  })

  test('should recursively process nested objects', () => {
    const style = {
      display: 'inline',
      '::before': {
        color: 'rgba(',
      },
    }

    expect(sanitize(style)).toEqual({
      display: 'inline',
      '::before': {},
    })
  })

  test('should skip excluded CSS props', () => {
    const sanitize = sanitizeCss({
      skip: ['propertyWithInvalidValue'],
    })

    const style = {
      display: 'block',
      margin: '0 0 0 0',
      propertyWithInvalidValue: 'rgba(',
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
