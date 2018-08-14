import PropTypes from 'prop-types'
import React, { ReactNode, SyntheticEvent } from 'react'
import Button from '../Button/Button'
import Menu from '../Menu/Menu'
import menuButtonRules from './menuButtonRules'
import menuButtonVariables from './menuButtonVariables'
import keyboardKey from 'keyboard-key'
import ClickAction, { ClickActionParams } from '../../lib/actions/ClickAction'

import MenuCloseSubmenuAction, {
  MenuCloseSubmenuActionParams,
} from '../../lib/actions/MenuCloseSubmenuAction'
import MenuOpenSubmenuAction, {
  MenuOpenSubmenuActionParams,
} from '../../lib/actions/MenuOpenSubmenuAction'

import {
  AutoControlledComponent,
  childrenExist,
  customPropTypes,
  IRenderResultConfig,
  eventStack,
  doesNodeContainClick,
} from '../../lib'
import { AccBehaviorType, AccBehaviorFactory } from '../../lib/accessibility/AccBehaviorFactory'

export interface IMenuButtonState {
  submenuOpened?: boolean
}

export interface IMenuButtonProps {
  as?: string
  children?: ReactNode
  className?: string
  content?: ReactNode
  disabled?: boolean
  onClick?: (e: SyntheticEvent, props: IMenuButtonState, state: IMenuButtonProps) => void
  onKeyDown?: (e: SyntheticEvent, props: IMenuButtonState, state: IMenuButtonProps) => void
  accBehavior?: string
  submenuOpened?: boolean
  defaultSubmenuOpened?: boolean
  menuItems?: any
}

/**
 * A button.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class MenuButton extends AutoControlledComponent<IMenuButtonProps, IMenuButtonState> {
  public static displayName = 'MenuButton'

  public static className = 'ui-menu-button'

  public static rules = menuButtonRules

  public static variables = menuButtonVariables

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    accBehavior: PropTypes.string,

    onKeyDown: PropTypes.func,

    submenuOpened: PropTypes.bool,

    defaultSubmenuOpened: PropTypes.bool,

    menuItems: PropTypes.array,
  }

  public static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'disabled',
    'submenuOpened',
    'fluid',
    'onClick',
    'accBehavior',
    'onKeyDown',
    'menuItems',
  ]

  public static defaultProps = {
    as: 'div',
  }

  static autoControlledProps = ['submenuOpened']

  buttonRef: Button
  setButtonRef = ref => (this.buttonRef = ref)

  popupRef: Menu
  setPopupRef = ref => (this.popupRef = ref)

  elementRef: HTMLElement
  setElementRef = ref => (this.elementRef = ref)

  getInitialAutoControlledState() {
    return { submenuOpened: false }
  }

  clickHandler = ClickAction.handler((params: ClickActionParams) => {
    this.togglePopup(undefined, params.moveFocus)
  })

  closeSubmenuHandler = MenuCloseSubmenuAction.handler((params: MenuCloseSubmenuActionParams) => {
    if (this.state['submenuOpened']) {
      this.setState({ submenuOpened: false }, () => {
        if (params.moveFocus) {
          this.buttonRef.focus()
        }
      })
    }
  })

  openSubmenuHandler = MenuOpenSubmenuAction.handler((params: MenuOpenSubmenuActionParams) => {
    const moveFocus = (params: MenuOpenSubmenuActionParams) => {
      if (params.moveFocus) {
        if (params.focusLast) {
          this.focusLastChildMenu()
        } else {
          this.focusFirstChildMenu()
        }
      }
    }

    if (!this.state['submenuOpened']) {
      this.setState({ submenuOpened: true }, () => {
        moveFocus(params)
      })
    } else {
      moveFocus(params)
    }
  })

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.menuButton,
    )

    this.registerActionHandler(this.clickHandler)
    this.registerActionHandler(this.closeSubmenuHandler)
    this.registerActionHandler(this.openSubmenuHandler)
  }

  componentDidMount() {
    this.addDocumentListener()
  }

  componentWillUnmount() {
    this.removeDocumentListener()
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

  public togglePopup = (e: SyntheticEvent, moveFocus?: boolean) => {
    this.setState({ submenuOpened: !this.state.submenuOpened }, () => {
      if (moveFocus) {
        this.focusFirstChildMenu()
      }
    })
  }

  public focusFirstChildMenu = () => {
    this.popupRef.focusZone.focus()
  }

  public focusLastChildMenu = () => {
    this.popupRef.focusZone.focusLast()
  }

  public onMenuItemKeyDown = e => {
    if (keyboardKey.getCode(e) === keyboardKey.Escape) {
      this.setState({ submenuOpened: false }, () => {
        this.buttonRef.focus()
      })
    }
  }

  public renderComponent({
    ElementType,
    classes,
    rest,
  }: IRenderResultConfig<IMenuButtonProps>): ReactNode {
    const { children, content, disabled, menuItems } = this.props

    return (
      <ElementType
        className={classes.root}
        ref={this.setElementRef}
        onKeyDown={this.accBehavior.onKeyDown(this, this.props, this.state)}
        {...rest}
      >
        <Button
          disabled={disabled}
          fluid={true}
          onClick={this.togglePopup}
          ref={this.setButtonRef}
          {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        >
          {childrenExist(children) ? children : <span>{content}</span>}
        </Button>

        {this.state.submenuOpened ? (
          <Menu
            vertical
            defaultActiveIndex={0}
            onKeyDown={this.onMenuItemKeyDown}
            ref={this.setPopupRef}
            items={menuItems}
          />
        ) : null}
      </ElementType>
    )
  }
}

export default MenuButton
