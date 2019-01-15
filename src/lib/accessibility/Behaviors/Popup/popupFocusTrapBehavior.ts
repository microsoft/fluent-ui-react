import { Accessibility } from '../../types'
import popupBehavior from './popupBehavior'

/**
 * @description
 * Adds role='button' to 'trigger' component's part, if it is not focusable element and no role attribute provided.
 * Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 *
 * @specification
 * Adds attribute 'aria-disabled=true' to 'trigger' component's part if 'disabled' property is true. Does not set the attribute otherwise.
 * Traps focus inside component.
 */
const popupFocusTrapBehavior: Accessibility = (props: any) => ({
  ...popupBehavior(props),
  focusTrap: true,
})

export default popupFocusTrapBehavior
