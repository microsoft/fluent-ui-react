import deepmerge from 'src/lib/deepmerge'

describe('deepmerge', () => {
  test(`always returns an object`, () => {
    expect(deepmerge({}, {})).toEqual({})
    expect(deepmerge(null, null)).toEqual({})
    expect(deepmerge(undefined, undefined)).toEqual({})

    expect(deepmerge(null, undefined)).toEqual({})
    expect(deepmerge(undefined, null)).toEqual({})

    expect(deepmerge({}, undefined)).toEqual({})
    expect(deepmerge(undefined, {})).toEqual({})

    expect(deepmerge({}, null)).toEqual({})
    expect(deepmerge(null, {})).toEqual({})
  })

  test('undefined overwrites previous value', () => {
    const merged = deepmerge({ color: 'black' }, { color: undefined })
    expect(merged).toEqual({ color: undefined })
  })

  test('null overwrites previous value', () => {
    const merged = deepmerge({ color: 'black' }, { color: null })
    expect(merged).toEqual({ color: null })
  })

  test('merges top level keys', () => {
    const target = { overridden: false, keep: true }
    const source = { overridden: true, add: true }

    expect(deepmerge(target, source)).toMatchObject({
      overridden: true,
      keep: true,
      add: true,
    })
  })

  test('deep merges nested keys', () => {
    const target = { nested: { replaced: false, deep: { dOne: 1 } } }
    const source = { nested: { other: 'value', deep: { dTwo: 'two' } } }

    expect(deepmerge(target, source)).toMatchObject({
      nested: { replaced: false, other: 'value', deep: { dOne: 1, dTwo: 'two' } },
    })
  })

  test('array replaces an array', () => {
    const target = { overridden: [1, 2, 3] }
    const source = { overridden: [4, 5] }

    expect(deepmerge(target, source)).toMatchObject({
      overridden: [4, 5],
    })
  })
})
