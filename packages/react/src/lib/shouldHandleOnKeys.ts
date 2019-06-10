import { KeyCombinations } from './accessibility/types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import * as React from 'react'

const shouldHandleOnKeys = (
  event: React.KeyboardEvent,
  keysCombinations: KeyCombinations[],
): boolean =>
  _.some(
    keysCombinations,
    keysCombination =>
      keysCombination.keyCode === keyboardKey.getCode(event) &&
      (!keysCombination.altKey || event.altKey) &&
      (!keysCombination.shiftKey || event.shiftKey) &&
      (!keysCombination.metaKey || event.metaKey) &&
      (!keysCombination.ctrlKey || event.ctrlKey),
  )

export default shouldHandleOnKeys
