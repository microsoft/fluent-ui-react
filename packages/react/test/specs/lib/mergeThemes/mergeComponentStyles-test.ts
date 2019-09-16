import mergeThemes, { mergeComponentStyles } from '../../../../src/lib/mergeThemes'
import { ComponentStyleFunctionParam } from 'src/themes/types'
import { themes, callable } from 'src/index'
import * as _ from 'lodash'

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

  xtest('perf', () => {
    const merged = mergeThemes(..._.times(100, n => themes.teams))
    const resolvedStyles = _.mapValues(merged.componentStyles, (componentStyle, componentName) => {
      const compVariables = _.get(merged.componentVariables, componentName, callable({}))(
        merged.siteVariables,
      )
      const styleParam: ComponentStyleFunctionParam = {
        displayName: componentName,
        props: {},
        variables: compVariables,
        theme: merged,
        rtl: false,
        disableAnimations: false,
      }
      return _.mapValues(componentStyle, (partStyle, partName) => {
        if (partName === '_debug') {
          // TODO: fix in code, happens only with mergeThemes(singleTheme)
          return undefined
        }
        if (typeof partStyle !== 'function') {
          console.log(componentName, partStyle, partName)
        }
        return partStyle(styleParam)
      })
    })
    console.log(resolvedStyles.Button.root)
  })

  xtest('component part styles are deeply merged', () => {
    const target = {
      root: {
        display: 'inline-block',
        color: 'green',
        '::before': {
          content: 'before content',
        },
      },
    }
    const source1 = {
      root: {
        color: 'source1',
        '::before': {
          color: 'source1',
        },
      },
    }
    const source2 = {
      root: {
        color: 'source2',
        '::before': {
          background: 'source2',
        },
      },
    }

    // const merged = mergeComponentStyles(target, source1, source2)
    const merged = mergeComponentStyles(mergeComponentStyles(target, source1), source2)
    // const merged = mergeComponentStyles(target, mergeComponentStyles(source1, source2))
    console.log(JSON.stringify(merged.root(), null, 2))

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
