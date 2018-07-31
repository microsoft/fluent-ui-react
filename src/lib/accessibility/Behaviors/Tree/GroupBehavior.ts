import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class GroupBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'group',
  }

  public get name(): string {
    return 'group'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
