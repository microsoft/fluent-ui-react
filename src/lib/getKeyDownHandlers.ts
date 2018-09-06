import * as _ from 'lodash'
import keyboardHandlerFilter from './keyboardHandlerFilter'
import {
  IAccessibilityDefinition,
  AccessibilityActions,
  ActionsHandler,
} from 'src/lib/accessibility/interfaces'
import { IState, IPropsWithVarsAndStyles } from '../../types/theme'

/**
 * Assigns onKeyDown handler to the Component's part element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActions} actions Actions defined in a component.
 * @param {IAccessibilityDefinition} accessibility The input element which is to loose focus.
 * @param {IState & IPropsWithVarsAndStyles} props The props which are used to invoke onKeyDown handler passed from top.
 */
const getKeyDownHandlers = (
  actions: AccessibilityActions,
  accessibility: IAccessibilityDefinition,
  props: IState & IPropsWithVarsAndStyles,
): ActionsHandler => {
  const handlers = {}
  const actionsDefinition = accessibility.actionsDefinition

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
