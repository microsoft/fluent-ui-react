import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { PopupBehaviorProps } from '../Popup/popupBehavior'
import popupAutoFocusBehavior from '../Popup/popupAutoFocusBehavior'

const contextMenuBehavior: Accessibility<ContextMenuBehaviorProps> = props => {
  const behavior = popupAutoFocusBehavior(props)
  return _.merge(behavior, {
    autoFocus: props.autoFocus,
    attributes: {
      root: {
        role: 'none',
      },
      trigger: {
        'aria-controls': props.menuId,
        'aria-expanded': props.menuOpen || undefined,
        'aria-haspopup': 'true',
        id: props.triggerId,
        tabIndex: props.menuOpen ? -1 : undefined,
      },

      menu: {
        'aria-labelledby': props.triggerId,
        id: props.menuId,
      },

      menuItem: {
        tabIndex: -1,
      },
    },
    keyActions: {
      root: {
        ...(props.menuOpen
          ? {
              closeAndFocusNext: {
                keyCombinations: [{ keyCode: keyboardKey.Tab, shiftKey: false }],
              },
              closeAndFocusPrevious: {
                keyCombinations: [{ keyCode: keyboardKey.Tab, shiftKey: true }],
              },
            }
          : _.includes(props.on, 'click') && {
              openAndFocusFirst: {
                keyCombinations: [
                  { keyCode: keyboardKey.Enter },
                  { keyCode: keyboardKey.Space },
                  { keyCode: keyboardKey.ArrowDown },
                ],
              },
              openAndFocusLast: {
                keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
              },
            }),
      },
    },
  })
}

export interface ContextMenuBehaviorProps extends PopupBehaviorProps {
  /** menu id */
  menuId?: string
  /** button id */
  triggerId?: string
  /** menuOpen */
  menuOpen?: boolean
  /** auto focus */
  autoFocus: boolean
}

export default contextMenuBehavior
