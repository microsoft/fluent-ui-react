import {
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  emptyTheme,
  ICSSInJSStyle,
  ThemePrepared,
} from '@fluentui/styles'
import resolveStylesAndClasses from '../../src/styles/resolveStylesAndClasses'

const styleParam: ComponentStyleFunctionParam = {
  disableAnimations: false,
  displayName: 'Test',
  props: {},
  rtl: false,
  theme: emptyTheme,
  variables: {
    color: 'red',
  },
}

const componentStyles: ComponentSlotStylesPrepared<{}, { color: string }> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    color: v.color,
  }),
}

const theme: ThemePrepared = emptyTheme

describe('resolveStylesAndClasses', () => {
  test('resolves styles', () => {
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, () => '')

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
  })

  test('caches resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, () => '')

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('does not render classes if not fetched', () => {
    const renderStyles = jest.fn()
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(renderStyles).not.toBeCalled()
  })

  test('renders classes when slot classes getter is accessed', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
  })

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('caches resolved styles for no props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      () => '',
      true,
      'Test',
      theme,
      {},
    )
    const { resolvedStyles: secondResolvedStyles } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      () => '',
      true,
      'Test',
      theme,
      {},
    )

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('caches classes for no props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      renderStyles,
      true,
      'Test1',
      theme,
      {},
    )
    const { classes: secondClasses } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      renderStyles,
      true,
      'Test1',
      theme,
      {},
    )

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(secondClasses['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('caches resolved styles for the same props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      () => '',
      true,
      'Test2',
      theme,
      { primary: true },
    )
    const { resolvedStyles: secondResolvedStyles } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      () => '',
      true,
      'Test2',
      theme,
      { primary: true },
    )

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('caches classes for the same props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      renderStyles,
      true,
      'Test3',
      theme,
      { primary: true },
    )
    const { classes: secondClasses } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      renderStyles,
      true,
      'Test3',
      theme,
      { primary: true },
    )

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(secondClasses['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('does not caches resolved styles for different props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      () => '',
      true,
      'Test4',
      theme,
      { primary: true },
    )
    const { resolvedStyles: secondResolvedStyles } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      () => '',
      true,
      'Test4',
      theme,
      {},
    )

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(2)
  })

  test('does not cache classes for different props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      renderStyles,
      true,
      'Test5',
      theme,
      { primary: true },
    )
    const { classes: secondClasses } = resolveStylesAndClasses(
      componentStyles,
      styleParam,
      renderStyles,
      true,
      'Test5',
      theme,
      {},
    )

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(secondClasses['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(2)
  })
})
