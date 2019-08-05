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
import { createShorthandFactory } from '../../lib/factories'
import Popup, { PopupProps, PopupEvents, PopupEventsArray } from '../Popup/Popup'
import Menu, { MenuProps } from '../Menu/Menu'
import { MenuItemProps } from '../Menu/MenuItem'
import { Ref } from '@stardust-ui/react-component-ref'
import { menuButtonBehavior } from '../../lib/accessibility'
import { focusMenuItem, focusNearest } from './focusUtils'
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

  /** Whether the Popup should be rendered inline with the trigger or in the body. */
  inline?: boolean

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
  autoFocus: boolean
}

/**
 * A MenuButton displays a menu connected to trigger element.
 * @accessibility
 */
export default class MenuButton extends AutoControlledComponent<MenuButtonProps, MenuButtonState> {
  static displayName = 'MenuButton'

  static className = 'ui-menubutton'

  static create: Function

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
    inline: PropTypes.bool,
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
      menuId: getOrGenerateIdFromShorthand('menubutton-menu-', props.menu, state.menuId, true),
      triggerId: getOrGenerateIdFromShorthand(
        'menubutton-trigger-',
        props.trigger,
        state.triggerId,
        true,
      ),
    }
  }

  triggerRef = React.createRef<HTMLElement>()
  menuRef = React.createRef<HTMLElement>()

  actionHandlers = {
    closeAndFocusNext: e => this.closeAndFocus(e, 'next'),
    closeAndFocusPrevious: e => this.closeAndFocus(e, 'previous'),
    openAndFocusFirst: e => this.openAndFocus(e, 'first'),
    openAndFocusLast: e => this.openAndFocus(e, 'last'),
  }

  closeAndFocus(e: Event, which: 'next' | 'previous') {
    const renderCallback = () => focusNearest(this.triggerRef.current, which)
    this.trySetState(
      {
        open: false,
        autoFocus: false,
      },
      renderCallback,
    )
    e.preventDefault()
  }

  openAndFocus(e: Event, which: 'first' | 'last') {
    const renderCallback = () => focusMenuItem(this.menuRef.current, which)
    this.trySetState(
      {
        open: true,
        autoFocus: false, // focused by renderCallback
      },
      renderCallback,
    )
    e.preventDefault()
  }

  handleOpenChange = (e, { open }: PopupProps) => {
    _.invoke(this.props, 'onOpenChange', e, { ...this.props, ...{ open } })
    this.trySetState({
      open,
      autoFocus: true,
    })
  }

  handleMenuItemClick = (predefinedProps?: MenuProps) => (
    e: React.SyntheticEvent,
    itemProps: MenuItemProps,
  ) => {
    _.invoke(predefinedProps, 'onItemClick', e, itemProps)
    if (!itemProps || !itemProps.menu) {
      // do not close if clicked on item with submenu
      this.trySetState({ open: false, autoFocus: false })
    }
  }

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
      inline,
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

    const popupProps = _.omitBy(
      {
        accessibility: accessibilityProp,
        align,
        className,
        defaultOpen,
        inline,
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
      },
      _.isUndefined,
    )

    const content = Menu.create(menu, {
      defaultProps: {
        ...accessibility.attributes.menu,
        vertical: true,
      },
      overrideProps: {
        onItemClick: (e: React.SyntheticEvent, itemProps: MenuItemProps) =>
          this.handleMenuItemClick(content)(e, itemProps),
      },
    })

    const overrideProps = {
      open: this.state.open,
      onOpenChange: this.handleOpenChange,
      content: {
        styles: styles.popupContent,
        content: content && <Ref innerRef={this.menuRef}>{content}</Ref>,
      },
      children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger
    }

    if (contextMenu) {
      return Popup.create(popupProps, {
        defaultProps: {
          on: 'context',
          trapFocus: true,
          unstable_pinned: true,
          tabbableTrigger: false,
        },
        overrideProps,
      })
    }

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <Ref innerRef={this.triggerRef}>
          {Popup.create(popupProps, {
            defaultProps: {
              inline: true,
              autoFocus: true,
              unstable_pinned: true,
            },
            overrideProps: {
              accessibility: () => accessibility,
              ...overrideProps,
            },
          })}
        </Ref>
      </ElementType>
    )
  }
}

MenuButton.create = createShorthandFactory({ Component: MenuButton, mappedProp: 'menu' })
