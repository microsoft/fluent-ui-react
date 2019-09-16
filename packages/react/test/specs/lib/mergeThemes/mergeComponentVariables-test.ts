import { mergeComponentVariables } from '../../../../src/lib/mergeThemes'

describe('mergeComponentVariables', () => {
  test(`always returns a function that returns an object`, () => {
    expect(mergeComponentVariables({}, {})()).toMatchObject({})
    expect(mergeComponentVariables(null, null)()).toMatchObject({})
    expect(mergeComponentVariables(undefined, undefined)()).toMatchObject({})

    expect(mergeComponentVariables(null, undefined)()).toMatchObject({})
    expect(mergeComponentVariables(undefined, null)()).toMatchObject({})

    expect(mergeComponentVariables({}, undefined)()).toMatchObject({})
    expect(mergeComponentVariables(undefined, {})()).toMatchObject({})

    expect(mergeComponentVariables({}, null)()).toMatchObject({})
    expect(mergeComponentVariables(null, {})()).toMatchObject({})
  })

  test('gracefully handles null and undefined', () => {
    expect(mergeComponentVariables({ color: 'black' }, null)).not.toThrow()
    expect(mergeComponentVariables({ color: 'black' }, { color: null })).not.toThrow()

    expect(mergeComponentVariables(null, { color: 'black' })).not.toThrow()
    expect(mergeComponentVariables({ color: null }, { color: 'black' })).not.toThrow()

    expect(mergeComponentVariables({ color: 'black' }, undefined)).not.toThrow()
    expect(mergeComponentVariables({ color: 'black' }, { color: undefined })).not.toThrow()

    expect(mergeComponentVariables(undefined, { color: 'black' })).not.toThrow()
    expect(mergeComponentVariables({ color: undefined }, { color: 'black' })).not.toThrow()
  })

  test('undefined overwrites previously set value', () => {
    const merged = mergeComponentVariables({ color: 'black' }, { color: undefined })

    expect(merged()).toMatchObject({
      color: undefined,
    })
  })

  test('null overwrites previously set value', () => {
    const merged = mergeComponentVariables({ color: 'black' }, { color: null })

    expect(merged()).toMatchObject({
      color: null,
    })
  })

  test('merged functions return merged variables', () => {
    const target = () => ({ one: 1, three: 3 })
    const source = () => ({ one: 'one', two: 'two' })

    const merged = mergeComponentVariables(target, source)

    expect(merged()).toMatchObject({
      one: 'one',
      two: 'two',
      three: 3,
    })
  })

  test('merged functions accept and apply siteVariables', () => {
    const target = siteVariables => ({ one: 1, target: true, ...siteVariables })
    const source = siteVariables => ({ two: 2, source: true, ...siteVariables })

    const merged = mergeComponentVariables(target, source)

    const siteVariables = { one: 'one', two: 'two', fontSizes: {} }

    expect(merged(siteVariables)).toMatchObject({
      one: 'one',
      two: 'two',
      source: true,
      target: true,
    })
  })

  test('object values of variables are merged', () => {
    const target = { foo: { bar: true, deep: { dOne: 1 } }, target: true }
    const source = { foo: { baz: false, deep: { dTwo: 'two' } }, source: true }

    const merged = mergeComponentVariables(target, source)

    expect(merged()).toMatchObject({
      source: true,
      target: true,
      foo: { bar: true, baz: false, deep: { dOne: 1, dTwo: 'two' } },
    })
  })

  xtest('merges more objects', () => {
    const siteVariables = {
      colors: {
        colorForC: 'c_color',
      },
    }
    const target = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const source1 = { b: 'bS1', d: false, bb: 'bbS1' }
    const source2 = sv => ({ c: sv.colors.colorForC, cc: 'bbS2' })
    const source3 = { d: 'bS3', dd: 'bbS3' }

    expect(mergeComponentVariables(target, source1, source2, source3)(siteVariables)).toStrictEqual(
      {
        a: 1,
        b: 'bS1',
        c: 'c_color',
        d: 'bS3',
        e: 5,
        bb: 'bbS1',
        cc: 'bbS2',
        dd: 'bbS3',
      },
    )
  })

  xtest('multiple merges', () => {
    const siteVariables = {
      colors: {
        colorForC: 'c_color',
      },
    }
    const target = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const source1 = { b: 'bS1', d: false, bb: 'bbS1' }
    const source2 = sv => ({ c: sv.colors.colorForC, cc: 'bbS2' })
    const source3 = { d: 'bS3', dd: 'bbS3' }

    expect(
      mergeComponentVariables(
        mergeComponentVariables(mergeComponentVariables(target, source1), source2),
        source3,
      )(siteVariables),
    ).toStrictEqual({
      a: 1,
      b: 'bS1',
      c: 'c_color',
      d: 'bS3',
      e: 5,
      bb: 'bbS1',
      cc: 'bbS2',
      dd: 'bbS3',
    })
  })
})
