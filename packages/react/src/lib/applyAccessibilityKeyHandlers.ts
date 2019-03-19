import * as _ from 'lodash'

import { Props, ShorthandValue } from '../types'
import { KeyboardHandler, OnKeyDownHandler } from './accessibility/types'

const applyAccessibilityKeyHandlers = (
  keyHandlers: OnKeyDownHandler,
  value: Props | ShorthandValue,
) => {
  const slotProps: Props = typeof value === 'object' ? value : {}

  return _.mapValues(
    keyHandlers,
    (accessibilityHandler: KeyboardHandler, handleName: string) => (
      e: KeyboardEvent,
      ...args: any[]
    ) => {
      accessibilityHandler(e)
      _.invoke(slotProps, handleName, e, ...args)
    },
  )
}

export default applyAccessibilityKeyHandlers
