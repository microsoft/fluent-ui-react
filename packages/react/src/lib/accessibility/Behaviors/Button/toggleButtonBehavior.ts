import { Accessibility } from '../../types'
import buttonBehavior from '../Button/buttonBehavior'

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-pressed=true' based on the property 'active'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */

const toggleButtonBehavior: Accessibility = (props: any) => {
  const behaviorData = buttonBehavior(props)
  console.log('toggleButtonBehavior', !!props['active'])
  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'aria-pressed': !!props['active'],
  }

  return behaviorData
}

export default toggleButtonBehavior
