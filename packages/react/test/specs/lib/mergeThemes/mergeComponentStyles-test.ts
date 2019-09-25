import { mergeComponentStyles } from '../../../../src/lib/mergeThemes'
import { ComponentStyleFunctionParam } from 'src/themes/types'
import * as debug from 'src/lib/debug/debugApi'
import { withDebugId } from 'src/lib'

describe('mergeComponentStyles', () => {
  test(`always returns an object`, () => {
    expect(mergeComponentStyles({}, {})).toMatchObject({})
    expect(mergeComponentStyles(null, null)).toMatchObject({})
    expect(mergeComponentStyles(undefined, undefined)).toMatchObject({})

    expect(mergeComponentStyles(null, undefined)).toMatchObject({})
    expect(mergeComponentStyles(undefined, null)).toMatchObject({})

    expect(mergeComponentStyles({}, undefined)).toMatchObject({})
    expect(mergeComponentStyles(undefined, {})).toMatchObject({})

    expect(mergeComponentStyles({}, null)).toMatchObject({})
    expect(mergeComponentStyles(null, {})).toMatchObject({})
  })

  test('gracefully handles null and undefined', () => {
    const styles = { root: { color: 'black' } }
    const stylesWithNull = { root: { color: null }, icon: null }
    const stylesWithUndefined = { root: { color: undefined }, icon: undefined }

    expect(() => mergeComponentStyles(styles, null)).not.toThrow()
    expect(() => mergeComponentStyles(styles, stylesWithNull)).not.toThrow()

    expect(() => mergeComponentStyles(null, styles)).not.toThrow()
    expect(() => mergeComponentStyles(stylesWithNull, styles)).not.toThrow()

    expect(() => mergeComponentStyles(styles, undefined)).not.toThrow()
    expect(() => mergeComponentStyles(styles, stylesWithUndefined)).not.toThrow()

    expect(() => mergeComponentStyles(undefined, styles)).not.toThrow()
    expect(() => mergeComponentStyles(stylesWithUndefined, styles)).not.toThrow()
  })

  test('component parts are merged', () => {
    const target = { root: {} }
    const source = { icon: {} }

    const merged = mergeComponentStyles(target, source)

    expect(merged).toHaveProperty('root')
    expect(merged).toHaveProperty('icon')
  })

  test('component part objects are converted to functions', () => {
    const target = { root: {} }
    const source = { root: {} }

    const merged = mergeComponentStyles(target, source)

    expect(merged.root).toBeInstanceOf(Function)
    expect(merged.root).toBeInstanceOf(Function)
  })

  test('component part styles are deeply merged', () => {
    const target = {
      root: {
        display: 'inline-block',
        color: 'green',
        '::before': {
          content: 'before content',
        },
      },
    }
    const source = {
      root: {
        color: 'blue',
        '::before': {
          color: 'red',
        },
      },
    }
    const merged = mergeComponentStyles(target, source)
    expect(merged.root()).toMatchObject({
      display: 'inline-block',
      color: 'blue',
      '::before': {
        content: 'before content',
        color: 'red',
      },
    })
  })

  test('functions can accept and apply params', () => {
    const target = { root: param => ({ target: true, ...param }) }
    const source = { root: param => ({ source: true, ...param }) }

    const merged = mergeComponentStyles(target, source)

    const styleParam: ComponentStyleFunctionParam = {
      variables: { iconSize: 'large' },
      props: { primary: true },
    } as any

    expect(merged.root(styleParam)).toMatchObject({
      source: true,
      target: true,
      ...styleParam,
    })
  })

  describe('debug frames', () => {
    let originalDebugEnabled

    beforeEach(() => {
      originalDebugEnabled = debug.isEnabled
    })

    afterEach(() => {
      Object.defineProperty(debug, 'isEnabled', {
        get: () => originalDebugEnabled,
      })
    })

    function mockIsDebugEnabled(enabled: boolean) {
      Object.defineProperty(debug, 'isEnabled', {
        get: jest.fn(() => enabled),
      })
    }

    test('are saved if debug enabled', () => {
      mockIsDebugEnabled(true)
      const target = { root: { a: 'tA', b: 'tB' } }
      const source = {
        root: ({ variables }) => ({ a: 'sA', c: { deep: variables.varC } }),
        icon: { d: 'sD' },
      }

      const merged = mergeComponentStyles(target, source)

      const resolvedRoot = merged.root({ variables: { varC: 'vC' } } as any)
      expect(resolvedRoot).toMatchObject({
        _debug: [{ styles: { a: 'tA', b: 'tB' } }, { styles: { a: 'sA', c: { deep: 'vC' } } }],
      })

      const resolvedIcon = merged.icon()
      expect(resolvedIcon).toMatchObject({
        _debug: [{ styles: { d: 'sD' } }],
      })
    })

    test('are not saved if debug disabled', () => {
      mockIsDebugEnabled(false)
      const target = { root: { a: 'tA', b: 'tB' } }
      const source = { root: { a: 'sA', c: { deep: 'c' } } }

      const merged = mergeComponentStyles(target, source)

      const resolvedRoot = merged.root()
      expect(resolvedRoot._debug).toBe(undefined)
    })

    test('contain debugId', () => {
      mockIsDebugEnabled(true)
      const target = withDebugId({ root: { a: 'tA', b: 'tB' } }, 'target')
      const source = withDebugId({ root: { a: 'sA', c: { deep: 'c' } } }, 'source')

      const merged = mergeComponentStyles(target, source)
      const resolvedRoot = merged.root()
      expect(resolvedRoot).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source' }],
      })
    })

    test('are flat for recursive merge', () => {
      mockIsDebugEnabled(true)
      const target = withDebugId(
        {
          root: {
            a: 'tA',
          },
        },
        'target',
      )
      const source1 = withDebugId(
        {
          root: {
            a: 'tB',
          },
        },
        'source1',
      )
      const source2 = withDebugId(
        {
          root: {
            a: 'tC',
          },
        },
        'source2',
      )

      const merged1 = mergeComponentStyles(target, source1, source2)
      const resolvedRoot1 = merged1.root()
      expect(resolvedRoot1).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source1' }, { debugId: 'source2' }],
      })

      const merged2 = mergeComponentStyles(mergeComponentStyles(target, source1), source2)
      const resolvedRoot2 = merged2.root()
      expect(resolvedRoot2).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source1' }, { debugId: 'source2' }],
      })

      const merged3 = mergeComponentStyles(target, mergeComponentStyles(source1, source2))
      const resolvedRoot3 = merged3.root()
      expect(resolvedRoot3).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source1' }, { debugId: 'source2' }],
      })
    })
  })
})
