import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import popupBehavior, { PopupBehaviorProps } from '../Popup/popupBehavior'

const contextMenuBehavior: Accessibility<ContextMenuBehaviorProps> = props => {
  const behavior = popupBehavior(props)
  return _.merge(behavior, {
    attributes: {
      root: {
        role: 'none',
      },
      trigger: {
        'aria-controls': props.menuId,
        'aria-expanded': props.open || undefined,
        'aria-haspopup': 'true',
        id: props.triggerId,
        tabIndex: props.open ? -1 : undefined,
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
        ...(props.open
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
                keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
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
  /** open */
  open?: boolean
}

export default contextMenuBehavior
