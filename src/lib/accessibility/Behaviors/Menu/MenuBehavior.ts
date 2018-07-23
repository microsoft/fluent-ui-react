import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class MenuBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menubar',
  }

  public get name(): string {
    return 'menu'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
