import { AutoFocusZoneProps } from 'src/lib/accessibility/FocusZone/AutoFocusZone.types'

export interface FocusTrapZoneProps extends AutoFocusZoneProps {
  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @default The element.target that triggered the FTZ.
   */
  elementToFocusOnDismiss?: HTMLElement

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
   * @default true
   */
  forceFocusInsideTrap?: boolean
}
