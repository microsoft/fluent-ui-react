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
      openAndFocus: {
        keyCombinations: [
          { keyCode: keyboardKey.Enter },
          { keyCode: keyboardKey.Spacebar },
          { keyCode: keyboardKey.ArrowDown },
        ],
      },
      openAndFocusLast: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
      },
    },
    popup: {
      close: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

export default PopupBehavior
