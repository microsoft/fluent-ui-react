import { KeyActions } from '@stardust-ui/accessibility'
// @ts-ignore
import * as keyboardKey from 'keyboard-key'
import * as React from 'react'

import shouldHandleOnKeys from './shouldHandleOnKeys'
import { AccessibilityActionHandlers, AccessibilityKeyHandlers } from './types'

const rtlKeyMap = {
  [keyboardKey.ArrowRight]: keyboardKey.ArrowLeft,
  [keyboardKey.ArrowLeft]: keyboardKey.ArrowRight,
}

/**
 * Assigns onKeyDown handler to the slot element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActionHandlers} actionHandlers Actions handlers defined in a component.
 * @param {KeyActions} behaviorActions Mappings of actions and keys defined in Accessibility behavior.
 * @param {boolean} isRtlEnabled Indicates if Left and Right arrow keys should be swapped in RTL mode.
 */
const getKeyDownHandlers = (
  actionHandlers: AccessibilityActionHandlers,
  behaviorActions: KeyActions,
  isRtlEnabled?: boolean,
): AccessibilityKeyHandlers => {
  const componentHandlerNames = Object.keys(actionHandlers)
  const keyHandlers = {}

  if (!actionHandlers || !behaviorActions) return keyHandlers

  for (const slotName in behaviorActions) {
    const behaviorSlotAction = behaviorActions[slotName]
    const handledActions = Object.keys(behaviorSlotAction).filter(
      actionName => componentHandlerNames.indexOf(actionName) !== -1,
    )

    if (!handledActions.length) continue

    keyHandlers[slotName] = {
      onKeyDown: (event: React.KeyboardEvent) => {
        handledActions.forEach(actionName => {
          let keyCombinations = behaviorSlotAction[actionName].keyCombinations

          if (isRtlEnabled) {
            keyCombinations = keyCombinations.map(keyCombination => {
              const keyToRtlKey = rtlKeyMap[keyCombination.keyCode]
              if (keyToRtlKey) {
                keyCombination.keyCode = keyToRtlKey
              }
              return keyCombination
            })
          }

          if (shouldHandleOnKeys(event, keyCombinations)) {
            actionHandlers[actionName](event)
          }
        })
      },
    }
  }

  return keyHandlers
}

export default getKeyDownHandlers
