import callable from './callable'
import {
  ComponentStyleFunctionParam,
  ComponentSlotClasses,
  ComponentSlotStylesInput,
  Renderer,
} from '../themes/types'

/**
 * Returns a string of HTML classes.
 * Renders one or many component styles (objects of component parts) to the DOM.
 */
const getClasses = (
  renderer: Renderer,
  componentStyles: ComponentSlotStylesInput,
  styleParam: ComponentStyleFunctionParam,
): ComponentSlotClasses => {
  // root, icon, etc.
  const componentParts: string[] = Object.keys(componentStyles)

  return componentParts.reduce((classes, partName) => {
    // The reason for explicit cast is that Fela and Stardust use different interfaces for CSS styles
    // - Fela: interface IStyle extends CSS.Properties<string | number>
    // - Stardust: interface ICSSInJSStyle extends React.CSSProperties
    classes[partName] = renderer.renderRule(callable<any>(componentStyles[partName]), styleParam)

    return classes
  }, {})
}

export default getClasses
