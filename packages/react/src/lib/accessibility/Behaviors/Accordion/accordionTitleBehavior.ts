import { Accessibility } from '../../types'
// import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 * Adds attribute 'tabIndex=0' to 'root' component's part.
 */
const accordionTitleBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      tabIndex: 0,
    },
  },
  keyActions: {
    root: {},
  },
})

export default accordionTitleBehavior
