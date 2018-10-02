import { mergeSiteVariables } from '../../../../src/lib/mergeThemes'

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

  test('merges top level keys', () => {
    const target = { overridden: false, keep: true }
    const source = { overridden: true, add: true }

    expect(mergeSiteVariables(target, source)).toMatchObject({
      overridden: true,
      keep: true,
      add: true,
    })
  })

  test('disregards nested keys', () => {
    const target = { nested: { replaced: true } }
    const source = { nested: { other: 'value' } }

    expect(mergeSiteVariables(target, source)).toMatchObject({ nested: { other: 'value' } })
  })
})
