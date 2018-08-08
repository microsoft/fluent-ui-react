import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import { eventStack, doesNodeContainClick } from '../../../'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'
import MenuOpenSubmenuAction from '../../../actions/MenuOpenSubmenuAction'
import UIComponent from '../../../UIComponent'
import keyListener from '../../../keyListenerDecorator'
import { KeyCodes } from '@uifabric/utilities'

export class MenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any

  private _component: UIComponent<{}, {}>

  constructor() {
    super('menuitem')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    tabIndex: 0,
    'data-is-focusable': true,
  }

  public generateAriaAttributes(props: any, state: any): object {
    if (props.submenu) {
      this.attributes['aria-expanded'] = state['submenuOpened']
    }
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}

  public attachEventHandlers(target?: HTMLElement, component?: UIComponent<{}, {}>) {
    this._component = component

    eventStack.sub(
      'keydown',
      [
        this.closeSubmenuAndFocusNext.bind(this),
        this.closeSubmenu.bind(this),
        this.openSubmenu.bind(this),
        this.openSubmenuAndFocusLast.bind(this),
        this.clickSubmenuItem.bind(this),
      ],
      { target },
    )
  }

  public detachEventHandlers(target?: HTMLElement) {
    eventStack.unsub(
      'keydown',
      [
        this.closeSubmenuAndFocusNext.bind(this),
        this.closeSubmenu.bind(this),
        this.openSubmenu.bind(this),
        this.openSubmenuAndFocusLast.bind(this),
        this.clickSubmenuItem.bind(this),
      ],
      { target },
    )
  }

  @keyListener([KeyCodes.right, KeyCodes.left])
  public closeSubmenuAndFocusNext() {
    this._component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
  }

  @keyListener([KeyCodes.escape])
  public closeSubmenu() {
    event.preventDefault()
    this._component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
  }

  @keyListener(KeyCodes.down)
  public openSubmenu() {
    event.preventDefault()
    this._component.executeAction(MenuOpenSubmenuAction.execute({ moveFocus: true }))
  }

  @keyListener(KeyCodes.up)
  public openSubmenuAndFocusLast() {
    event.preventDefault()
    this._component.executeAction(
      MenuOpenSubmenuAction.execute({ moveFocus: true, focusLast: true }),
    )
  }

  @keyListener([KeyCodes.space, KeyCodes.enter])
  public clickSubmenuItem() {
    event.preventDefault()
    event.stopPropagation()
    this._component.executeAction(ClickAction.execute({ event, moveFocus: true }))
  }
}
