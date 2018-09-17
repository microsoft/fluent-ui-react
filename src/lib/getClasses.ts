import callable from './callable'
import {
  ComponentStyleFunctionParam,
  IComponentPartClasses,
  IComponentPartStylesInput,
  IRenderer,
} from '../../types/theme'

import * as crypto from 'crypto'

const getHashCode = (fromString: string): string => {
  return crypto
    .createHash('md5')
    .update(fromString)
    .digest('hex')
    .substr(0, 5)
}

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

  const { className: componentClassName } = extra

  return componentParts.reduce(
    (classes, partName) => {
      // handle state section differently
      // DISCLAIMER: dirty code alert!
      if (partName.startsWith('on')) {
        const pseudoStateName = partName.substr(2).toLowerCase()

        const slotStyles = (componentStyles[partName] as any)()

        Object.keys(slotStyles).forEach(slotName => {
          const slotStyle = callable(slotStyles[slotName])(styleParam)
          const slotStyleHash = getHashCode(JSON.stringify(slotStyle))

          const slotClassName = `${slotName}-slot-of-${componentClassName}--${slotStyleHash}`

          renderer.renderStatic(
            slotStyle,
            `.${componentClassName}:${pseudoStateName} .${slotClassName}`,
          )

          classes.slots[slotName] = slotClassName
        })

        return classes
      }

      classes[partName] = renderer.renderRule(callable(componentStyles[partName]), styleParam)

      return classes
    },
    { slots: {} } as any,
  )
}

export default getClasses
