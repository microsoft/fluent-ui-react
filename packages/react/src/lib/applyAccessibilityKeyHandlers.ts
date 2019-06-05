import * as _ from 'lodash'
import * as React from 'react'

import { Props, ShorthandValue } from '../types'
import { AccessibilityHandlerProps, KeyboardEventHandler } from './accessibility/reactTypes'

const applyAccessibilityKeyHandlers = (
  keyHandlers: AccessibilityHandlerProps,
  value: Props | ShorthandValue,
) => {
  const valIsPropsObject = _.isPlainObject(value)
  const valIsReactElement = React.isValidElement(value)

  const slotProps =
    (valIsReactElement && (value as React.ReactElement<Props>).props) ||
    (valIsPropsObject && (value as Props)) ||
    {}

  return _.mapValues(
    keyHandlers,
    (accessibilityHandler: KeyboardEventHandler, handleName: string) => (
      e: React.KeyboardEvent,
      ...args: any[]
    ) => {
      accessibilityHandler(e)
      _.invoke(slotProps, handleName, e, ...args)
    },
  )
}

export default applyAccessibilityKeyHandlers
