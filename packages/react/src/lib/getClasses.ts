import callable from './callable'
import {
  ComponentStyleFunctionParam,
  ComponentSlotClasses,
  ComponentSlotStylesInput,
  Renderer,
} from '../themes/types'
import * as perf from './perf'

/**
 * Returns a string of HTML classes.
 * Renders one or many component styles (objects of component parts) to the DOM.
 */
const getClasses = perf.time(
  'getClasses',
  (
    renderer: Renderer,
    componentStyles: ComponentSlotStylesInput,
    styleParam: ComponentStyleFunctionParam,
  ): ComponentSlotClasses => {
    // root, icon, etc.
    const componentParts: string[] = Object.keys(componentStyles)

    return componentParts.reduce((classes, partName) => {
      if (perf.flags.SKIP_FELA) {
        classes[partName] = ''
      } else {
        classes[partName] = renderer.renderRule(callable(componentStyles[partName]), styleParam)
      }

      return classes
    }, {})
  },
)
export default getClasses
