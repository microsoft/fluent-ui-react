import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'

const isButton = props => {
  return props && props.trigger && props.trigger.props && props.trigger.props.as === 'button'
}

const PopupBehavior: Accessibility = (props: any) => ({
  attributes: {
    trigger: {
      role: isButton(props) ? undefined : 'button',
      tabIndex: isButton(props) ? undefined : '0',
      'aria-haspopup': 'true',
      'aria-disabled': !!props['disabled'],
    },
  },
  keyActions: {
    trigger: {
      open: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: keyboardKey.Spacebar }],
      },
      close: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
    popup: {
      closeAndFocusTrigger: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

export default PopupBehavior
