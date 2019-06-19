import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'

import {
  UIComponent,
  createShorthandFactory,
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
import { buttonBehavior, popupFocusTrapBehavior } from '../../lib/accessibility'

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
   * @default buttonBehavior
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
    menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]), // collides with popup
    menuOpen: PropTypes.bool,
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
    accessibility: buttonBehavior as Accessibility,
  }

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
  }

  itemRef = React.createRef<HTMLElement>()

  renderComponent({ ElementType, classes, unhandledProps, accessibility, variables }) {
    const { icon, children, disabled, popup } = this.props
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

    const submenu = this.props.menuOpen ? (
      <Popper align="start" position="above" targetRef={this.itemRef}>
        {ToolbarMenu.create(this.props.menu, {
          overrideProps: predefinedProps => ({
            variables: mergeComponentVariables(variables, predefinedProps.variables),
          }),
        })}
      </Popper>
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
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }
}

ToolbarItem.create = createShorthandFactory({ Component: ToolbarItem, mappedProp: 'content' })

/**
 * Toolbar item.
 * The item renders as a button with an icon.
 */
export default withSafeTypeForAs<typeof ToolbarItem, ToolbarItemProps, 'button'>(ToolbarItem)
