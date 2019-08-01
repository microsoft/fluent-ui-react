import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import {
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ShorthandValue,
  ComponentEventHandler,
} from '../../types'
import {
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  applyAccessibilityKeyHandlers,
  commonPropTypes,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import Button, { ButtonProps } from './Button'
import { MenuItemProps } from '../Menu/MenuItem'
import Menu from '../Menu/Menu'
import { Ref } from '@stardust-ui/react-component-ref'

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Menu. */
  items: ShorthandCollection<MenuItemProps>

  /** Index of the item that appears on the button. Default is 0. */
  mainItemIndex: number

  /**
   * Called after user's click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>

  /**
   * Called when an item is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<MenuItemProps>

  /**
   * Called after user's click on the toggle button.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onToggle?: ComponentEventHandler<ButtonProps>

  /** The toggle button to display menu of items. */
  toggleButton?: ShorthandValue<ButtonProps>

  /** A split button can be formatted to show different levels of emphasis. */
  primary?: boolean

  /** A split button can be formatted to show different levels of emphasis. */
  secondary?: boolean
}

export interface SplitButtonState {
  mainItemIndex: number
  open: boolean
}

class SplitButton extends UIComponent<WithAsProp<SplitButtonProps>, SplitButtonState> {
  static create: Function

  static displayName = 'SplitButton'

  static className = 'ui-splitbutton'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    items: customPropTypes.collectionShorthand,
    mainItemIndex: PropTypes.number,
    onClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onToggle: PropTypes.func,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    toggleButton: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'div',
    primary: true,
  }

  state = {
    mainItemIndex: this.props.mainItemIndex || 0,
    open: false,
  }

  menuRef = React.createRef<HTMLElement>()

  handleToggleButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, toggleButtonProps: ButtonProps) => {
      this.setState(state => ({ open: !state.open }))
      _.invoke(predefinedProps, 'onToggle', e, toggleButtonProps)
    },
    onBlur: (e, toggleButtonProps: ButtonProps) => {
      if (open && !this.menuRef.current.contains(e.relatedTarget)) {
        this.setState({ open: false })
      }
      _.invoke(predefinedProps, 'onBlur', e, toggleButtonProps)
    },
  })

  handleItemClick = (e: React.SyntheticEvent, props: MenuItemProps) => {
    this.setState({
      mainItemIndex: props.index,
      open: false,
    })
    _.invoke(this.props, 'onItemClick', e, props)
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    variables,
    styles,
    unhandledProps,
  }): React.ReactNode {
    const { open, mainItemIndex } = this.state
    const { items, toggleButton, onClick, primary, secondary } = this.props

    return (
      <ElementType
        className={classes.root}
        onClick={onClick}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {Button.create(items[mainItemIndex], {
          defaultProps: {
            styles: styles.button,
            variables: variables.button,
            primary,
            secondary,
          },
        })}
        {Button.create(toggleButton || {}, {
          defaultProps: {
            styles: styles.toggleButton,
            variables: variables.toggleButton,
            icon: 'chevron-down',
            iconOnly: true,
            primary,
            secondary,
          },
          overrideProps: this.handleToggleButtonOverrides,
        })}
        {open && (
          <Ref innerRef={this.menuRef}>
            <Menu items={items} vertical onItemClick={this.handleItemClick} />
          </Ref>
        )}
      </ElementType>
    )
  }
}

/**
 * A ButtonGroup represents multiple related actions as a group.
 */
export default withSafeTypeForAs<typeof SplitButton, SplitButtonProps>(SplitButton)
