import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class MenuItemBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    // tabIndex: -1,
  }

  public get name(): string {
    return 'menuitem'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
