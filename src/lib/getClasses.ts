import callable from './callable'
import {
  ComponentStyleFunctionParam,
  IComponentPartClasses,
  IComponentPartStylesInput,
  IRenderer,
} from '../../types/theme'

/**
 * Returns a string of HTML classes.
 * Renders one or many component styles (objects of component parts) to the DOM.
 */
const getClasses = (
  renderer: IRenderer,
  componentStyles: IComponentPartStylesInput,
  styleParam: ComponentStyleFunctionParam,
  extra: any,
): IComponentPartClasses => {
  // root, icon, etc.
  const componentParts: string[] = Object.keys(componentStyles)

  const { componentId, className: componentClassName } = extra

  return componentParts.reduce((classes, partName) => {
    // handle state section differently
    // DISCLAIMER: dirty code alert!
    if (partName.startsWith('on')) {
      const pseudoStateName = partName.substr(2).toLowerCase()

      const slotStyles = (componentStyles[partName] as any)()

      Object.keys(slotStyles).forEach(slotName => {
        const slotClassName = `slot-${slotName}`

        renderer.renderStatic(
          callable(slotStyles[slotName])(styleParam),
          `.${componentClassName}.${componentId}:${pseudoStateName} .${componentId}.${slotClassName}`,
        )
      })

      return classes
    }

    classes[partName] = renderer.renderRule(callable(componentStyles[partName]), styleParam)

    return classes
  }, {})
}

export default getClasses
