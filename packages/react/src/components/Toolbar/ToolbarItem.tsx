import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import cx from 'classnames'
import { Ref, toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'

import {
  UIComponent,
  createShorthandFactory,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
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
import { toolbarItemBehavior } from '../../lib/accessibility'

import ToolbarMenu, { ToolbarMenuProps } from './ToolbarMenu'
import Icon, { IconProps } from '../Icon/Icon'
import Box, { BoxProps } from '../Box/Box'
import Popup, { PopupProps } from '../Popup/Popup'
import { mergeComponentVariables } from '../../lib/mergeThemes'
import { ToolbarMenuItemProps } from '../Toolbar/ToolbarMenuItem'
import { ToolbarItemShorthandKinds } from '@stardust-ui/react'
import {
  GetRefs,
  NodeRef,
  Unstable_NestingAuto,
} from '@stardust-ui/react-component-nesting-registry'

export interface ToolbarItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** A toolbar item can be active. */
  active?: boolean

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<IconProps>

  /**
   * Shorthand for the submenu.
   * If submenu is specified, the item is wrapped to group the item and the menu elements together.
   */
  menu?:
    | ShorthandValue<ToolbarMenuProps>
    | ShorthandCollection<ToolbarMenuItemProps, ToolbarItemShorthandKinds>

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
   * Traps focus by default.
   * @see PopupProps
   */
  popup?: Omit<PopupProps, 'trigger' | 'children'> | string

  /** Shorthand for the wrapper component. The item is wrapped only if it contains a menu! */
  wrapper?: ShorthandValue<BoxProps>
}

export interface ToolbarItemSlotClassNames {
  wrapper: string
}

class ToolbarItem extends UIComponent<WithAsProp<ToolbarItemProps>> {
  static displayName = 'ToolbarItem'

  static className = 'ui-toolbar__item'

  static slotClassNames: ToolbarItemSlotClassNames = {
    wrapper: `${ToolbarItem.className}__wrapper`,
  }

  static create: ShorthandFactory<ToolbarItemProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthandWithoutJSX,
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
    wrapper: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'button',
    accessibility: toolbarItemBehavior as Accessibility,
    wrapper: {},
  }

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
    closeMenuAndFocusTrigger: event => {
      this.trySetMenuOpen(false, event)
      if (this.itemRef) {
        this.itemRef.current.focus()
      }
    },
    doNotNavigateNextToolbarItem: event => {
      event.stopPropagation()
    },
  }

  itemRef = React.createRef<HTMLElement>()

  handleMenuOverrides = (getRefs: GetRefs, variables) => (predefinedProps: ToolbarItemProps) => ({
    onBlur: (e: React.FocusEvent) => {
      const isInside = _.some(getRefs(), (childRef: NodeRef) => {
        return childRef.current.contains(e.relatedTarget as HTMLElement)
      })

      if (!isInside) {
        this.trySetMenuOpen(false, e)
      }
    },
    onItemClick: (e, itemProps: ToolbarItemProps) => {
      _.invoke(predefinedProps, 'onItemClick', e, itemProps)
      if (itemProps.popup) {
        return
      }
      // TODO: should we pass toolbarMenuItem to the user callback so he can decide if he wants to close the menu?
      this.trySetMenuOpen(itemProps.menuOpen, e)
      if (!itemProps.menuOpen && this.itemRef) {
        this.itemRef.current.focus()
      }
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderComponent({ ElementType, classes, unhandledProps, accessibility, variables }) {
    const { icon, children, disabled, popup, menu, menuOpen, wrapper } = this.props
    const targetRef = toRefObject(this.context.target)

    const itemElement = (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        disabled={disabled}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? children : Icon.create(icon)}
      </ElementType>
    )
    const submenuElement = menuOpen ? (
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref innerRef={nestingRef}>
              <Popper align="start" position="above" targetRef={this.itemRef}>
                {ToolbarMenu.create(menu, {
                  overrideProps: this.handleMenuOverrides(getRefs, variables),
                })}
              </Popper>
            </Ref>
            <EventListener
              listener={this.handleOutsideClick(getRefs)}
              targetRef={targetRef}
              type="click"
              capture
            />
          </>
        )}
      </Unstable_NestingAuto>
    ) : null

    if (popup) {
      return Popup.create(popup, {
        defaultProps: {
          trapFocus: true,
        },
        overrideProps: {
          trigger: itemElement,
          children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger`
        },
      })
    }

    // wrap the item if it has menu (even if it is closed = not rendered)
    if (menu) {
      const contentElement = (
        <>
          <Ref innerRef={this.itemRef}>{itemElement}</Ref>
          {submenuElement}
        </>
      )

      if (wrapper) {
        return Box.create(wrapper, {
          defaultProps: {
            className: cx(ToolbarItem.slotClassNames.wrapper, classes.wrapper),
            ...accessibility.attributes.wrapper,
            ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper),
          },
          overrideProps: () => ({
            children: contentElement,
          }),
        })
      }

      return contentElement
    }

    return <Ref innerRef={this.itemRef}>{itemElement}</Ref>
  }

  handleBlur = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
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

  handleOutsideClick = (getRefs: GetRefs) => (e: MouseEvent) => {
    const isItemClick = doesNodeContainClick(this.itemRef.current, e, this.context.target)
    const isNestedClick = _.some(getRefs(), (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current as HTMLElement, e, this.context.target)
    })
    const isInside = isItemClick || isNestedClick

    if (!isInside) {
      this.trySetMenuOpen(false, e)
    }
  }

  trySetMenuOpen(newValue: boolean, e: Event | React.SyntheticEvent) {
    _.invoke(this.props, 'onMenuOpenChange', e, { ...this.props, menuOpen: newValue })
  }
}

ToolbarItem.create = createShorthandFactory({ Component: ToolbarItem, mappedProp: 'content' })

/**
 * A ToolbarItem renders Toolbar item as a button with an icon.
 */
export default withSafeTypeForAs<typeof ToolbarItem, ToolbarItemProps, 'button'>(ToolbarItem)
