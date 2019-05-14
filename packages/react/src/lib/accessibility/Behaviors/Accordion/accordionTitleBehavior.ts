import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @specification
 */
const accordionTitleBehavior: Accessibility = (props: any) => {
  const isHeading = /(h\d{1})$/.test(props.as)
  return {
    attributes: {
      root: {
        role: isHeading ? undefined : 'heading',
        'aria-level': isHeading ? undefined : 3,
      },
      button: {
        'aria-expanded': !!props.active,
        'aria-disabled': !!(props.active && props.cannotBeClosed),
        'aria-owns': props.contentId,
      },
    },
    keyActions: {
      button: {
        performClick: {
          keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
        },
      },
    },
  }
}

export default accordionTitleBehavior
