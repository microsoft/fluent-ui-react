import * as _ from 'lodash'
import keyboardHandlerFilter from './keyboardHandlerFilter'
import { IAccessibilityDefinition, AccessibilityActions } from 'src/lib/accessibility/interfaces'
import { IRenderConfigProps } from 'src/lib/renderComponent'

type IRestProps = {
  [key: string]: any
}

/**
 * Adds onKeyDown handler to the Component's rest props, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {IRestProps} rest The rest props which is to be extended by adding onKeyDown handler
 * @param {AccessibilityActions} actions The input element which is to loose focus.
 * @param {IAccessibilityDefinition} accessibility The input element which is to loose focus.
 * @param {IRenderConfigProps} props The props which are used to invoke onKeyDown handler passed from top.
 */
const addKeyDownHandler = (
  rest: IRestProps,
  actions: AccessibilityActions,
  accessibility: IAccessibilityDefinition,
  props: IRenderConfigProps,
) => {
  const actionsDefinition = accessibility.actionsDefinition

  if (!actions || !actionsDefinition) return

  const commonActions = _.intersection(_.keys(actionsDefinition), _.keys(actions))
  if (!commonActions.length) return

  rest.onKeyDown = (event: React.KeyboardEvent) => {
    commonActions.forEach(actionName => {
      const eventHandler = keyboardHandlerFilter(
        actions[actionName],
        actionsDefinition[actionName].keyCombinations,
      )
      eventHandler && eventHandler(event)
    })

    _.invoke(props, 'onKeyDown', event)
  }
}

export default addKeyDownHandler
