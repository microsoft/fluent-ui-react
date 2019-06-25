import { KeyCombinations } from './accessibility/types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as React from 'react'

const isKeyModifiersMatch = (modifierValue: boolean, combinationValue?: boolean) => {
  if (combinationValue === undefined) {
    return true
  }

  return modifierValue === combinationValue
}

const shouldHandleOnKeys = (
  event: React.KeyboardEvent,
  keysCombinations: KeyCombinations[],
): boolean =>
  _.some(
    keysCombinations,
    (keysCombination: KeyCombinations) =>
      keysCombination.keyCode === keyboardKey.getCode(event) &&
      isKeyModifiersMatch(event.altKey, keysCombination.altKey) &&
      isKeyModifiersMatch(event.shiftKey, keysCombination.shiftKey) &&
      isKeyModifiersMatch(event.metaKey, keysCombination.metaKey) &&
      isKeyModifiersMatch(event.ctrlKey, keysCombination.ctrlKey),
  )

export default shouldHandleOnKeys
