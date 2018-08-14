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
): IComponentPartClasses => {
  // root, icon, etc.
  const componentParts: string[] = Object.keys(componentStyles)

  return componentParts.reduce((classes, partName) => {
    classes[partName] = renderer.renderRule(callable(componentStyles[partName]), styleParam)

    return classes
  }, {})
}

export default getClasses
