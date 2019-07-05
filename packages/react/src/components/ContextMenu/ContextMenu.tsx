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
} from '../../lib'
import { ShorthandValue, Omit } from '../../types'

import { Accessibility, AccessibilityAttributes } from '../../lib/accessibility/types'
import { createShorthandFactory } from '../../lib/factories'
import Popup, { PopupProps } from '../Popup/Popup'
import { Menu, MenuItemProps, MenuProps, Ref } from '../..'
import { contextMenuBehavior } from '../../lib/accessibility'
import { focusMenuItem, focusNearest } from './focusUtils'
import { ALIGNMENTS, POSITIONS } from '../../lib/positioner'

export interface ContextMenuSlotClassNames {
  menu: string
}

export interface ContextMenuProps
  extends Omit<PopupProps, 'content' | 'renderContent' | 'children'> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default contextMenuBehavior
   */
  accessibility?: Accessibility

  menu?: ShorthandValue<MenuProps>
}

export interface ContextMenuState {
  menuOpen: boolean
  menuId: string
  triggerId: string
  autoFocus: boolean
}

/**
 * A ContextMenu displays a menu connected to trigger element.
 * @accessibility
 */
export default class ContextMenu extends AutoControlledComponent<
  ContextMenuProps,
  ContextMenuState
> {
  static displayName = 'ContextMenu'

  static className = 'ui-contextmenu'

  static create: Function

  static slotClassNames: ContextMenuSlotClassNames = {
    menu: `${ContextMenu.className}__menu`,
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
      PropTypes.oneOf(['hover', 'click', 'focus']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus'])),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus'])),
    ]),
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    renderContent: PropTypes.func,
    target: PropTypes.any,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
    unstable_pinned: PropTypes.bool,
    contentRef: customPropTypes.ref,
    menu: customPropTypes.itemShorthand,
  }

  static defaultProps: ContextMenuProps = {
    accessibility: contextMenuBehavior,
    align: 'start', // top
    position: 'below', // after
  }

  static autoControlledProps = ['open']

  // TODO: this does not persist generated ids across re-renders, see ContextMenu-test.tsx
  static getAutoControlledStateFromProps(
    props: ContextMenuProps,
    state: ContextMenuState,
  ): Partial<ContextMenuState> {
    return {
      menuId: getOrGenerateIdFromShorthand('contextmenu-menu-', props.menu, state.menuId, true),
      triggerId: getOrGenerateIdFromShorthand(
        'contextmenu-trigger-',
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
    this.setState(
      {
        menuOpen: false,
        autoFocus: false,
      },
      renderCallback,
    )
    e.preventDefault()
  }

  openAndFocus(e: Event, which: 'first' | 'last') {
    const renderCallback = () => focusMenuItem(this.menuRef.current, which)
    this.setState(
      {
        menuOpen: true,
        autoFocus: false, // focused by renderCallback
      },
      renderCallback,
    )
    e.preventDefault()
  }

  handleOpenChange = (e, { open }) => {
    _.invoke(this.props, 'onOpenChange', e, { ...this.props, ...{ open } })
    this.setState(() => ({
      menuOpen: open,
      autoFocus: true,
    }))
  }

  handleMenuItemClick = (predefinedProps?: MenuItemProps) => (
    e: React.SyntheticEvent,
    itemProps: MenuItemProps,
  ) => {
    _.invoke(predefinedProps, 'onClick', e, itemProps)
    if (!predefinedProps || !predefinedProps.menu) {
      // do not close if clicked on item with submenu
      this.setState({ menuOpen: false, autoFocus: false })
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

  renderComponent({
    ElementType,
    classes,
    unhandledProps,
    accessibility,
  }: RenderResultConfig<ContextMenuProps>): React.ReactNode {
    const { menu, ...popupProps } = this.props
    const content =
      menu &&
      Menu.create(menu, {
        defaultProps: {
          ...accessibility.attributes.menu,
          vertical: true,
        },
        overrideProps: {
          items: this.handleMenuItemOverrides(accessibility.attributes.menuItem),
        },
      })

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        style={{ boxSizing: 'border-box', display: 'inline-block' }}
      >
        <Ref innerRef={this.triggerRef}>
          <Popup
            {...popupProps}
            accessibility={() => accessibility}
            open={this.state.menuOpen}
            onOpenChange={this.handleOpenChange}
            inline
            content={{
              variables: { padding: '', borderSize: '0px' },
              content: content && <Ref innerRef={this.menuRef}>{content}</Ref>,
            }}
            unstable_pinned
          />
        </Ref>
      </ElementType>
    )
  }
}

ContextMenu.create = createShorthandFactory({ Component: ContextMenu, mappedProp: 'menu' })
