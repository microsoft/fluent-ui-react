import { KeyCombinations } from './accessibility/types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as React from 'react'

const shouldHandleModifier = (modifierValue: boolean, combinationValue?: boolean) => {
  if (typeof combinationValue === 'undefined') {
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
      shouldHandleModifier(event.altKey, keysCombination.altKey) &&
      shouldHandleModifier(event.shiftKey, keysCombination.shiftKey) &&
      shouldHandleModifier(event.metaKey, keysCombination.metaKey) &&
      shouldHandleModifier(event.ctrlKey, keysCombination.ctrlKey),
  )

export default shouldHandleOnKeys
