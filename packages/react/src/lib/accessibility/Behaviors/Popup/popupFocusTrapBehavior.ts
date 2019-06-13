import { Accessibility } from '../../types'
import popupBehavior, { PopupBehaviorProps } from './popupBehavior'

/**
 * @description
 * Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 *
 * @specification
 * Adds attribute 'aria-disabled=true' to 'trigger' component's part if 'disabled' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-modal=true' to 'popup' component's part.
 * Adds attribute 'role=dialog' to 'popup' component's part.
 * Traps focus inside component.
 */
const popupFocusTrapBehavior: Accessibility<PopupBehaviorProps> = props => {
  const behaviorData = popupBehavior(props)
  behaviorData.attributes.popup = {
    ...behaviorData.attributes.popup,
    'aria-modal': true,
    role: 'dialog',
  }
  behaviorData.focusTrap = true

  return behaviorData
}

export default popupFocusTrapBehavior
