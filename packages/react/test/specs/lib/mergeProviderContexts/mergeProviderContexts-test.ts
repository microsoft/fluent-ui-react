import mergeProviderContexts from 'src/lib/mergeProviderContexts'

describe('mergeContexts', () => {
  test(`always returns an object`, () => {
    expect(mergeProviderContexts({}, {})).toMatchObject({})
    expect(mergeProviderContexts(null, null)).toMatchObject({})
    expect(mergeProviderContexts(undefined, undefined)).toMatchObject({})

    expect(mergeProviderContexts(null, undefined)).toMatchObject({})
    expect(mergeProviderContexts(undefined, null)).toMatchObject({})

    expect(mergeProviderContexts({}, undefined)).toMatchObject({})
    expect(mergeProviderContexts(undefined, {})).toMatchObject({})

    expect(mergeProviderContexts({}, null)).toMatchObject({})
    expect(mergeProviderContexts(null, {})).toMatchObject({})
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
    expect(() => mergeProviderContexts(target, source)).not.toThrow()
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
    expect(() => mergeProviderContexts(target, source)).not.toThrow()
  })
})
