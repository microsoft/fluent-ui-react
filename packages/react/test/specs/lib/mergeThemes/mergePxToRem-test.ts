import { mergePxToRem } from '../../../../src/lib/mergeThemes'

describe('mergePxToRem', () => {
  const pxToRem10 = pixels => `${pixels} / 10`
  const pxToRem16 = pixels => `${pixels} / 16`

  test('latest boolean value wins', () => {
    expect(mergePxToRem(pxToRem16, pxToRem10)).toEqual(pxToRem10)
    expect(mergePxToRem(pxToRem10, pxToRem16)).toEqual(pxToRem16)

    expect(mergePxToRem(null, pxToRem10)).toEqual(pxToRem10)
    expect(mergePxToRem(null, pxToRem16)).toEqual(pxToRem16)

    expect(mergePxToRem(undefined, pxToRem10)).toEqual(pxToRem10)
    expect(mergePxToRem(undefined, pxToRem16)).toEqual(pxToRem16)
  })

  test('null values do not override functions', () => {
    expect(mergePxToRem(pxToRem16, null)).toEqual(pxToRem16)
    expect(mergePxToRem(pxToRem10, null)).toEqual(pxToRem10)
  })

  test('undefined values do not override functions', () => {
    expect(mergePxToRem(pxToRem16, undefined)).toEqual(pxToRem16)
    expect(mergePxToRem(pxToRem10, undefined)).toEqual(pxToRem10)
  })

  test('first value wins if no function was provided', () => {
    // if a theme is created using mergeThemes() its rtl should remain `undefined` to be able to inherit it from parent Provider
    expect(mergePxToRem(null, null)).toEqual(null)
    expect(mergePxToRem(undefined, null)).toEqual(undefined)

    expect(mergePxToRem(null, undefined)).toEqual(null)
    expect(mergePxToRem(undefined, undefined)).toEqual(undefined)
  })
})
