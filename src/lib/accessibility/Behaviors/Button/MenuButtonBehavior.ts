import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import keyboardKey from 'keyboard-key'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'
import MenuOpenSubmenuAction from '../../../actions/MenuOpenSubmenuAction'

export class MenuButtonBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('popup-button')

    this.handleKey(keyboardKey.Enter, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(ClickAction.execute({ event, moveFocus: true }))
    })

    this.handleKey(keyboardKey.Spacebar, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(ClickAction.execute({ event, moveFocus: true }))
    })

    this.handleKey(keyboardKey.Escape, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(keyboardKey.ArrowDown, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuOpenSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(keyboardKey.ArrowUp, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuOpenSubmenuAction.execute({ moveFocus: true, focusLast: true }))
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'button',
    'aria-hidden': false,
    'aria-haspopup': true,
    'aria-expanded': false,
  }

  public generateAriaAttributes(props, state): object {
    this.attributes['aria-expanded'] = state['submenuOpened']
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    if (newState === ComponentState.disabled) {
      this.attributes['aria-disabled'] = true
    } else if (newState === ComponentState.enabled) {
      delete this.attributes['aria-disabled']
    }
  }
}
