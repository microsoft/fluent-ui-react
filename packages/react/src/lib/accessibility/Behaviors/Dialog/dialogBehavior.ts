import { Accessibility, AccessibilityAttributes } from '../../types'
import popupFocusTrapBehavior from '../Popup/popupFocusTrapBehavior'
import { PopupBehaviorProps } from '../Popup/popupBehavior'
import * as _ from 'lodash'

/**
 * @description
 * Implements ARIA Dialog (Modal) design pattern.
 * Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 *
 * @specification
 * Adds attribute 'aria-disabled=true' to 'trigger' component's part if 'disabled' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-modal=true' to 'popup' component's part.
 * Adds attribute 'role=dialog' to 'popup' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'popup' component's part.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'popup' component's part.
 * Generates unique ID and adds it as attribute 'id' to the 'header' component's part if it has not been provided by the user.
 * Generates unique ID and adds it as attribute 'id' to the 'content' component's part if it has not been provided by the user.
 * Traps focus inside component.
 */
const dialogBehavior: Accessibility<DialogBehaviorProps> = props => {
  const behaviorData = popupFocusTrapBehavior(props)
  const defaultAriaLabelledBy = getDefaultAriaLabelledBy(props)
  const defaultAriaDescribedBy = getDefaultAriaDescribedBy(props)
  behaviorData.attributes.popup = {
    ...behaviorData.attributes.popup,
    role: 'dialog',
    'aria-labelledby': defaultAriaLabelledBy || props['aria-labelledby'],
    'aria-describedby': defaultAriaDescribedBy || props['aria-describedby'],
  }
  behaviorData.attributes.header = {
    id: defaultAriaLabelledBy,
  }
  behaviorData.attributes.content = {
    id: defaultAriaDescribedBy,
  }

  return behaviorData
}

/**
 * Returns the element id of the header or generates a default one. It is
 * used when user does not provide aria-label or aria-labelledby as
 * props. It is also used as default value for header id if there is not
 * any value provided by user as prop.
 */
const getDefaultAriaLabelledBy = (props: any) => {
  const { header } = props
  if (props['aria-label'] || props['aria-labelledby'] || !header) {
    return undefined
  }
  return header['id'] || _.uniqueId('dialog-header-')
}

/**
 * Returns the element id of the content or generates a default one. It is
 * used when user does not provide aria-describedby as props. It is also
 * used as default value for content id if there is not any value provided by
 * user as prop.
 */
const getDefaultAriaDescribedBy = (props: any) => {
  const { content } = props
  if (props['aria-describedby'] || !content) {
    return undefined
  }
  return content['id'] || _.uniqueId('dialog-content-')
}

export default dialogBehavior

type DialogBehaviorProps = {
  header?: {
    id?: string
  }
  content?: {
    id?: string
  }
} & PopupBehaviorProps &
  Pick<AccessibilityAttributes, 'aria-label' | 'aria-labelledby' | 'aria-describedby'>
