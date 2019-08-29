import * as customPropTypes from '@stardust-ui/react-proptypes'
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
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  isFromKeyboard,
  commonPropTypes,
  AutoControlledComponent,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import Button, { ButtonProps } from '../Button/Button'
import MenuButton, { MenuButtonProps } from '../MenuButton/MenuButton'
import { splitButtonBehavior } from '../../lib/accessibility'
import { MenuProps } from '../Menu/Menu'
import { MenuItemProps } from '../Menu/MenuItem'

export interface SplitButtonSlotClassNames {
  toggleButton: string
}

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Shorthand for the main button. */
  button?: ShorthandValue<ButtonProps>

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Shorthand for the menu. */
  menu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>

  /**
   * Called after user's click on the main button.
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

  /** Defines whether menu is displayed. */
  open?: boolean

  /** A split button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /** A split button can be formatted to show different levels of emphasis. */
  secondary?: boolean

  /** Shorthand for the toggle button. */
  toggleButton?: ShorthandValue<ButtonProps>
}

export interface SplitButtonState {
  isFromKeyboard: boolean
  open: boolean
}

class SplitButton extends AutoControlledComponent<WithAsProp<SplitButtonProps>, SplitButtonState> {
  static create: Function

  static displayName = 'SplitButton'

  static className = 'ui-splitbutton'

  static slotClassNames: SplitButtonSlotClassNames = {
    toggleButton: `${SplitButton.className}__toggleButton`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    button: customPropTypes.itemShorthand,
    defaultOpen: PropTypes.bool,
    menu: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      PropTypes.arrayOf(customPropTypes.itemShorthandWithoutJSX),
    ]),
    onClick: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    open: PropTypes.bool,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    toggleButton: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: splitButtonBehavior,
    as: 'span',
  }

  static autoControlledProps = ['open']

  getInitialAutoControlledState(): SplitButtonState {
    return {
      isFromKeyboard: false,
      open: false,
    }
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { button, menu, primary, secondary, toggleButton } = this.props
    const trigger = Button.create(button, {
      defaultProps: {
        styles: styles.button,
        primary,
        secondary,
      },
    })

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {MenuButton.create(
          {},
          {
            defaultProps: {
              accessibility: accessibility.childBehaviors.menuButton,
              menu,
              styles: styles.button,
              // Opening is handled manually.
              on: [],
              open: this.state.open,
              onOpenChange: (e: React.SyntheticEvent, { open }: MenuButtonProps) => {
                e.stopPropagation()
                this.setState({ open })
              },
              trigger,
            },
            overrideProps: (predefinedProps: MenuButtonProps) => ({
              onMenuItemClick: (e: React.SyntheticEvent, menuItemProps: MenuItemProps) => {
                this.setState({ open: false })

                _.invoke(predefinedProps, 'onMenuItemClick', e, menuItemProps)
                _.invoke(this.props, 'onMenuItemClick', e, menuItemProps)
              },
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                _.invoke(this.props, 'onClick', e, buttonProps)
              },
              onFocus: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onFocus', e, buttonProps)
                this.setState({ isFromKeyboard: isFromKeyboard() })
              },
            }),
          },
        )}
        {Button.create(toggleButton || {}, {
          defaultProps: {
            className: SplitButton.slotClassNames.toggleButton,
            styles: styles.toggleButton,
            icon: 'stardust-arrow-down',
            iconOnly: true,
            primary,
            secondary,
            ...accessibility.attributes.toggleButton,
          },
          overrideProps: (predefinedProps: ButtonProps) => ({
            onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
              _.invoke(predefinedProps, 'onClick', e, buttonProps)
              this.setState(state => ({ open: !state.open }))
            },
          }),
        })}
      </ElementType>
    )
  }
}

/**
 * A SplitButton enables users to take one of several related actions, out of which one is dominant and rest are displayed in an attached menu.
 */
export default withSafeTypeForAs<typeof SplitButton, SplitButtonProps>(SplitButton)
