import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import { documentRef, EventListener } from '@stardust-ui/react-component-event-listener'

import {
  UIComponent,
  createShorthandFactory,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
  isFromKeyboard,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
  Omit,
  ShorthandCollection,
} from '../../types'
import { Popper } from '../../lib/positioner'
import { Accessibility } from '../../lib/accessibility/types'
import { toolbarItemBehavior, popupFocusTrapBehavior } from '../../lib/accessibility'

import ToolbarMenu from './ToolbarMenu'
import Icon from '../Icon/Icon'
import Popup, { PopupProps } from '../Popup/Popup'
import { mergeComponentVariables } from '../../lib/mergeThemes'

export interface ToolbarItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default toolbarItemBehavior
   */
  accessibility?: Accessibility

  /** A toolbar item can be active. */
  active?: boolean

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue

  /** Shorthand for the submenu. */
  menu?: ShorthandValue | ShorthandCollection

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean

  /**
   * Event for request to change 'menuOpen' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onMenuOpenChange?: ComponentEventHandler<ToolbarItemProps>

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ToolbarItemProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarItemProps>

  /**
   * Called after item blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarItemProps>

  /**
   * Attaches a `Popup` component to the ToolbarItem.
   * Accepts all props as a `Popup`, except `trigger` and `children`.
   * Sets `accessibility` to `popupFocusTrapBehavior` by default.
   * @see PopupProps
   */
  popup?: Omit<PopupProps, 'trigger' | 'children'> | string
}

export interface ToolbarItemState {
  isFromKeyboard: boolean
}

class ToolbarItem extends UIComponent<WithAsProp<ToolbarItemProps>, ToolbarItemState> {
  static displayName = 'ToolbarItem'

  static className = 'ui-toolbar__item'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
    menuOpen: PropTypes.bool,
    onMenuOpenChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    popup: PropTypes.oneOfType([
      PropTypes.shape({
        ...Popup.propTypes,
        trigger: customPropTypes.never,
        children: customPropTypes.never,
      }),
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    as: 'button',
    accessibility: toolbarItemBehavior as Accessibility,
  }

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
  }

  itemRef = React.createRef<HTMLElement>()
  menuRef = React.createRef<HTMLElement>()

  renderComponent({ ElementType, classes, unhandledProps, accessibility, variables }) {
    const { icon, children, disabled, popup, menu, menuOpen } = this.props
    const renderedItem = (
      <ElementType
        {...accessibility.attributes.root}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        {...unhandledProps}
        disabled={disabled}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? children : Icon.create(icon)}
      </ElementType>
    )

    const submenu = menuOpen ? (
      <>
        <Ref innerRef={this.menuRef}>
          <Popper align="start" position="above" targetRef={this.itemRef}>
            {ToolbarMenu.create(menu, {
              overrideProps: predefinedProps => ({
                onItemClick: (e, itemProps) => {
                  _.invoke(predefinedProps, 'onItemClick', e, itemProps)
                  // TODO: should we pass toolbarMenuItem to the user callback so he can decide if he wants to close the menu?
                  this.trySetMenuOpen(false, e)
                },
                variables: mergeComponentVariables(variables, predefinedProps.variables),
              }),
            })}
          </Popper>
        </Ref>
        <EventListener
          listener={this.handleOutsideClick}
          targetRef={documentRef}
          type="click"
          capture
        />
      </>
    ) : null

    if (popup) {
      return Popup.create(popup, {
        defaultProps: {
          accessibility: popupFocusTrapBehavior,
        },
        overrideProps: {
          trigger: renderedItem,
          children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger
        },
      })
    }

    return (
      <>
        <Ref innerRef={this.itemRef}>{renderedItem}</Ref>
        {submenu}
      </>
    )
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleClick = (e: React.SyntheticEvent) => {
    const { disabled, menu, menuOpen } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (menu) {
      this.trySetMenuOpen(!menuOpen, e)
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleOutsideClick = (e: Event) => {
    if (
      !doesNodeContainClick(this.menuRef.current, e) &&
      !doesNodeContainClick(this.itemRef.current, e)
    ) {
      this.trySetMenuOpen(false, e)
    }
  }

  trySetMenuOpen(newValue: boolean, e: Event | React.SyntheticEvent) {
    _.invoke(this.props, 'onMenuOpenChange', e, { ...this.props, menuOpen: newValue })
  }
}

ToolbarItem.create = createShorthandFactory({ Component: ToolbarItem, mappedProp: 'content' })

/**
 * Toolbar item.
 * The item renders as a button with an icon.
 */
export default withSafeTypeForAs<typeof ToolbarItem, ToolbarItemProps, 'button'>(ToolbarItem)
