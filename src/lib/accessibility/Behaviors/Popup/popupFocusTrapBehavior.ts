import { Accessibility } from '../../types'
import popupBehavior from './popupBehavior'
import * as _ from 'lodash'

/**
 * @description
 * Adds role='button' to 'trigger' component's part, if it is not focusable element and no role attribute provided.
 * Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 * Adds attribute 'aria-disabled=true' to 'trigger' component's part based on the property 'disabled'.
 * Wraps component in FocusTrapZone, with default prop 'isClickableOutsideFocusTrap' set to 'true'.
 */
const popupFocusTrapBehavior: Accessibility = (props: any) => ({
  ...popupBehavior(props),
  focusTrapZone: true,
})

export default popupFocusTrapBehavior
