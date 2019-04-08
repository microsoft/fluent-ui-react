import * as React from 'react'

export interface FocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element type the root element will use. Default is "div".
   */
  as?: React.ReactType

  /**
   * Additional CSS class name(s) to apply.
   */
  className?: string

  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @default The element.target that triggered the FTZ.
   */
  elementToFocusOnDismiss?: HTMLElement

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string

  /**
   * Indicates if this Trap Zone will allow clicks outside the FocusTrapZone
   * @default true
   */
  isClickableOutsideFocusTrap?: boolean

  /**
   * Indicates if the previously focused element outside FocusTrapZone should be focused on outside click.
   * Note: trigger will be focused when exiting FTZ using keyboard.
   * If isClickableOutsideFocusTrap === 'false', focusTriggerOnOutsideClick will not be taken into account.
   * @default false
   */
  focusTriggerOnOutsideClick?: boolean

  /**
   * Indicates if this Trap Zone will ignore keeping track of HTMLElement that activated the Zone.
   * @default false
   */
  ignoreExternalFocusing?: boolean

  /**
   * Indicates whether focus trap zone should force focus inside the focus trap zone
   * @default false
   */
  forceFocusInsideTrap?: boolean

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
