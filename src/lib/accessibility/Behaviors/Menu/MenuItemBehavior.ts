import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { UIComponent } from '../../..'
import { AbstractBehavior } from '../AbstractBehavior'

export class MenuItemBehavior extends AbstractBehavior implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('menuitem')
    this.handleKey('Enter', (key, event, component, props, state) =>
      this.handleEnter(key, event, component, props, state),
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

  private handleEnter<P, S>(
    key: string,
    event: Event,
    component: UIComponent<P, S>,
    props: P,
    state: S,
  ): boolean {
    component.executeAction('click', undefined)
    return true
  }
}
