import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../../lib/actions/ClickAction'
import MenuCloseSubmenuAction from '../../../../lib/actions/MenuCloseSubmenuAction'

export class MenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any
  constructor() {
    super('menuitem')
    this.handleKey('Enter', (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(ClickAction.execute())
    })

    this.handleKey('ArrowUp', (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    tabIndex: 0,
    'data-is-focusable': true,
  }

  public generateAriaAttributes(props: any, state: any): object {
    if (props.submenu) {
      this.attributes['aria-expanded'] = false
    }
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    switch (newState) {
      case ComponentState.expanded:
        if (this.attributes.hasOwnProperty('aria-expanded')) {
          this.attributes['aria-expanded'] = true
        }
        break
      case ComponentState.collapsed:
        if (this.attributes.hasOwnProperty('aria-expanded')) {
          this.attributes['aria-expanded'] = false
        }
        break
    }
  }
}
