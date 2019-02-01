import { KeyCombinations, KeyboardHandler } from './accessibility/types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

const keyboardHandlerFilter = (handler: KeyboardHandler, keysCombinations: KeyCombinations[]) => (
  event: KeyboardEvent,
) => {
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  const isHandled = _.some(
    keysCombinations,
    keysCombination =>
      keysCombination.keyCode === keyboardKey.getCode(event) &&
      (!keysCombination.altKey || altKey) &&
      (!keysCombination.shiftKey || shiftKey) &&
      (!keysCombination.metaKey || metaKey) &&
      (!keysCombination.ctrlKey || ctrlKey),
  )
  if (isHandled) {
    handler(event)
  }
}

export default keyboardHandlerFilter
