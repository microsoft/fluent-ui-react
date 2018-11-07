import { Accessibility } from '../../types'
import * as _ from 'lodash'

/**
 * @description
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button
 * Adds attribute 'aria-pressed=true' based on the property 'active'. This can be overriden by providing 'aria-presssed' property directly to the component.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */

const toggleButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-disabled': !_.isNil(props['aria-disabled'])
        ? props['aria-disabled']
        : !!props['disabled'],
      'aria-pressed': !_.isNil(props['aria-presssed']) ? props['aria-presssed'] : !!props['active'],
    },
  },
})

export default toggleButtonBehavior
