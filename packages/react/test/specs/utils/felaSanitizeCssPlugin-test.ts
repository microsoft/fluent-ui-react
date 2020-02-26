import { RendererParam } from '@fluentui/react-bindings'
import { ICSSInJSStyle } from '@fluentui/styles'

import felaSanitizeCss from 'src/utils/felaSanitizeCssPlugin'
import { consoleUtil } from 'test/utils'

const sanitize = (
  styles: ICSSInJSStyle,
  options: { sanitizeCss?: boolean; skip?: string[] } = {},
): ICSSInJSStyle => {
  const { sanitizeCss = true, skip = [] } = options

  const felaParam: RendererParam = {
    displayName: 'Test',
    disableAnimations: false,
    theme: {} as any,
    sanitizeCss,
  }
  const renderer = (() => {}) as any

  return felaSanitizeCss({ skip })(styles, 'RULE', renderer, felaParam)
}

const assertCssPropertyValue = (value: string, isValid: boolean) => {
  test(`assert that '${value}' is ${isValid ? 'valid' : 'invalid'}`, () => {
    const style = { display: value }
    const sanitizedStyle = sanitize(style)

    expect(sanitizedStyle).toEqual(isValid ? style : {})
  })
}

describe('felaSanitizeCssPlugin', () => {
  beforeEach(() => {
    consoleUtil.disable()
  })

  afterEach(() => {
    consoleUtil.enable()
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
    const style = {
      display: 'block',
      margin: '0 0 0 0',
      propertyWithInvalidValue: 'rgba(',
    }

    expect(sanitize(style, { skip: ['propertyWithInvalidValue'] })).toEqual(style)
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

  test('warns if is disabled', () => {
    const onWarn = jest.spyOn(console, 'warn').mockImplementation(() => {})

    sanitize({ backgroundImage: 'url(../../' })
    expect(onWarn).toBeCalledWith(expect.stringMatching(/was passed to property/))
  })
})
