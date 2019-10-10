import * as keyboardKey from 'keyboard-key'

import { Accessibility } from '../../types'
import buttonBehavior, { ButtonBehaviorProps } from '../Button/buttonBehavior'

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Adds attribute 'aria-haspopup=menu' to 'root' slot if 'menu' property is set.
 * Adds attribute 'aria-haspopup=dialog' to 'root' slot if 'popup' property is set.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'closeMenuAndFocusTrigger' action with 'Escape' on 'wrapper', when toolbar button has submenu and it is opened.
 * Triggers 'doNotNavigateNextToolbarItem' action with 'ArrowLeft' or 'ArrowRight' on 'wrapper', when toolbar button has submenu and it is opened.
 */
const toolbarItemBehavior: Accessibility<ToolbarItemBehaviorProps> = props => {
  const behaviorData = buttonBehavior(props)
  behaviorData.attributes.root = {
    ...behaviorData.attributes.root,
    'aria-haspopup': props.popup ? 'dialog' : props.menu ? 'menu' : undefined,
  }
  behaviorData.keyActions.wrapper = {
    ...behaviorData.keyActions.wrapper,
    closeMenuAndFocusTrigger: {
      keyCombinations:
        props.menu && props.menuOpen
          ? [{ keyCode: keyboardKey.Escape }, { keyCode: keyboardKey.Tab, shiftKey: true }]
          : null,
    },
    doNotNavigateNextToolbarItem: {
      keyCombinations:
        props.menu && props.menuOpen
          ? [{ keyCode: keyboardKey.ArrowLeft }, { keyCode: keyboardKey.ArrowRight }]
          : null,
    },
  }
  return behaviorData
}

export default toolbarItemBehavior

export type ToolbarItemBehaviorProps = {
  /** Indicated if toolbar item has a menu. */
  menu?: boolean | object
  /** If the menu is in open state. */
  menuOpen?: boolean
  /** Indicated if toolbar item has a popup. */
  popup?: boolean | object
} & ButtonBehaviorProps
