import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { eventStack, doesNodeContainClick } from '../../../'
import { AbstractBehavior } from '../AbstractBehavior'

import { KeyCodes } from '@uifabric/utilities'
import UIComponent from '../../../UIComponent'
import keyListener from '../../../keyListenerDecorator'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'
import MenuOpenSubmenuAction from '../../../actions/MenuOpenSubmenuAction'

export class MenuBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('menu')
  }

  private _component: UIComponent<{}, {}>

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menu',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}

  public attachEventHandlers(target?: HTMLElement, component?: UIComponent<{}, {}>) {
    this._component = component
    // eventStack.sub('keydown',
    //  [
    //   this.closeSubmenu.bind(this),
    //   ],
    //   { target })
  }

  public detachEventHandlers(target?: HTMLElement) {}

  // @keyListener([KeyCodes.escape])
  // public closeSubmenu() {
  //   event.preventDefault()
  //   this._component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
  // }
}
