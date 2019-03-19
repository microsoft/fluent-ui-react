import * as _ from 'lodash'

import { Props } from '../types'
import { KeyboardHandler, OnKeyDownHandler } from './accessibility/types'

const applyAccessibilityKeyHandlers = (keyHandlers: OnKeyDownHandler, passedProps: Props) =>
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

export default applyAccessibilityKeyHandlers
