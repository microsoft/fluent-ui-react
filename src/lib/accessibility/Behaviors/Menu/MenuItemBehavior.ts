import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../../components/actions/ClickAction'
import { IFocusableProps, focusableProperty } from '../../../focus/interfaces'

export class MenuItemBehavior extends AbstractBehavior<IFocusableProps, {}>
  implements IAccessibilityBehavior<IFocusableProps, {}> {
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

  public generateAriaAttributes(props: IFocusableProps, state: any): object {
    this.attributes.tabIndex = props[focusableProperty] ? 0 : -1
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
