import deepmerge from 'src/lib/deepmerge'

describe('deepmerge', () => {
  test(`always returns an object`, () => {
    expect(deepmerge({}, {})).toStrictEqual({})
    expect(deepmerge(null, null)).toStrictEqual({})
    expect(deepmerge(undefined, undefined)).toStrictEqual({})

    expect(deepmerge(null, undefined)).toStrictEqual({})
    expect(deepmerge(undefined, null)).toStrictEqual({})

    expect(deepmerge({}, undefined)).toStrictEqual({})
    expect(deepmerge(undefined, {})).toStrictEqual({})

    expect(deepmerge({}, null)).toStrictEqual({})
    expect(deepmerge(null, {})).toStrictEqual({})
  })

  test('undefined overwrites previous value', () => {
    const merged = deepmerge({ color: 'black' }, { color: undefined })
    expect(merged).toStrictEqual({ color: undefined })
  })

  test('null overwrites previous value', () => {
    const merged = deepmerge({ color: 'black' }, { color: null })
    expect(merged).toStrictEqual({ color: null })
  })

  test('undefined gets overwritten  by next value', () => {
    const merged = deepmerge({ color: undefined }, { color: 'black' })
    expect(merged).toStrictEqual({ color: 'black' })
  })

  test('null gets overwritten  by next value', () => {
    const merged = deepmerge({ color: null }, { color: 'black' })
    expect(merged).toStrictEqual({ color: 'black' })
  })

  test('merges top level keys', () => {
    const target = { overridden: false, keep: true }
    const source = { overridden: true, add: true }

    expect(deepmerge(target, source)).toStrictEqual({
      overridden: true,
      keep: true,
      add: true,
    })
  })

  test('deep merges nested keys', () => {
    const target = {
      nested: {
        replaced: false,
        valueToValue: 'targetVTV',
        nullToValue: null,
        undefinedToValue: undefined,
        valueToNull: 'targetVTN',
        valueToUndefined: 'targetVTU',
        deep: {
          dOne: 1,
          deepValueToValue: 'targetDVTV',
          deepNullToValue: null,
          deepUndefinedToValue: undefined,
          deepValueToNull: 'targetDVTN',
          deepValueToUndefined: 'targetDVTU',
        },
      },
    }
    const source = {
      nested: {
        valueToValue: 'sourceVTV',
        nullToValue: 'sourceNTV',
        undefinedToValue: 'sourceUTV',
        valueToNull: null,
        valueToUndefined: undefined,
        other: 'value',
        deep: {
          dTwo: 'two',
          deepValueToValue: 'sourceDVTV',
          deepNullToValue: 'sourceDNTV',
          deepUndefinedToValue: 'sourceDUTV',
          deepValueToNull: null,
          deepValueToUndefined: undefined,
        },
      },
    }

    expect(deepmerge(target, source)).toStrictEqual({
      nested: {
        replaced: false,
        other: 'value',
        valueToValue: 'sourceVTV',
        nullToValue: 'sourceNTV',
        undefinedToValue: 'sourceUTV',
        valueToNull: null,
        valueToUndefined: undefined,
        deep: {
          dOne: 1,
          dTwo: 'two',
          deepValueToValue: 'sourceDVTV',
          deepNullToValue: 'sourceDNTV',
          deepUndefinedToValue: 'sourceDUTV',
          deepValueToNull: null,
          deepValueToUndefined: undefined,
        },
      },
    })
  })

  test('array replaces an array', () => {
    const target = { overridden: [1, 2, 3] }
    const source = { overridden: [4, 5] }

    expect(deepmerge(target, source)).toStrictEqual({
      overridden: [4, 5],
    })
  })
})
