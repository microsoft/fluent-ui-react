import {
  ComponentSlotStylesPrepared,
  emptyTheme,
  ICSSInJSStyle,
} from '@fluentui/styles'
import { PrimitiveProps } from '@fluentui/react-bindings'
import resolveStyles, { ResolveStylesInput } from '../../src/styles/resolveStyles'


const componentStyles: ComponentSlotStylesPrepared<{}, { color: string }> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    color: v.color,
  }),
}

const resolveStylesParam = (options?: {
  displayName?: string
  renderStyles?: (styles: ICSSInJSStyle) => string
  cacheEnabled?: boolean
  stylesProps?: PrimitiveProps
}): ResolveStylesInput => {
  const {
    displayName = 'Test',
    cacheEnabled = false,
    stylesProps = {},
    renderStyles = undefined,
  } = options || {}

  return {
    theme: {
      ...emptyTheme,
      componentStyles: {
        [displayName]: componentStyles,
      },
    },
    displayName,
    props: {},
    resolvedVariables: {
      color: 'red',
    },
    rtl: false,
    disableAnimations: false,
    renderer: {
      renderRule: () => '',
    },
    cacheEnabled,
    stylesProps,
    renderStyles,
  }
}

describe('resolveStylesAndClasses', () => {
  test('resolves styles', () => {
    const { resolvedStyles } = resolveStyles(resolveStylesParam())

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
  })

  test('caches resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStyles(resolveStylesParam())

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('does not render classes if not fetched', () => {
    const renderStyles = jest.fn()
    const { resolvedStyles } = resolveStyles(resolveStylesParam({ renderStyles }))

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(renderStyles).not.toBeCalled()
  })

  test('renders classes when slot classes getter is accessed', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStyles(resolveStylesParam({ renderStyles }))

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
  })

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStyles(resolveStylesParam({ renderStyles }))

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('caches resolved styles for no props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesParam({ cacheEnabled: true})
    const { resolvedStyles } = resolveStyles(options)
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('caches classes for no props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesParam({
      renderStyles,
      cacheEnabled: true,
      displayName: 'Test1',
    })
    const { classes } = resolveStyles(options)
    const { classes: secondClasses } = resolveStyles(options)

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(secondClasses['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('caches resolved styles for the same props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesParam({
      cacheEnabled: true,
      displayName: 'Test2',
      stylesProps: { primary: true },
    })
    const { resolvedStyles } = resolveStyles(options)
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('caches classes for the same props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesParam({
      renderStyles,
      cacheEnabled: true,
      displayName: 'Test3',
      stylesProps: { primary: true },
    })
    const { classes } = resolveStyles(options)
    const { classes: secondClasses } = resolveStyles(options)

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(secondClasses['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })

  test('does not caches resolved styles for different props', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const options = resolveStylesParam({
      cacheEnabled: true,
      displayName: 'Test4',
      stylesProps: { primary: true },
    })
    const { resolvedStyles } = resolveStyles(options)

    options.stylesProps = { primary: false }
    const { resolvedStyles: secondResolvedStyles } = resolveStyles(options)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(secondResolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(2)
  })

  test('does not cache classes for different props', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const options = resolveStylesParam({
      renderStyles,
      cacheEnabled: true,
      displayName: 'Test5',
      stylesProps: { primary: true },
    })
    const { classes } = resolveStyles(options)

    options.stylesProps = { primary: false }
    const { classes: secondClasses } = resolveStyles(options)

    expect(classes['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(secondClasses['__root']).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(2)
  })
})
