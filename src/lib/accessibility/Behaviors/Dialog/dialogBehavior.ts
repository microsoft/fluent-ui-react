import { Accessibility } from '../../types'
import popupBehavior from '../Popup/popupBehavior'
import * as _ from 'lodash'

/**
 * @description
 * Adds role='button' to 'trigger' component's part, if it is not focusable element and no role attribute provided.
 * Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 * Adds attribute 'aria-disabled=true' to 'trigger' component's part based on the property 'disabled'.
 * Adds attribute 'aria-modal=true' to 'popup' component's part.
 * Adds attribute 'role=modal' to 'popup' component's part.
 * Traps focus inside component.
 */
const dialogBehavior: Accessibility = (props: any) => ({
  attributes: _.assign(popupBehavior(props).attributes, {
    popup: {
      role: 'modal',
      'aria-modal': true,
    },
  }),
  focusTrap: true,
  keyActions: popupBehavior(props).keyActions,
})

export default dialogBehavior
