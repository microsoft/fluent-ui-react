import { KeyCombinations, KeyboardHandler } from '../interfaces'
import keyboardKey from 'keyboard-key'
const keyboardHandlerFilter = (handler: KeyboardHandler, keysCombinations: KeyCombinations[]) => (
  event: React.KeyboardEvent,
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
export default keyboardHandlerFilter
