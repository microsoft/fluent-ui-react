import { ICSSInJSStyle } from '@fluentui/styles'

import sanitizeCss from 'src/utils/felaSanitizeCssPlugin'

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
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache

    process.env = { ...OLD_ENV }
    process.env.NODE_ENV = 'production'
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

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
    const withSkip = sanitizeCss({
      skip: ['propertyWithInvalidValue'],
    })

    const style = {
      display: 'block',
      margin: '0 0 0 0',
      propertyWithInvalidValue: 'rgba(',
    }

    expect(withSkip(style)).toEqual(style)
  })

  describe('should properly filter invalid bracket sequences', () => {
    assertCssPropertyValue('rgba(', false)
    assertCssPropertyValue('rgba(0,0', false)
    assertCssPropertyValue('rgba(0,0}', false)

    assertCssPropertyValue(`url('../../utils')`, true)
  })

  describe('if array is passed', () => {
    test('should process the array without conversion to an object', () => {
      const style: ICSSInJSStyle = {
        color: ['red', 'blue'] as any,
        ':hover': { color: 'red' },
        display: 'block',
      }

      expect(sanitize(style)).toEqual(style)
    })

    test('should sanitize its items and remove invalid ones', () => {
      const style: ICSSInJSStyle = {
        color: ['red', 'blue', 'rgba('] as any,
        display: 'block',
      }
      expect(sanitize(style)).toEqual({
        color: ['red', 'blue'],
        display: 'block',
      })
    })
  })

  describe('env', () => {
    test('throws in "test" environment', () => {
      process.env.NODE_ENV = 'test'

      expect(() => sanitize({ backgroundImage: 'url(../../' })).toThrowError(
        /was passed to property/,
      )
    })

    test('warns in "development" environment', () => {
      const onWarn = jest.spyOn(console, 'warn').mockImplementation(() => {})
      process.env.NODE_ENV = 'development'

      sanitize({ backgroundImage: 'url(../../' })
      expect(onWarn).toBeCalledWith(expect.stringMatching(/was passed to property/))

      // We need to clean up mocks to avoid errors reported by React
      ;(console.warn as any).mockClear()
    })
  })
})
