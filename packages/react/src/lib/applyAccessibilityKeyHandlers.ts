import * as _ from 'lodash'
import * as React from 'react'

import { Props, ShorthandValue } from '../types'
import { AccessibilityHandlerProps, KeyboardEventHandler } from './accessibility/reactTypes'

// Makes sure that 'onKeyDown' is correctly overriden on the slots.
// It should be applied after 'unhandledProps' because they can contain 'onKeyDown' from user and is handled by UTs in isConformant()
const applyAccessibilityKeyHandlers = (
  keyHandlers: AccessibilityHandlerProps,
  value: Props | ShorthandValue<Props>,
) => {
  const valIsPropsObject = _.isPlainObject(value)
  const valIsReactElement = React.isValidElement(value)

  const props =
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
      _.invoke(props, handleName, e, ...args)
    },
  )
}

export default applyAccessibilityKeyHandlers
