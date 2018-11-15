import { mergeComponentStyles } from '../../../../src/lib/mergeThemes'
import { ComponentStyleFunctionParam } from 'src/themes/types'

describe('mergeComponentStyles', () => {
  test(`always returns an object`, () => {
    expect(mergeComponentStyles({}, {})).toMatchObject({})
    expect(mergeComponentStyles(null, null)).toMatchObject({})
    expect(mergeComponentStyles(undefined, undefined)).toMatchObject({})

    expect(mergeComponentStyles(null, undefined)).toMatchObject({})
    expect(mergeComponentStyles(undefined, null)).toMatchObject({})

    expect(mergeComponentStyles({}, undefined)).toMatchObject({})
    expect(mergeComponentStyles(undefined, {})).toMatchObject({})

    expect(mergeComponentStyles({}, null)).toMatchObject({})
    expect(mergeComponentStyles(null, {})).toMatchObject({})
  })

  test('gracefully handles null and undefined', () => {
    const styles = { root: { color: 'black' } }
    const stylesWithNull = { root: { color: null }, icon: null }
    const stylesWithUndefined = { root: { color: undefined }, icon: undefined }

    expect(() => mergeComponentStyles(styles, null)).not.toThrow()
    expect(() => mergeComponentStyles(styles, stylesWithNull)).not.toThrow()

    expect(() => mergeComponentStyles(null, styles)).not.toThrow()
    expect(() => mergeComponentStyles(stylesWithNull, styles)).not.toThrow()

    expect(() => mergeComponentStyles(styles, undefined)).not.toThrow()
    expect(() => mergeComponentStyles(styles, stylesWithUndefined)).not.toThrow()

    expect(() => mergeComponentStyles(undefined, styles)).not.toThrow()
    expect(() => mergeComponentStyles(stylesWithUndefined, styles)).not.toThrow()
  })

  test('component parts are merged', () => {
    const target = { root: {} }
    const source = { icon: {} }

    const merged = mergeComponentStyles(target, source)

    expect(merged).toHaveProperty('root')
    expect(merged).toHaveProperty('icon')
  })

  test('component part objects are converted to functions', () => {
    const target = { root: {} }
    const source = { root: {} }

    const merged = mergeComponentStyles(target, source)

    expect(merged.root).toBeInstanceOf(Function)
    expect(merged.root).toBeInstanceOf(Function)
  })

  test('component part styles are deeply merged', () => {
    const target = {
      root: {
        display: 'inline-block',
        color: 'green',
        '::before': {
          content: 'before content',
        },
      },
    }
    const source = {
      root: {
        color: 'blue',
        '::before': {
          color: 'red',
        },
      },
    }
    const merged = mergeComponentStyles(target, source)

    expect(merged.root()).toMatchObject({
      display: 'inline-block',
      color: 'blue',
      '::before': {
        content: 'before content',
        color: 'red',
      },
    })
  })

  test('functions can accept and apply params', () => {
    const target = { root: param => ({ target: true, ...param }) }
    const source = { root: param => ({ source: true, ...param }) }

    const merged = mergeComponentStyles(target, source)

    const styleParam: ComponentStyleFunctionParam = {
      variables: { iconSize: 'large' },
      props: { primary: true },
    } as any

    expect(merged.root(styleParam)).toMatchObject({
      source: true,
      target: true,
      ...styleParam,
    })
  })
})
