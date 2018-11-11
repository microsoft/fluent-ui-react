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

    const siteVariables = { one: 'one', two: 'two' }

    expect(merged(siteVariables)).toMatchObject({
      one: 'one',
      two: 'two',
      source: true,
      target: true,
    })
  })

  test('object values of variables are merged', () => {
    const target = { foo: { bar: true, deep: { first: false, same: 'target' } }, target: true }
    const source = { foo: { baz: false, deep: { second: true, same: 'source' } }, source: true }

    const merged = mergeComponentVariables(target, source)

    expect(merged()).toMatchObject({
      source: true,
      target: true,
      foo: { bar: true, baz: false, deep: { first: false, second: true, same: 'source' } },
    })
  })
})
