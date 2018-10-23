export interface FocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ReactType
  className?: string
  elementToFocusOnDismiss?: HTMLElement
  ariaLabelledBy?: string
  isClickableOutsideFocusTrap?: boolean
  ignoreExternalFocusing?: boolean
  forceFocusInsideTrap?: boolean
  firstFocusableSelector?: string | (() => string)
  disableFirstFocus?: boolean
  focusPreviouslyFocusedInnerElement?: boolean
}
