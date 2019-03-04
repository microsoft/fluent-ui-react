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

  /**
   * Do not put focus onto first element when render focus trap zone
   * @default false
   */
  disableFirstFocus?: boolean

  /**
   * Specifies the algorithm used to determine which descendant element to focus when focus() is called.
   * If false, the first focusable descendant, filtered by the firstFocusableSelector property if present, is chosen.
   * If true, the element that was focused when the Trap Zone last had a focused descendant is chosen.
   * If it has never had a focused descendant before, behavior falls back to the first focused descendant.
   * @default false
   */
  focusPreviouslyFocusedInnerElement?: boolean
}
