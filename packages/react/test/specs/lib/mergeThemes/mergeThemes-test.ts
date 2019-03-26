import mergeThemes, { mergeStyles } from 'src/lib/mergeThemes'
import { felaRenderer, felaRtlRenderer } from 'src/lib'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from 'src/themes/types'

describe('mergeThemes', () => {
  test(`always returns an object`, () => {
    expect(mergeThemes({}, {})).toMatchObject({})
    expect(mergeThemes(null, null)).toMatchObject({})
    expect(mergeThemes(undefined, undefined)).toMatchObject({})

    expect(mergeThemes(null, undefined)).toMatchObject({})
    expect(mergeThemes(undefined, null)).toMatchObject({})

    expect(mergeThemes({}, undefined)).toMatchObject({})
    expect(mergeThemes(undefined, {})).toMatchObject({})

    expect(mergeThemes({}, null)).toMatchObject({})
    expect(mergeThemes(null, {})).toMatchObject({})
  })

  test('gracefully handles merging a theme in with undefined values', () => {
    const target = {
      siteVariables: { color: 'black' },
      componentVariables: { Button: { color: 'black' } },
      componentStyles: { Button: { root: { color: 'black' } } },
      rtl: true,
    }
    const source = {
      siteVariables: undefined,
      componentVariables: undefined,
      componentStyles: undefined,
      rtl: undefined,
    }
    expect(() => mergeThemes(target, source)).not.toThrow()
  })

  test('gracefully handles merging onto a theme with undefined values', () => {
    const target = {
      siteVariables: undefined,
      componentVariables: undefined,
      componentStyles: undefined,
      rtl: undefined,
    }
    const source = {
      siteVariables: { color: 'black' },
      componentVariables: { Button: { color: 'black' } },
      componentStyles: { Button: { root: { color: 'black' } } },
      rtl: true,
    }
    expect(() => mergeThemes(target, source)).not.toThrow()
  })

  describe('siteVariables', () => {
    test('merges top level keys', () => {
      const target = { siteVariables: { overridden: false, keep: true } }
      const source = { siteVariables: { overridden: true, add: true } }

      expect(mergeThemes(target, source)).toMatchObject({
        siteVariables: { overridden: true, keep: true, add: true },
      })
    })

    test('disregards nested keys', () => {
      const target = { siteVariables: { nested: { replaced: true } } }
      const source = { siteVariables: { nested: { other: 'value' } } }

      expect(mergeThemes(target, source)).toMatchObject({
        siteVariables: { nested: { other: 'value' } },
      })
    })
  })

  describe('componentVariables', () => {
    test('component names are merged', () => {
      const target = { componentVariables: { Button: {} } }
      const source = { componentVariables: { Icon: {} } }

      const merged = mergeThemes(target, source)

      expect(merged.componentVariables).toHaveProperty('Button')
      expect(merged.componentVariables).toHaveProperty('Icon')
    })

    test('objects are converted to functions', () => {
      const target = { componentVariables: { Button: { color: 'red' } } }
      const source = { componentVariables: { Icon: { color: 'blue' } } }

      const merged = mergeThemes(target, source)

      expect(merged.componentVariables.Button).toBeInstanceOf(Function)
      expect(merged.componentVariables.Icon).toBeInstanceOf(Function)
    })

    test('functions return merged variables', () => {
      const target = { componentVariables: { Button: () => ({ one: 1, three: 3 }) } }
      const source = {
        componentVariables: { Button: () => ({ one: 'one', two: 'two' }) },
      }

      const merged = mergeThemes(target, source)

      expect(merged.componentVariables.Button()).toMatchObject({
        one: 'one',
        two: 'two',
        three: 3,
      })
    })

    test('functions accept and apply siteVariables', () => {
      const target = {
        componentVariables: {
          Button: siteVariables => ({ one: 1, target: true, ...siteVariables }),
        },
      }

      const source = {
        componentVariables: {
          Button: siteVariables => ({ two: 2, source: true, ...siteVariables }),
        },
      }

      const merged = mergeThemes(target, source)

      const siteVariables = { one: 'one', two: 'two', fontSizes: {} }

      expect(merged.componentVariables.Button(siteVariables)).toMatchObject({
        one: 'one',
        two: 'two',
        source: true,
        target: true,
      })
    })
  })

  describe('componentStyles', () => {
    test('component names are merged', () => {
      const target = { componentStyles: { Button: {} } }
      const source = { componentStyles: { Icon: {} } }

      const merged = mergeThemes(target, source)

      expect(merged.componentStyles).toHaveProperty('Button')
      expect(merged.componentStyles).toHaveProperty('Icon')
    })

    test('component parts are merged', () => {
      const target = { componentStyles: { Button: { root: {} } } }
      const source = { componentStyles: { Button: { icon: {} } } }

      const merged = mergeThemes(target, source)

      expect(merged.componentStyles.Button).toHaveProperty('root')
      expect(merged.componentStyles.Button).toHaveProperty('icon')
    })

    test('component part objects are converted to functions', () => {
      const target = { componentStyles: { Button: { root: {} } } }
      const source = { componentStyles: { Icon: { root: {} } } }

      const merged = mergeThemes(target, source)

      expect(merged.componentStyles.Button.root).toBeInstanceOf(Function)
      expect(merged.componentStyles.Icon.root).toBeInstanceOf(Function)
    })

    test('component part styles are deeply merged', () => {
      const target = {
        componentStyles: {
          Button: {
            root: {
              display: 'inline-block',
              color: 'green',
              '::before': {
                content: 'before content',
              },
            },
          },
        },
      }

      const source = {
        componentStyles: {
          Button: {
            root: {
              color: 'blue',
              '::before': {
                color: 'red',
              },
            },
          },
        },
      }

      const merged = mergeThemes(target, source)

      expect(merged.componentStyles.Button.root()).toMatchObject({
        display: 'inline-block',
        color: 'blue',
        '::before': {
          content: 'before content',
          color: 'red',
        },
      })
    })

    test('functions can accept and apply params', () => {
      const target = {
        componentStyles: {
          Button: {
            root: param => ({ target: true, ...param }),
          },
        },
      }

      const source = {
        componentStyles: {
          Button: {
            root: param => ({ source: true, ...param }),
          },
        },
      }

      const merged = mergeThemes(target, source)

      const styleParam: ComponentStyleFunctionParam = {
        variables: { iconSize: 'large' },
        props: { primary: true },
      } as any

      expect(merged.componentStyles.Button.root(styleParam)).toMatchObject({
        source: true,
        target: true,
        ...styleParam,
      })
    })
  })

  describe('font faces', () => {
    test('returns a compact array', () => {
      expect(
        mergeThemes(
          { fontFaces: null },
          { fontFaces: undefined },
          {
            fontFaces: [
              {
                name: 'Segoe UI',
                paths: ['public/fonts/segoe-ui-regular.woff2'],
                style: { fontWeight: 400 },
              },
            ],
          },
          {
            fontFaces: [
              {
                name: 'Segoe UI',
                paths: ['public/fonts/segoe-ui-semibold.woff2'],
                style: { fontWeight: 600 },
              },
            ],
          },
          {
            fontFaces: [
              {
                name: 'Segoe UI',
                paths: ['public/fonts/segoe-ui-bold.woff2'],
                style: { fontWeight: 700 },
              },
            ],
          },
        ),
      ).toMatchObject({
        fontFaces: [
          {
            name: 'Segoe UI',
            paths: ['public/fonts/segoe-ui-regular.woff2'],
            style: { fontWeight: 400 },
          },
          {
            name: 'Segoe UI',
            paths: ['public/fonts/segoe-ui-semibold.woff2'],
            style: { fontWeight: 600 },
          },
          {
            name: 'Segoe UI',
            paths: ['public/fonts/segoe-ui-bold.woff2'],
            style: { fontWeight: 700 },
          },
        ],
      })
    })
  })

  describe('static styles', () => {
    test('returns a compact array', () => {
      expect(
        mergeThemes(
          { staticStyles: null },
          { staticStyles: undefined },
          { staticStyles: [''] },
          { staticStyles: [{ body: { color: 'red' } }] },
          { staticStyles: ['*{box-sizing:border-box;}'] },
        ),
      ).toMatchObject({
        staticStyles: [{ body: { color: 'red' } }, '*{box-sizing:border-box;}'],
      })
    })
  })

  describe('rtl', () => {
    test('latest boolean value wins', () => {
      expect(mergeThemes({ rtl: false }, { rtl: true })).toHaveProperty('rtl', true)
      expect(mergeThemes({ rtl: true }, { rtl: false })).toHaveProperty('rtl', false)

      expect(mergeThemes({ rtl: null }, { rtl: true })).toHaveProperty('rtl', true)
      expect(mergeThemes({ rtl: null }, { rtl: false })).toHaveProperty('rtl', false)

      expect(mergeThemes({ rtl: undefined }, { rtl: true })).toHaveProperty('rtl', true)
      expect(mergeThemes({ rtl: undefined }, { rtl: false })).toHaveProperty('rtl', false)
    })

    test('null values do not override boolean values', () => {
      expect(mergeThemes({ rtl: false }, { rtl: null })).toHaveProperty('rtl', false)
      expect(mergeThemes({ rtl: true }, { rtl: null })).toHaveProperty('rtl', true)
    })

    test('undefined values do not override boolean values', () => {
      expect(mergeThemes({ rtl: false }, { rtl: undefined })).toHaveProperty('rtl', false)
      expect(mergeThemes({ rtl: true }, { rtl: undefined })).toHaveProperty('rtl', true)
    })

    test('is NOT set if no boolean was provided', () => {
      expect(mergeThemes({ rtl: null }, { rtl: null })).not.toHaveProperty('rtl')
      expect(mergeThemes({ rtl: null }, { rtl: undefined })).not.toHaveProperty('rtl')

      expect(mergeThemes({ rtl: undefined }, { rtl: null })).not.toHaveProperty('rtl')
      expect(mergeThemes({ rtl: undefined }, { rtl: undefined })).not.toHaveProperty('rtl')
    })
  })

  describe('renderer', () => {
    test('felaRtlRenderer is chosen if rtl is true', () => {
      expect(mergeThemes({ rtl: true })).toHaveProperty('renderer', felaRtlRenderer)
    })
    test('felaRenderer is chosen if rtl is not true', () => {
      expect(mergeThemes({ rtl: false })).toHaveProperty('renderer', felaRenderer)
      expect(mergeThemes({ rtl: null })).toHaveProperty('renderer', felaRenderer)
      expect(mergeThemes({ rtl: undefined })).toHaveProperty('renderer', felaRenderer)
    })
  })

  describe('styles', () => {
    test('merges styles object and function', () => {
      const stylesAsObject: ICSSInJSStyle = {
        margin: '0px',
        color: 'override',
        ':hover': {
          margin: '0px',
          color: 'override',
        },
      }

      const stylesAsFunction = () => ({
        color: 'black',
        ':hover': {
          color: 'blue',
        },
      })

      expect(mergeStyles(stylesAsObject, stylesAsFunction)()).toMatchObject({
        margin: '0px',
        color: 'black',
        ':hover': {
          margin: '0px',
          color: 'blue',
        },
      })
    })

    test('merges styles function and object', () => {
      const stylesAsFunction = () => ({
        margin: '0px',
        color: 'override',
        ':hover': {
          margin: '0px',
          color: 'override',
        },
      })

      const stylesAsObject = {
        color: 'black',
        ':hover': {
          color: 'blue',
        },
      }

      expect(mergeStyles(stylesAsFunction, stylesAsObject)()).toMatchObject({
        margin: '0px',
        color: 'black',
        ':hover': {
          margin: '0px',
          color: 'blue',
        },
      })
    })
  })
})
