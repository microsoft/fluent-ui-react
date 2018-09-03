import { Accessibility } from '../../interfaces'
import * as keyboardKey from 'keyboard-key'
import callable from '../../../callable'
import ButtonBehavior from '../Button/ButtonBehavior'

const PopupBehavior: Accessibility = (props: any) => ({
  attributes: {
    trigger: {
      ...callable(ButtonBehavior)(props).attributes.root,
      tabIndex: props && props.as === 'button' ? undefined : 0,
      'aria-haspopup': 'true',
    },
  },
  actionsDefinition: {
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
