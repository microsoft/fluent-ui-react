import mergeThemes from '../../../src/lib/mergeThemes'
import { felaRtlRenderer, felaRenderer } from '../../../src/lib'

describe('mergeThemes', () => {
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

      const siteVariables = { one: 'one', two: 'two' }

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

      const styleParam = {
        siteVariables: { brand: '#38E' },
        variables: { iconSize: 'large' },
        props: { primary: true },
        rtl: false,
      }

      expect(merged.componentStyles.Button.root(styleParam)).toMatchObject({
        source: true,
        target: true,
        ...styleParam,
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

    test('default to false if no boolean was provided', () => {
      expect(mergeThemes({ rtl: null }, { rtl: null })).toHaveProperty('rtl', false)
      expect(mergeThemes({ rtl: null }, { rtl: undefined })).toHaveProperty('rtl', false)

      expect(mergeThemes({ rtl: undefined }, { rtl: null })).toHaveProperty('rtl', false)
      expect(mergeThemes({ rtl: undefined }, { rtl: undefined })).toHaveProperty('rtl', false)
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
})
