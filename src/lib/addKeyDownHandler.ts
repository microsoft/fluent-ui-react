import * as _ from 'lodash'
import keyboardHandlerFilter from './accessibility/Helpers/keyboardHandlerFilter'

/**
 * Adds onKeyDown handler to the Component's rest props, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {Object} rest The rest props which is to be extended by adding onKeyDown handler
 * @param {AccessibilityActions} actions The input element which is to loose focus.
 * @param {IAccessibilityDefinition} accessibility The input element which is to loose focus.
 * @param {IRenderConfigProps} props The props which are used to invoke onKeyDown handler passed from top.
 */
const addKeyDownHandler = (rest, actions, accessibility, props) => {
  const actionsDefinition = accessibility.actionsDefinition

  if (!actions || !actionsDefinition) return

  let hasCommonActions = false
  for (const actionName in actionsDefinition) {
    if (actions[actionName]) {
      hasCommonActions = true
      break
    }
  }
  if (!hasCommonActions) return

  rest.onKeyDown = (event: React.KeyboardEvent) => {
    for (const actionName in actionsDefinition) {
      if (!actions[actionName]) continue
      const eventHandler = keyboardHandlerFilter(
        actions[actionName],
        actionsDefinition[actionName].keyCombinations,
      )
      eventHandler && eventHandler(event)
    }

    _.invoke(props, 'onKeyDown', event)
  }
}

export default addKeyDownHandler
