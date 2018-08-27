import * as _ from 'lodash'
import keyboardHandlerFilter from './keyboardHandlerFilter'
import { IAccessibilityDefinition, AccessibilityActions } from 'src/lib/accessibility/interfaces'
import { IRenderConfigProps } from 'src/lib/renderComponent'

/**
 * Assigns onKeyDown handler to the Component's part element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActions} actions The input element which is to loose focus.
 * @param {IAccessibilityDefinition} accessibility The input element which is to loose focus.
 * @param {IRenderConfigProps} props The props which are used to invoke onKeyDown handler passed from top.
 */
const addKeyDownHandler = (
  actions: AccessibilityActions,
  accessibility: IAccessibilityDefinition,
  props: IRenderConfigProps,
) => {
  accessibility.handlers = {}
  const actionsDefinition = accessibility.actionsDefinition

  if (!actions || !actionsDefinition) return

  for (const elementName in actionsDefinition) {
    const currentActionDef = actionsDefinition[elementName]
    const commonActions = _.intersection(_.keys(currentActionDef), _.keys(actions))
    if (!commonActions.length) continue

    accessibility.handlers[elementName] = {
      onKeyDown: (event: React.KeyboardEvent) => {
        commonActions.forEach(actionName => {
          const eventHandler = keyboardHandlerFilter(
            actions[actionName],
            currentActionDef[actionName].keyCombinations,
          )
          eventHandler && eventHandler(event)
        })

        _.invoke(props, 'onKeyDown', event)
      },
    }
  }
}

export default addKeyDownHandler
