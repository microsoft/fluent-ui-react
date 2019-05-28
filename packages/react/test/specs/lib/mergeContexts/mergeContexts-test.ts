import mergeContexts from 'src/lib/mergeContexts'
import { felaRenderer, felaRtlRenderer } from 'src/lib'

describe('mergeContexts', () => {
  test(`always returns an object`, () => {
    expect(mergeContexts({}, {})).toMatchObject({})
    expect(mergeContexts(null, null)).toMatchObject({})
    expect(mergeContexts(undefined, undefined)).toMatchObject({})

    expect(mergeContexts(null, undefined)).toMatchObject({})
    expect(mergeContexts(undefined, null)).toMatchObject({})

    expect(mergeContexts({}, undefined)).toMatchObject({})
    expect(mergeContexts(undefined, {})).toMatchObject({})

    expect(mergeContexts({}, null)).toMatchObject({})
    expect(mergeContexts(null, {})).toMatchObject({})
  })

  test('gracefully handles merging a theme in with undefined values', () => {
    const target = {
      theme: {
        siteVariables: { color: 'black' },
        componentVariables: { Button: { color: 'black' } },
        componentStyles: { Button: { root: { color: 'black' } } },
      },
      rtl: true,
      disableAnimations: false,
    }
    const source = {
      theme: undefined,
      rtl: undefined,
      disableAnimations: undefined,
    }
    expect(() => mergeContexts(target, source)).not.toThrow()
  })

  test('gracefully handles merging onto a theme with undefined values', () => {
    const target = {
      theme: undefined,
      rtl: undefined,
      disableAnimations: undefined,
    }
    const source = {
      theme: {
        siteVariables: { color: 'black' },
        componentVariables: { Button: { color: 'black' } },
        componentStyles: { Button: { root: { color: 'black' } } },
      },
      rtl: true,
      disableAnimations: false,
    }
    expect(() => mergeContexts(target, source)).not.toThrow()
  })

  describe('renderer', () => {
    test('felaRtlRenderer is chosen if rtl is true', () => {
      expect(mergeContexts({ rtl: true })).toHaveProperty('renderer', felaRtlRenderer)
    })
    test('felaRenderer is chosen if rtl is not true', () => {
      expect(mergeContexts({ rtl: false })).toHaveProperty('renderer', felaRenderer)
      expect(mergeContexts({ rtl: null })).toHaveProperty('renderer', felaRenderer)
      expect(mergeContexts({ rtl: undefined })).toHaveProperty('renderer', felaRenderer)
    })
  })
})
