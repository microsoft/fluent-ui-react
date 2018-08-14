import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  AutoControlledComponent,
  eventStack,
  doesNodeContainClick,
} from '../../lib'
import { MenuItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import {
  focusAsync,
  focusFirstChild,
  getPreviousElement,
} from '../../../node_modules/@uifabric/utilities'
import ClickAction, { ClickActionParams } from '../../lib/actions/ClickAction'
import MenuCloseSubmenuAction, {
  MenuCloseSubmenuActionParams,
} from '../../lib/actions/MenuCloseSubmenuAction'
import MenuOpenSubmenuAction, {
  MenuOpenSubmenuActionParams,
} from '../../lib/actions/MenuOpenSubmenuAction'
import keyboardKey from 'keyboard-key'

class MenuItem extends AutoControlledComponent<any, any> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static create: Function

  static propTypes = {
    /** A menu item can be active. */
    active: PropTypes.bool,

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** MenuItem index inside Menu. */
    index: PropTypes.number,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    submenu: PropTypes.node,

    submenuOpened: PropTypes.bool,

    defaultSubmenuOpened: PropTypes.bool,
  }

  static defaultProps = {
    as: 'li',
    accessibility: MenuItemBehavior as Accessibility,
  }

  static handledProps = [
    'accessibility',
    'active',
    'as',
    'children',
    'className',
    'content',
    'index',
    'onClick',
    'shape',
    'type',
    'vertical',
    'submenu',
  ]

  static autoControlledProps = ['submenuOpened']

  elementRef: HTMLElement
  setElementRef = ref => (this.elementRef = ref)

  clickHandler = ClickAction.handler((params: ClickActionParams) => {
    this.handleClick(params.event, () => {
      if (params.moveFocus) {
        this.moveFocusInSubmenu(this.elementRef.lastElementChild as HTMLElement)
      }
    })
  })

  closeSubmenuHandler = MenuCloseSubmenuAction.handler((params: MenuCloseSubmenuActionParams) => {
    if (this.props['submenu'] && this.state['submenuOpened']) {
      this.setState({ submenuOpened: false }, () => {
        if (params.moveFocus) {
          focusFirstChild(this.elementRef)
        }
      })
    }
  })

  openSubmenuHandler = MenuOpenSubmenuAction.handler((params: MenuOpenSubmenuActionParams) => {
    if (!this.props['submenu']) return

    if (!this.state['submenuOpened']) {
      this.setState({ submenuOpened: true }, () => {
        if (params.moveFocus) {
          this.moveFocusInSubmenu(this.elementRef.lastElementChild as HTMLElement, params.focusLast)
        }
      })
    } else if (params.moveFocus) {
      this.moveFocusInSubmenu(this.elementRef.lastElementChild as HTMLElement, params.focusLast)
    }
  })

  constructor(props, ctx) {
    super(props, ctx)

    this.registerActionHandler(this.clickHandler)
    this.registerActionHandler(this.closeSubmenuHandler)
    this.registerActionHandler(this.openSubmenuHandler)

    this.handleKey(keyboardKey.Enter, (key, event) => {
      event.preventDefault()
      this.executeAction(ClickAction.execute({ event, moveFocus: true }))
    })

    this.handleKey(keyboardKey.Spacebar, (key, event) => {
      event.preventDefault()
      this.executeAction(ClickAction.execute({ event, moveFocus: true }))
    })

    this.handleKey(keyboardKey.Escape, (key, event) => {
      event.preventDefault()
      this.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(keyboardKey.ArrowRight, (key, event) => {
      this.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    this.handleKey(keyboardKey.ArrowLeft, (key, event) => {
      this.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    this.handleKey(keyboardKey.ArrowDown, (key, event) => {
      event.preventDefault()
      this.executeAction(MenuOpenSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(keyboardKey.ArrowUp, (key, event) => {
      event.preventDefault()
      this.executeAction(MenuOpenSubmenuAction.execute({ moveFocus: true, focusLast: true }))
    })
  }

  componentDidMount() {
    this.addDocumentListener()
  }

  componentWillUnmount() {
    this.removeDocumentListener()
  }

  private moveFocusInSubmenu(submenuElement: HTMLElement, focusLast?: boolean) {
    if (focusLast) {
      focusAsync(getPreviousElement(
        submenuElement as HTMLElement,
        submenuElement.lastElementChild as HTMLElement,
        true,
        true,
        true,
      ) as HTMLElement)
    } else {
      focusFirstChild(submenuElement as HTMLElement)
    }
  }

  private handleDocumentClick = (e: Event) => {
    e.stopPropagation()
    if (this.elementRef && doesNodeContainClick(this.elementRef, e)) return
    this.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
  }

  private addDocumentListener() {
    eventStack.sub('click', this.handleDocumentClick)
  }

  private removeDocumentListener() {
    eventStack.unsub('click', this.handleDocumentClick)
  }

  getInitialAutoControlledState() {
    return { submenuOpened: false }
  }

  handleClick = (e: Event, clbk?: Function) => {
    if (this.props.submenu) {
      this.setState({ submenuOpened: !this.state.submenuOpened }, () => {
        clbk && clbk()
      })
    } else {
      alert(this.props.content)
    }
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, content } = this.props

    const submenuIndicator = this.props.submenu && (this.state.submenuOpened ? ' <' : ' >')
    return (
      <ElementType
        ref={this.setElementRef}
        className={classes.root}
        {...accessibility.attributes.root}
        {...rest}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <a
            className={cx('ui-menu__item__anchor', classes.anchor)}
            onClick={this.handleClick}
            onKeyDown={this.keyHandler()}
            {...accessibility.attributes.anchor}
          >
            {content}
          </a>
        )}
        {submenuIndicator}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
