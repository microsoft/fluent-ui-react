import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'

import keyboardKey from 'keyboard-key'

export class VerticalMenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any

  constructor() {
    super('vertical-menuitem')

    this.handleKey(keyboardKey.Enter, (key, event, component, props, state) => {
      event.preventDefault()
      event.stopPropagation()
      component.executeAction(ClickAction.execute({ event }))
    })

    this.handleKey(keyboardKey.Escape, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(keyboardKey.ArrowUp, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    this.handleKey(keyboardKey.ArrowDown, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })
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
}
