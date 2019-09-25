import { mergeSiteVariables } from '../../../../src/lib/mergeThemes'
import * as debug from 'src/lib/debug/debugApi'
import { withDebugId } from 'src/lib'

describe('mergeSiteVariables', () => {
  test(`always returns an object`, () => {
    expect(mergeSiteVariables({}, {})).toMatchObject({})
    expect(mergeSiteVariables(null, null)).toMatchObject({})
    expect(mergeSiteVariables(undefined, undefined)).toMatchObject({})

    expect(mergeSiteVariables(null, undefined)).toMatchObject({})
    expect(mergeSiteVariables(undefined, null)).toMatchObject({})

    expect(mergeSiteVariables({}, undefined)).toMatchObject({})
    expect(mergeSiteVariables(undefined, {})).toMatchObject({})

    expect(mergeSiteVariables({}, null)).toMatchObject({})
    expect(mergeSiteVariables(null, {})).toMatchObject({})
  })

  test('always adds fontSizes', () => {
    const target = {}
    const source = {}

    expect(mergeSiteVariables(target, source)).toMatchObject({ fontSizes: {} })
  })

  test('gracefully handles null and undefined', () => {
    expect(() => mergeSiteVariables({ color: 'black' }, null)).not.toThrow()
    expect(() => mergeSiteVariables({ color: 'black' }, { color: null })).not.toThrow()

    expect(() => mergeSiteVariables(null, { color: 'black' })).not.toThrow()
    expect(() => mergeSiteVariables({ color: null }, { color: 'black' })).not.toThrow()

    expect(() => mergeSiteVariables({ color: 'black' }, undefined)).not.toThrow()
    expect(() => mergeSiteVariables({ color: 'black' }, { color: undefined })).not.toThrow()

    expect(() => mergeSiteVariables(undefined, { color: 'black' })).not.toThrow()
    expect(() => mergeSiteVariables({ color: undefined }, { color: 'black' })).not.toThrow()
  })

  test('undefined overwrites previously set value', () => {
    const merged = mergeSiteVariables({ color: 'black' }, { color: undefined })

    expect(merged).toMatchObject({
      color: undefined,
    })
  })

  test('null overwrites previously set value', () => {
    const merged = mergeSiteVariables({ color: 'black' }, { color: null })

    expect(merged).toMatchObject({
      color: null,
    })
  })

  test('merges top level keys', () => {
    const target = { overridden: false, keep: true }
    const source = { overridden: true, add: true }

    expect(mergeSiteVariables(target, source)).toMatchObject({
      overridden: true,
      keep: true,
      add: true,
    })
  })

  test('deep merges nested keys', () => {
    const target = { nested: { replaced: false, deep: { dOne: 1 } } }
    const source = { nested: { other: 'value', deep: { dTwo: 'two' } } }

    expect(mergeSiteVariables(target, source)).toMatchObject({
      nested: { replaced: false, other: 'value', deep: { dOne: 1, dTwo: 'two' } },
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

    test('are saved if debug is enabled', () => {
      mockIsDebugEnabled(true)
      const target = { one: 1, a: 'tA' }
      const source = { two: 2, a: 'sA' }

      const merged = mergeSiteVariables(target, source)

      expect(merged).toMatchObject({
        _debug: [{ resolved: { one: 1, a: 'tA' } }, { resolved: { two: 2, a: 'sA' } }],
      })
    })

    test('are not saved if debug is disabled', () => {
      mockIsDebugEnabled(false)
      const target = { one: 1, a: 'tA' }
      const source = { two: 2, a: 'sA' }

      const merged = mergeSiteVariables(target, source)

      expect(merged._debug).toBe(undefined)
    })

    test('contain debugId', () => {
      mockIsDebugEnabled(true)
      const target = withDebugId({ one: 1, a: 'tA', target: true }, 'target')
      const source = withDebugId({ two: 2, a: 'sA', source: true }, 'source')

      const merged = mergeSiteVariables(target, source)
      expect(merged).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source' }],
      })
    })
  })
})
