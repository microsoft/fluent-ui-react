import * as _ from 'lodash'
import keyboardHandlerFilter from './keyboardHandlerFilter'
import {
  ActionsDefinition,
  AccessibilityActions,
  ActionsHandler,
} from 'src/lib/accessibility/interfaces'
import { IRenderConfigProps } from 'src/lib/renderComponent'

/**
 * Assigns onKeyDown handler to the Component's part element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActions} actions Component's actions
 * @param {ActionsDefinition} actionsDefinition The mapping of keys and actions' names
 * @param {IRenderConfigProps} props The props which are used to invoke onKeyDown handler passed from top.
 */
const getKeyDownHandlers = (
  actions: AccessibilityActions,
  actionsDefinition: ActionsDefinition,
  props: IRenderConfigProps,
): ActionsHandler => {
  const handlers = {}

  if (!actions || !actionsDefinition) return handlers

  for (const elementName in actionsDefinition) {
    const currentActionDef = actionsDefinition[elementName]
    const commonActions = _.intersection(_.keys(currentActionDef), _.keys(actions))
    if (!commonActions.length) continue

    handlers[elementName] = {
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

  return handlers
}

export default getKeyDownHandlers
