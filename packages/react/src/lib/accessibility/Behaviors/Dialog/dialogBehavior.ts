import { Accessibility } from '../../types'
import popupFocusTrapBehavior from '../Popup/popupFocusTrapBehavior'
import * as _ from 'lodash'

/**
 * @description
 * Implements ARIA Dialog (Modal) design pattern.
 * Adds role='button' to 'trigger' component's part, if it is not focusable element and no role attribute provided.
 * Adds tabIndex='0' to 'trigger' component's part, if it is not tabbable element and no tabIndex attribute provided.
 *
 * @specification
 * Adds attribute 'aria-disabled=true' to 'trigger' component's part if 'disabled' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-modal=true' to 'popup' component's part.
 * Adds attribute 'role=dialog' to 'popup' component's part.
 * Traps focus inside component.
 */
const dialogBehavior: Accessibility = (props: any) => {
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
 * Returns the element id of the header or generates a default one. Is
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
 * Returns the element id of the header or generates a default one. Is
 * used when user does not provide aria-label or aria-labelledby as
 * props. It is also used as default value for header id if there is not
 * any value provided by user as prop.
 */
const getDefaultAriaDescribedBy = (props: any) => {
  const { content } = props
  if (props['aria-describedby'] || !content) {
    return undefined
  }
  return content['id'] || _.uniqueId('dialog-content-')
}

export default dialogBehavior
