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

  test('default to false if no boolean was provided', () => {
    expect(mergeRTL(null, null)).toEqual(false)
    expect(mergeRTL(null, undefined)).toEqual(false)

    expect(mergeRTL(undefined, null)).toEqual(false)
    expect(mergeRTL(undefined, undefined)).toEqual(false)
  })
})
