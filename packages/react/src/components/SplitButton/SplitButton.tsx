import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  WithAsProp,
  withSafeTypeForAs,
  ComponentEventHandler,
  ShorthandValue,
  ShorthandCollection,
} from '../../types'
import {
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  isFromKeyboard,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import Button, { ButtonProps } from '../Button/Button'
import MenuButton, { MenuButtonProps } from '../MenuButton/MenuButton'
import { splitButtonBehavior } from '../../lib/accessibility'
import { MenuProps } from '../Menu/Menu'
import { MenuItemProps } from '../Menu/MenuItem'

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Element to be rendered in-place where the popup is defined. */
  button?: ShorthandValue<ButtonProps>

  /** Element to be rendered in-place where the popup is defined. */
  menu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>

  /**
   * Called after user's click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /**
   * Called after user's click on a menu item.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMenuItemClick?: ComponentEventHandler<MenuItemProps>

  /** A split button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /** A split button can be formatted to show different levels of emphasis. */
  secondary?: boolean
}

class SplitButton extends UIComponent<WithAsProp<SplitButtonProps>> {
  static create: Function

  static displayName = 'SplitButton'

  static className = 'ui-splitbutton'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    button: customPropTypes.itemShorthand,
    menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.itemShorthand]),
    onClick: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  }

  static defaultProps = {
    accessibility: splitButtonBehavior,
    as: 'div',
  }

  state = {
    isFromKeyboard: false,
  }

  buttonRef = React.createRef<HTMLElement>()
  menuButtonRef = React.createRef<MenuButton>()

  actionHandlers = {
    closeMenuAndFocusButton: e => {
      e.preventDefault()
      this.closeMenu()
      this.buttonRef.current.focus()
    },
    openAndFocusFirst: e => this.openAndFocusFirst(e),
  }

  closeMenu() {
    this.menuButtonRef.current.closeMenu()
  }

  openAndFocusFirst(e) {
    this.menuButtonRef.current.openAndFocus(e, 'first')
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { button, menu, primary, secondary } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <Ref innerRef={this.buttonRef}>
          {Button.create(button, {
            defaultProps: {
              styles: styles.button,
              primary,
              secondary,
              ...accessibility.attributes.button,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.button, button),
            },
            overrideProps: (predefinedProps: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                _.invoke(this.props, 'onClick', e, buttonProps)
              },
              onFocus: () => {
                this.setState({ isFromKeyboard: isFromKeyboard() })
              },
            }),
          })}
        </Ref>
        {MenuButton.create(
          {},
          {
            defaultProps: {
              accessibility: accessibility.childBehaviors.menuButton,
              menu,
              ref: this.menuButtonRef,
              styles: styles.menuButton,
              trigger: (
                <Button
                  styles={styles.menuButton}
                  icon="chevron-down"
                  iconOnly
                  primary={primary}
                  secondary={secondary}
                />
              ),
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.menuButton, menu),
            },
            overrideProps: (predefinedProps: MenuButtonProps) => ({
              onMenuItemClick: (e: React.SyntheticEvent, menuItemProps: MenuItemProps) => {
                _.invoke(predefinedProps, 'onMenuItemClick', e, menuItemProps)
                _.invoke(this.props, 'onMenuItemClick', e, menuItemProps)
                this.buttonRef.current.focus()
              },
            }),
          },
        )}
      </ElementType>
    )
  }
}

/**
 * A ButtonGroup represents multiple related actions as a group.
 */
export default withSafeTypeForAs<typeof SplitButton, SplitButtonProps>(SplitButton)
