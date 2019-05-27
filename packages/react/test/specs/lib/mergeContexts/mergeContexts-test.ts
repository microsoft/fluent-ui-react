import mergeContexts from 'src/lib/mergeContexts'

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
})
