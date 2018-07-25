import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { UIComponent } from '../../..'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../../components/actions/ClickAction'

export class MenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('menuitem')
    this.handleKey('Enter', (key, event, component, props, state) =>
      component.executeAction(ClickAction.execute()),
    )
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    tabIndex: 0,
  }

  public generateAriaAttributes(props, state): object {
    this.attributes.tabIndex = props['focusable'] ? 0 : -1
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
