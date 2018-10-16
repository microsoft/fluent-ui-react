import * as _ from 'lodash'
import keyboardHandlerFilter from './keyboardHandlerFilter'
import {
  AccessibilityActionHandlers,
  ActionsKeyHandler,
  KeyActions,
} from 'src/lib/accessibility/interfaces'
import { IState, IPropsWithVarsAndStyles } from '../../types/theme'

/**
 * Assigns onKeyDown handler to the Component's part element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActionHandlers} componentActionHandlers Actions handlers defined in a component.
 * @param {KeyActions} behaviorKeyActions Mappings of actions and keys defined in Accessibility behavior.
 * @param {IState & IPropsWithVarsAndStyles} props The props which are used to invoke onKeyDown handler passed from top.
 */
const getKeyDownHandlers = (
  componentActionHandlers: AccessibilityActionHandlers,
  behaviorKeyActions: KeyActions,
  props: IState & IPropsWithVarsAndStyles,
): ActionsKeyHandler => {
  const keyHandlers = {}

  if (!componentActionHandlers || !behaviorKeyActions) return keyHandlers

  for (const componentPart in behaviorKeyActions) {
    const componentPartKeyAction = behaviorKeyActions[componentPart]
    const handledActions = _.intersection(
      _.keys(componentPartKeyAction),
      _.keys(componentActionHandlers),
    )
    if (!handledActions.length) continue

    keyHandlers[componentPart] = {
      onKeyDown: (event: KeyboardEvent) => {
        handledActions.forEach(actionName => {
          const eventHandler = keyboardHandlerFilter(
            componentActionHandlers[actionName],
            componentPartKeyAction[actionName].keyCombinations,
          )
          eventHandler && eventHandler(event)
        })

        _.invoke(props, 'onKeyDown', event)
      },
    }
  }

  return keyHandlers
}

export default getKeyDownHandlers
