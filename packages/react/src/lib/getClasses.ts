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

  // Fela plugins rely on `direction` param in `theme` prop instead of RTL
  // Our API should be aligned with it
  // Heads Up! Keep in sync with Design.tsx render logic
  const direction = styleParam.rtl ? 'rtl' : 'ltr'
  const mergedStyleParam = {
    ...styleParam,
    theme: { ...styleParam.theme, direction },
  }

  return componentParts.reduce((classes, partName) => {
    classes[partName] = renderer.renderRule(callable(componentStyles[partName]), mergedStyleParam)

    return classes
  }, {})
}

export default getClasses
