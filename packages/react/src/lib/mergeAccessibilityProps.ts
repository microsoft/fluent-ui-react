import * as _ from 'lodash'

import { Props } from '../types'
import { AccessibilityBehavior, KeyboardHandler, OnKeyDownHandler } from './accessibility/types'

const mergeKeyHandlers = (keyHandlers: OnKeyDownHandler, passedProps: Props) =>
  _.mapValues(
    keyHandlers,
    (accessibilityHandler: KeyboardHandler, handleName: string) => (
      e: KeyboardEvent,
      ...args: any[]
    ) => {
      accessibilityHandler(e)
      _.invoke(passedProps, handleName, e, ...args)
    },
  )

const mergeAccessibilityProps = <A extends AccessibilityBehavior>(
  accessibility: A,
  slotName: string,
  props: Props,
) => {
  let debugProps = {}

  if (process.env.NODE_ENV !== 'production') {
    debugProps = {
      'data-accessibility-slot': slotName,
      'data-accessibility-has-handlers': !!accessibility.keyHandlers[slotName],
    }
  }

  return {
    debugProps,
    ...accessibility.attributes[slotName],
    ...props,
    ...mergeKeyHandlers(accessibility.keyHandlers[slotName], props),
  }
}

export default mergeAccessibilityProps
