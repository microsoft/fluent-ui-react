import {
  AccessibilityAttributes,
  ReactAccessibilityBehavior,
  Popup,
  Menu,
  MenuItemProps,
  MenuProps,
  Ref,
  ShorthandValue,
  PopupProps,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as keyboardKey from 'keyboard-key'
import * as React from 'react'

import { focusMenuItem, focusNearest } from './focusUtils'
import menuButtonBehavior from './menuButtonBehavior'
import { popupBehavior } from '@stardust-ui/react/src/lib/accessibility'

export interface MenuButtonProps extends PopupProps {
  menu: ShorthandValue<MenuProps>
}

export interface MenuButtonState {
  lastKeyCode: null | number
  lastShiftKey: boolean
  menuOpen: boolean
  menuId: string
  buttonId: string
}

// TODO: spread unhandled props to root
// TODO: id generation - should we respect <Button id="" />?
// TODO: test with aria-owns
// TODO: rename to ContextMenu?
// TODO: should enter move focus back to trigger? should click move focus back to trigger?
// TODO: for contextmenu - if focus was inside of the trigger (not on trigger), should it return there?
// TODO: allow passing onOpenChange
// TODO: for toolbar menu, left+right arrow keys need to be handled (stopPropagation)
class MenuButton extends React.Component<MenuButtonProps, MenuButtonState> {
  static defaultProps = {
    position: 'bottom',
    align: 'start',
  }

  state: MenuButtonState = {
    lastKeyCode: null,
    lastShiftKey: false,
    menuOpen: false,
    buttonId: _.uniqueId('menubutton'),
    menuId: _.uniqueId('menu'),
  }

  buttonRef = React.createRef<HTMLElement>()
  menuRef = React.createRef<HTMLElement>()

  componentDidUpdate(_, prevState: MenuButtonState) {
    if (!prevState.menuOpen && this.state.menuOpen) {
      focusMenuItem(
        this.menuRef.current,
        this.state.lastKeyCode === keyboardKey.ArrowUp ? 'last' : 'first',
      )
    }

    if (prevState.menuOpen && !this.state.menuOpen) {
      switch (this.state.lastKeyCode) {
        case keyboardKey.Enter:
        case keyboardKey.Escape:
          this.buttonRef.current.focus()
          break

        case keyboardKey.Tab:
          focusNearest(this.buttonRef.current, this.state.lastShiftKey ? 'previous' : 'next')
          break
      }
    }
  }

  handleOpenChange = (e, { open }) => {
    this.setState(prevState => ({
      lastKeyCode: null,
      menuOpen: open,
    }))
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    const { menuOpen } = this.state

    const keyCode = keyboardKey.getCode(e)
    const shouldClose =
      menuOpen && _.includes([keyboardKey.Tab, keyboardKey.Enter, keyboardKey.Space], keyCode)
    const shouldOpen =
      !menuOpen &&
      _.includes(this.props.on, 'click') &&
      _.includes([keyboardKey.ArrowDown, keyboardKey.ArrowUp], keyCode)

    if (shouldClose) {
      // We should prevent default there otherwise event will be bubbled to a button and will cause menu reopen
      if (keyCode === keyboardKey.Enter) e.preventDefault()

      this.setState({
        lastKeyCode: keyCode,
        lastShiftKey: e.shiftKey,
        menuOpen: false,
      })
    }

    if (shouldOpen) {
      this.setState({ lastKeyCode: keyCode, menuOpen: true })
    }
  }

  handleMenuItemClick = (predefinedProps?: MenuItemProps) => (
    e: React.SyntheticEvent,
    itemProps: MenuItemProps,
  ) => {
    _.invoke(predefinedProps, 'onClick', e, itemProps)
    if (!itemProps || !itemProps.menu) {
      this.setState({ lastKeyCode: null, menuOpen: false })
    }
  }

  handleMenuItemOverrides = (menuItemAccessibilityAttributes: AccessibilityAttributes) =>
    _.map(_.get(this.props.menu, 'items'), (item: ShorthandValue) =>
      typeof item === 'object'
        ? {
            ...item,
            onClick: this.handleMenuItemClick(item as MenuItemProps),
            ...menuItemAccessibilityAttributes,
          }
        : {
            content: item,
            key: item,
            onClick: this.handleMenuItemClick(),
            ...menuItemAccessibilityAttributes,
          },
    )

  render() {
    const { menu, ...rest } = this.props
    const accessibilityBehavior: ReactAccessibilityBehavior = menuButtonBehavior({
      ...this.props,
      ...this.state,
    })

    const popupMenuBehavior = behaviorProps => {
      const behavior = popupBehavior(behaviorProps)
      behavior.attributes.trigger = {
        ...behavior.attributes.trigger,
        ...accessibilityBehavior.attributes.button,
      }
      return behavior
    }

    return (
      <div
        onKeyDown={this.handleKeyDown} // TODO: move to behavior once this becomes a real component
        style={{ boxSizing: 'border-box', display: 'inline-block' }}
      >
        <Ref innerRef={this.buttonRef}>
          <Popup
            accessibility={popupMenuBehavior}
            open={this.state.menuOpen}
            onOpenChange={this.handleOpenChange}
            unstable_pinned
            content={{
              variables: { padding: '', borderSize: '0px' },
              content: (
                <Ref innerRef={this.menuRef}>
                  {Menu.create(menu, {
                    defaultProps: {
                      ...accessibilityBehavior.attributes.menu,
                      styles: { background: '#fff', zIndex: 1 },
                      vertical: true,
                    },
                    overrideProps: {
                      items: this.handleMenuItemOverrides(
                        accessibilityBehavior.attributes.menuItem,
                      ),
                    },
                  })}
                </Ref>
              ),
            }}
            {...rest}
          />
        </Ref>
      </div>
    )
  }
}

export default MenuButton
