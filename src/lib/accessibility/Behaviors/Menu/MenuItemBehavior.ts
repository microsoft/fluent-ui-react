import { Accessibility, IAccessibilityDefinition } from '../../interfaces'
import keyListener from '../../../keyListenerDecorator'
import { KeyCodes } from '../../../KeyCodes'
import keyboardKey from 'keyboard-key'

const MenuItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'menuitem',
      'aria-expanded': props['submenuOpened'],
      tabIndex: '0',
    },
  },

  eventHandlers: {},

  actionsDefinition: {
    moveLeft: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.left],
        eventDecorator: keyDownDecorator,
      },
    ],
    moveRight: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.right],
        eventDecorator: keyDownDecorator,
      },
    ],
    moveUp: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.up],
        eventDecorator: keyDownDecorator,
      },
    ],
    moveDown: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.down],
        eventDecorator: keyDownDecorator,
      },
    ],
    triggerClick: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.enter, KeyCodes.space],
        eventDecorator: keyDownDecorator,
      },
      {
        eventName: 'click',
      },
    ],
    moveFisrst: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.home],
        eventDecorator: keyDownDecorator,
      },
    ],
    moveLast: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.end],
        eventDecorator: keyDownDecorator,
      },
    ],
    closeSubmenu: [
      {
        eventName: 'keydown',
        keyCodes: [KeyCodes.escape],
        eventDecorator: keyDownDecorator,
      },
    ],
  },
})

const keyDownDecorator = (handler: Function, keyCodes?: KeyCodes[]) => (event: Event) => {
  if (keyCodes.indexOf(keyboardKey.getCode(event)) < 0) return
  handler(event)
}

export default MenuItemBehavior
