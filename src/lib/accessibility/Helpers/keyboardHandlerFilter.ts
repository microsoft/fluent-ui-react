import { KeyCombinations } from '../interfaces'
import keyboardKey from 'keyboard-key'

const keyboardHandlerFilter = (handler: Function, keysCombinations: KeyCombinations[]) => (
  event: KeyboardEvent,
) => {
  const filteredKeys = keysCombinations.filter(keysCombinations => {
    const keyCode = keysCombinations.keyCode

    const { shiftKey, altKey, metaKey, ctrlKey } = event

    return keyCode === keyboardKey.getCode(event)
    // &&
    //   (shiftKey && keysCombinations.shiftKey) ||
    //   (altKey && keysCombinations.altKey) ||
    //   (metaKey && keysCombinations.metaKey) ||
    //   (ctrlKey && keysCombinations.ctrlKey))
  })
  if (!filteredKeys.length) return

  handler(event)
}

export default keyboardHandlerFilter
