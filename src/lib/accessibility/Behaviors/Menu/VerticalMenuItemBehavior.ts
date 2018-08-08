import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'
import UIComponent from '../../../UIComponent'

import { eventStack, doesNodeContainClick } from '../../../'
import keyListener from '../../../keyListenerDecorator'
import { KeyCodes } from '@uifabric/utilities'

export class VerticalMenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any

  private _component: UIComponent<{}, {}>

  constructor() {
    super('vertical-menuitem')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    tabIndex: -1,
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
        this.closeSubmenuAndMoveNext.bind(this),
        this.closeSubmenu.bind(this),
        this.clickItem.bind(this),
      ],
      { target },
    )
  }

  public detachEventHandlers(target?: HTMLElement) {
    eventStack.unsub(
      'keydown',
      [
        this.closeSubmenuAndMoveNext.bind(this),
        this.closeSubmenu.bind(this),
        this.clickItem.bind(this),
      ],
      { target },
    )
  }

  // @keyListener([KeyCodes.down, KeyCodes.up])
  public closeSubmenuAndMoveNext() {
    // this._component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
  }

  @keyListener([KeyCodes.escape])
  public closeSubmenu() {
    this._component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
  }

  @keyListener([KeyCodes.enter, KeyCodes.space])
  public clickItem(event) {
    event.preventDefault()
    event.stopPropagation()
    this._component.executeAction(ClickAction.execute({ event }))
  }
}
