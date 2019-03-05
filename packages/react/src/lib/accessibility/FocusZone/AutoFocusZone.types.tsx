import * as React from 'react'

export interface AutoFocusZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element type the root element will use. Default is "div".
   */
  as?: React.ReactType

  /**
   * Indicates the selector for first focusable item.  Only applies if focusPreviouslyFocusedInnerElement == false.
   */
  firstFocusableSelector?: string | (() => string)
}
