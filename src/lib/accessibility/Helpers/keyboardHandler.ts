import { KeyCombinations } from '../interfaces'
import keyboardKey from 'keyboard-key'

export const keyboardHandlerFilter = (handler: Function, keysCombinations: KeyCombinations[]) => (
  event: KeyboardEvent,
) => {
  const filteredKeys = keysCombinations.filter(keysCombinations => {
    const keyCode = keysCombinations.keyCode

    const { shiftKey, altKey, metaKey, ctrlKey } = event

    if (
      (keysCombinations.altKey && !altKey) ||
      (keysCombinations.shiftKey && !shiftKey) ||
      (keysCombinations.metaKey && !metaKey) ||
      (keysCombinations.ctrlKey && !ctrlKey)
    ) {
      return null
    }

    return keyCode === keyboardKey.getCode(event)
  })

  if (!filteredKeys.length) return

  handler(event)
}

export const mapKeysToActions = (actionsDefinition, actions) => {
  if (!actions || !actionsDefinition) return

  const keyboardHandlers = []

  for (const action in actionsDefinition) {
    if (!actions[action]) continue

    const filteredAction = keyboardHandlerFilter(
      actions[action].bind(this),
      actionsDefinition[action].keyCombinations,
    )
    keyboardHandlers.push(filteredAction)
  }

  return keyboardHandlers
}
