import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import keyboardHandlerFilter from './keyboardHandlerFilter'
import {
  AccessibilityActionHandlers,
  ActionsKeyHandler,
  KeyActions,
} from 'src/lib/accessibility/types'
import { State, PropsWithVarsAndStyles } from '../themes/types'

const rtlKeyMap = {
  [keyboardKey.ArrowRight]: keyboardKey.ArrowLeft,
  [keyboardKey.ArrowLeft]: keyboardKey.ArrowRight,
}

/**
 * Assigns onKeyDown handler to the Component's part element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActionHandlers} componentActionHandlers Actions handlers defined in a component.
 * @param {KeyActions} behaviorKeyActions Mappings of actions and keys defined in Accessibility behavior.
 * @param {State & PropsWithVarsAndStyles} props The props which are used to invoke onKeyDown handler passed from top.
 * @param {boolean} isRtlEnabled Indicates if Left and Right arrow keys should be swapped in RTL mode.
 */
const getKeyDownHandlers = (
  componentActionHandlers: AccessibilityActionHandlers,
  behaviorKeyActions: KeyActions,
  props: State & PropsWithVarsAndStyles,
  isRtlEnabled?: boolean,
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
          let keyCombinations = componentPartKeyAction[actionName].keyCombinations

          if (isRtlEnabled) {
            keyCombinations = keyCombinations.map(keyCombination => {
              const keyToRtlKey = rtlKeyMap[keyCombination.keyCode]
              if (keyToRtlKey) {
                keyCombination.keyCode = keyToRtlKey
              }
              return keyCombination
            })
          }

          const eventHandler = keyboardHandlerFilter(
            componentActionHandlers[actionName],
            keyCombinations,
          )

          eventHandler && eventHandler(event)
        })

        _.invoke(props, 'onKeyDown', event, props)
      },
    }
  }

  return keyHandlers
}

export default getKeyDownHandlers
