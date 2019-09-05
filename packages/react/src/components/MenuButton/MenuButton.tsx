import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  AutoControlledComponent,
  RenderResultConfig,
  applyAccessibilityKeyHandlers,
  getOrGenerateIdFromShorthand,
  commonPropTypes,
  StyledComponentProps,
} from '../../lib'
import { ShorthandValue, ComponentEventHandler, ShorthandCollection } from '../../types'

import { Accessibility } from '../../lib/accessibility/types'
import { createShorthandFactory, ShorthandFactory } from '../../lib/factories'
import Popup, { PopupProps, PopupEvents, PopupEventsArray } from '../Popup/Popup'
import Menu, { MenuProps } from '../Menu/Menu'
import { MenuItemProps } from '../Menu/MenuItem'
import { Ref } from '@stardust-ui/react-component-ref'
import { menuButtonBehavior } from '../../lib/accessibility'
import { focusMenuItem } from './focusUtils'
import { ALIGNMENTS, POSITIONS, PositioningProps } from '../../lib/positioner'

export interface MenuButtonSlotClassNames {
  menu: string
}

export interface MenuButtonProps extends StyledComponentProps<MenuButtonProps>, PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuButtonBehavior
   */
  accessibility?: Accessibility

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Existing document the popup should add listeners. */
  mountDocument?: Document

  /** Existing element the popup should be bound to. */
  mountNode?: HTMLElement

  /** Delay in ms for the mouse leave event, before the popup will be closed. */
  mouseLeaveDelay?: number

  /** Events triggering the popup. */
  on?: PopupEvents | PopupEventsArray

  /** Defines whether popup is displayed. */
  open?: boolean

  /**
   * Called after user's click on a menu item.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMenuItemClick?: ComponentEventHandler<MenuItemProps>

  /**
   * Event for request to change 'open' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<PopupProps>

  /** A popup can show a pointer to trigger. */
  pointing?: boolean

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: JSX.Element

  /** Whether the trigger should be tabbable */
  tabbableTrigger?: boolean

  /** Shorthand for menu configuration */
  menu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>

  /** Determines if the MenuButton behaves as context menu */
  contextMenu?: boolean
}

export interface MenuButtonState {
  open: boolean
  menuId: string
  triggerId: string
}

/**
 * A MenuButton displays a menu connected to trigger element.
 * @accessibility
 */
export default class MenuButton extends AutoControlledComponent<MenuButtonProps, MenuButtonState> {
  static displayName = 'MenuButton'

  static className = 'ui-menubutton'

  static create: ShorthandFactory<MenuButtonProps>

  static slotClassNames: MenuButtonSlotClassNames = {
    menu: `${MenuButton.className}__menu`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      as: true,
      content: false,
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    mountDocument: PropTypes.object,
    mountNode: customPropTypes.domNode,
    mouseLeaveDelay: PropTypes.number,
    offset: PropTypes.string,
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus', 'context']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus', 'context'])),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'context'])),
    ]),
    open: PropTypes.bool,
    onMenuItemClick: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.oneOf(POSITIONS),
    target: PropTypes.any,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
    tabbableTrigger: PropTypes.bool,
    unstable_pinned: PropTypes.bool,
    menu: PropTypes.oneOfType([
      customPropTypes.itemShorthandWithoutJSX,
      PropTypes.arrayOf(customPropTypes.itemShorthandWithoutJSX),
    ]),
    contextMenu: PropTypes.bool,
  }

  static defaultProps: MenuButtonProps = {
    accessibility: menuButtonBehavior,
    align: 'start',
    position: 'below',
  }

  static autoControlledProps = ['open']

  static getAutoControlledStateFromProps(
    props: MenuButtonProps,
    state: MenuButtonState,
  ): Partial<MenuButtonState> {
    return {
      menuId: getOrGenerateIdFromShorthand('menubutton-menu-', props.menu, state.menuId),
      triggerId: getOrGenerateIdFromShorthand(
        'menubutton-trigger-',
        props.trigger,
        state.triggerId,
      ),
    }
  }

  triggerRef = React.createRef<HTMLElement>()
  menuRef = React.createRef<HTMLElement>()

  actionHandlers = {
    closeMenu: () => this.closeMenu(),
    openAndFocusFirst: e => this.openAndFocus(e, 'first'),
    openAndFocusLast: e => this.openAndFocus(e, 'last'),
  }

  closeMenu() {
    this.setState({ open: false })
  }

  openAndFocus(e: React.KeyboardEvent, which: 'first' | 'last') {
    const renderCallback = () => focusMenuItem(this.menuRef.current, which)
    this.setState({ open: true }, renderCallback)
    e.preventDefault()
  }

  handleOpenChange = (e, { open }: PopupProps) => {
    _.invoke(this.props, 'onOpenChange', e, { ...this.props, open })
    this.setState({ open })
  }

  handleMenuOverrides = (predefinedProps?: MenuProps) => ({
    onItemClick: (e: React.SyntheticEvent, itemProps: MenuItemProps) => {
      _.invoke(predefinedProps, 'onItemClick', e, itemProps)
      _.invoke(this.props, 'onMenuItemClick', e, itemProps)
      if (!itemProps || !itemProps.menu) {
        // do not close if clicked on item with submenu
        this.setState({ open: false })
      }
    },
  })

  renderComponent({
    ElementType,
    classes,
    unhandledProps,
    accessibility,
    styles,
  }: RenderResultConfig<MenuButtonProps>): React.ReactNode {
    const {
      // MenuButton props:
      contextMenu,
      menu,
      // Popup props:
      accessibility: accessibilityProp,
      align,
      className,
      defaultOpen,
      mountDocument,
      mountNode,
      mouseLeaveDelay,
      offset,
      on,
      onOpenChange,
      open,
      pointing,
      position,
      tabbableTrigger,
      styles: stylesProp,
      target,
      trigger,
      unstable_pinned,
      variables,
    } = this.props

    const popupProps = {
      accessibility: accessibilityProp,
      align,
      className,
      defaultOpen,
      mountDocument,
      mountNode,
      mouseLeaveDelay,
      offset,
      on,
      onOpenChange,
      open,
      pointing,
      position,
      tabbableTrigger,
      styles: stylesProp,
      target,
      trigger,
      unstable_pinned,
      variables,
    }

    const content = Menu.create(menu, {
      defaultProps: {
        ...accessibility.attributes.menu,
        vertical: true,
      },
      overrideProps: this.handleMenuOverrides,
    })

    const overrideProps = {
      open: this.state.open,
      onOpenChange: this.handleOpenChange,
      content: {
        styles: styles.popupContent,
        content: content && <Ref innerRef={this.menuRef}>{content}</Ref>,
      },
      unstable_pinned: true,
      children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger
      ...(contextMenu
        ? {
            on: 'context',
            trapFocus: true,
            tabbableTrigger: false,
          }
        : {
            accessibility: () => accessibility,
            inline: true,
            autoFocus: true,
          }),
    }

    const popup = Popup.create(popupProps, { overrideProps })

    if (contextMenu) {
      return popup
    }

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <Ref innerRef={this.triggerRef}>{popup}</Ref>
      </ElementType>
    )
  }
}

MenuButton.create = createShorthandFactory({ Component: MenuButton, mappedProp: 'menu' })
