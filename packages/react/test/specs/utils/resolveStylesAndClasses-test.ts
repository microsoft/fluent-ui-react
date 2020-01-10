import { ComponentSlotStylesPrepared } from '@fluentui/styles'
import resolveStylesAndClasses from 'src/utils/resolveStylesAndClasses'

describe('resolveStylesAndClasses', () => {
  const styleParam = {
    variables: {
      color: 'red',
    },
  }

  const componentStyles: ComponentSlotStylesPrepared = {
    root: ({ variables }) => ({
      color: variables['color'],
    }),
  }

  test('resolves styles', () => {
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, () => ({}))

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
  })

  test('caches resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, () => ({}))

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

    expect(classes.root).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
  })

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(classes.root).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(classes.root).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })
})
