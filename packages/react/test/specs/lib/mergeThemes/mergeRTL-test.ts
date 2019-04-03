import { mergeRTL } from '../../../../src/lib/mergeThemes'

describe('mergeRTL', () => {
  test('latest boolean value wins', () => {
    expect(mergeRTL(false, true)).toEqual(true)
    expect(mergeRTL(true, false)).toEqual(false)

    expect(mergeRTL(null, true)).toEqual(true)
    expect(mergeRTL(null, false)).toEqual(false)

    expect(mergeRTL(undefined, true)).toEqual(true)
    expect(mergeRTL(undefined, false)).toEqual(false)
  })

  test('null values do not override boolean values', () => {
    expect(mergeRTL(false, null)).toEqual(false)
    expect(mergeRTL(true, null)).toEqual(true)
  })

  test('undefined values do not override boolean values', () => {
    expect(mergeRTL(false, undefined)).toEqual(false)
    expect(mergeRTL(true, undefined)).toEqual(true)
  })

  test('first value wins if no boolean was provided', () => {
    // if a theme is created using mergeThemes() its rtl should remain `undefined` to be able to inherit it from parent Provider
    expect(mergeRTL(null, null)).toEqual(null)
    expect(mergeRTL(undefined, null)).toEqual(undefined)

    expect(mergeRTL(null, undefined)).toEqual(null)
    expect(mergeRTL(undefined, undefined)).toEqual(undefined)
  })
})
