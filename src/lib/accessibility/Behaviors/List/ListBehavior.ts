import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class ListBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'list',
  }

  public get name(): string {
    return 'list'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
