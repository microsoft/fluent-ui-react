import { Accessibility } from '../../types'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */

const inputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': !_.isNil(props['aria-disabled'])
        ? props['aria-disabled']
        : !!props['disabled'],
    },
  },
  keyActions: {
    input: {
      clear: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

export default inputBehavior
