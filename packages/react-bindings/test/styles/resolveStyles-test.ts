import * as _ from 'lodash'
import {
  ComponentSlotStylesPrepared,
  ComponentVariablesObject,
  emptyTheme,
  ICSSInJSStyle,
} from '@fluentui/styles'
import resolveStyles from '../../src/styles/resolveStyles'
import { ResolveStylesOptions, StylesContextPerformance } from '../../src/styles/types'

const componentStyles: ComponentSlotStylesPrepared<{}, { color: string }> = {
  root: ({ variables: v, rtl }): ICSSInJSStyle => ({
    color: v.color,
    content: `"rtl:${rtl.toString()}"`,
  }),
}

const resolvedVariables: ComponentVariablesObject = {
  color: 'red',
}

const defaultPerformanceOptions: StylesContextPerformance = {
  enableSanitizeCssPlugin: true,
  enableStylesCaching: true,
  enableVariablesCaching: true,
  enableHardVariablesCaching: false,
}

const resolveStylesOptions = (options?: {
  displayName?: ResolveStylesOptions['displayName']
  performance?: Partial<ResolveStylesOptions['performance']>
  props?: ResolveStylesOptions['props']
  rtl?: ResolveStylesOptions['rtl']
}): ResolveStylesOptions => {
  const { displayName = 'Test', performance, props = {}, rtl = false } = options || {}

  return {
    theme: {
      ...emptyTheme,
      componentStyles: {
        [displayName]: componentStyles,
      },
    },
    displayName,
    props,
    rtl,
    disableAnimations: false,
    renderer: {
      renderRule: () => '',
    },
    performance: { ...defaultPerformanceOptions, ...performance },
    saveDebug: () => {},
  }
}

describe('resolveStyles', () => {
  test('resolves styles', () => {
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
  })

  test('caches resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStyles(resolveStylesOptions(), resolvedVariables)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('does not render classes if not fetched', () => {
    const renderStyles = jest.fn()
    const { resolvedStyles } = resolveStyles(
      resolveStylesOptions(),
      resolvedVariables,
      renderStyles,
    )

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(renderStyles).not.toBeCalled()
  })

  test('renders classes when slot classes getter is accessed', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStyles(resolveStylesOptions(), resolvedVariables, renderStyles)

    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }))
  })

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStyles(resolveStylesOptions(), resolvedVariables, renderStyles)

    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }))
    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('caches resolved styles for no props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesOptions()
    const { resolvedStyles } = resolveStyles(options, resolvedVariables)
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables)

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('caches classes for no props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesOptions({ displayName: 'Test1' })
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles)
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles)

    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }))
    expect(secondClasses['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('caches resolved styles for the same props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesOptions({
      displayName: 'Test2',
      props: { primary: true },
    })
    const { resolvedStyles } = resolveStyles(options, resolvedVariables)
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables)

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('caches classes for the same props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesOptions({
      displayName: 'Test3',
      props: { primary: true },
    })
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles)
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles)

    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }))
    expect(secondClasses['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('considers props when caching resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesOptions({
      displayName: 'Test4',
      props: { primary: true },
    })
    const { resolvedStyles } = resolveStyles(options, resolvedVariables)
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(
      { ...options, props: { primary: false } },
      resolvedVariables,
    )

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(2)
  })

  test('considers props when caching classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesOptions({
      displayName: 'Test5',
      props: { primary: true },
    })
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles)

    options.props = { primary: false }
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles)

    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }))
    expect(secondClasses['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(2)
  })

  test('does not cache styles if caching is disabled', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesOptions({
      performance: { enableStylesCaching: false },
    })
    const { resolvedStyles } = resolveStyles(options, resolvedVariables)
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables)

    expect(resolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(secondResolvedStyles.root).toMatchObject(expect.objectContaining({ color: 'red' }))
    expect(componentStyles.root).toHaveBeenCalledTimes(2)
  })

  test('does not cache classes if caching is disabled', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesOptions({
      performance: { enableStylesCaching: false },
    })
    const { classes } = resolveStyles(options, resolvedVariables, renderStyles)
    const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles)

    expect(classes['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith(expect.objectContaining({ color: 'red' }))
    expect(secondClasses['root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(2)
  })

  test('does not cache styles if there are inline overrides', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const propsInlineOverrides: ResolveStylesOptions['props'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } },
    ]

    const propsInlineOverridesResolvedStyles: ICSSInJSStyle[] = [
      { color: 'red', fontSize: '10px' },
      { color: 'red', left: '10px' },
      { color: 'red' },
    ]

    const propsInlineOverridesSize = propsInlineOverrides.length

    _.forEach(propsInlineOverrides, (props, idx) => {
      const options = resolveStylesOptions({
        props,
        performance: { enableStylesCaching: false },
      })

      const { resolvedStyles } = resolveStyles(options, resolvedVariables)
      const { resolvedStyles: secondResolvedStyles } = resolveStyles(options, resolvedVariables)

      expect(resolvedStyles.root).toMatchObject(propsInlineOverridesResolvedStyles[idx])
      expect(secondResolvedStyles.root).toMatchObject(propsInlineOverridesResolvedStyles[idx])
      resolveStyles(options, resolvedVariables)
    })

    expect(componentStyles.root).toHaveBeenCalledTimes(propsInlineOverridesSize * 2)
  })

  test('does not cache classes if there are inline overrides', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const propsInlineOverrides: ResolveStylesOptions['props'][] = [
      { styles: { fontSize: '10px' } },
      { design: { left: '10px' } },
      { variables: { backgroundColor: 'yellow' } },
    ]

    const propsInlineOverridesSize = propsInlineOverrides.length

    _.forEach(propsInlineOverrides, props => {
      const options = resolveStylesOptions({
        props,
        performance: { enableStylesCaching: false },
      })
      const { classes } = resolveStyles(options, resolvedVariables, renderStyles)
      const { classes: secondClasses } = resolveStyles(options, resolvedVariables, renderStyles)

      expect(classes['root']).toBeDefined()
      expect(secondClasses['root']).toBeDefined()
    })

    expect(renderStyles).toHaveBeenCalledTimes(propsInlineOverridesSize * 2)
  })

  test('computes new styles when "rtl" changes', () => {
    const renderStyles = jest.fn().mockImplementation((style: ICSSInJSStyle) => style.content)

    const ltrOptions = resolveStylesOptions({ rtl: false })
    const rtlOptions = resolveStylesOptions({ rtl: true })

    const ltrStyles = resolveStyles(ltrOptions, resolvedVariables, renderStyles)
    const rtlStyles = resolveStyles(rtlOptions, resolvedVariables, renderStyles)

    expect(ltrStyles).toHaveProperty(
      'resolvedStyles.root.content',
      expect.stringMatching(/rtl:false/),
    )
    expect(ltrStyles).toHaveProperty('classes.root', expect.stringMatching(/rtl:false/))
    expect(renderStyles).toHaveBeenCalledTimes(1)

    expect(rtlStyles).toHaveProperty(
      'resolvedStyles.root.content',
      expect.stringMatching(/rtl:true/),
    )
    expect(rtlStyles).toHaveProperty('classes.root', expect.stringMatching(/rtl:true/))
    expect(renderStyles).toHaveBeenCalledTimes(2)
  })

  describe('enableHardVariablesCaching', () => {
    test('avoids "classes" computation when enabled', () => {
      const renderStyles = jest.fn().mockReturnValue('a')
      const options = resolveStylesOptions({
        props: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableHardVariablesCaching: true },
      })

      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty(
        'classes.root',
        'a',
      )
      expect(resolveStyles(options, resolvedVariables, renderStyles)).toHaveProperty(
        'classes.root',
        'a',
      )
      expect(renderStyles).toHaveBeenCalledTimes(1)
    })

    test('avoids "styles" computation when enabled', () => {
      spyOn(componentStyles, 'root').and.callThrough()
      const options = resolveStylesOptions({
        props: { variables: { isFoo: true, isBar: null, isBaz: undefined } },
        performance: { enableHardVariablesCaching: true },
      })

      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root')
      expect(resolveStyles(options, resolvedVariables)).toHaveProperty('resolvedStyles.root')
      expect(componentStyles.root).toHaveBeenCalledTimes(1)
    })

    test('requires "enableStylesCaching" to be enabled', () => {
      const options = resolveStylesOptions({
        performance: { enableStylesCaching: false, enableHardVariablesCaching: true },
      })

      expect(() => resolveStyles(options, resolvedVariables)).toThrowError(
        /Please check your "performance" settings on "Provider"/,
      )
    })

    test('when enabled only plain objects can be passed as "variables"', () => {
      const options = resolveStylesOptions({
        props: { variables: () => {} },
        performance: { enableHardVariablesCaching: true },
      })

      expect(() => resolveStyles(options, resolvedVariables)).toThrowError(
        /With "enableHardVariablesCaching" only plain objects/,
      )
    })

    test('when enabled only boolean or nil properties can be passed to "variables"', () => {
      const options = resolveStylesOptions({
        props: { variables: { foo: 'bar' } },
        performance: { enableHardVariablesCaching: true },
      })

      expect(() => resolveStyles(options, resolvedVariables)).toThrowError(
        /With "enableHardVariablesCaching" only boolean or nil properties/,
      )
    })
  })
})
