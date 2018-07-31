import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class TreeBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'tree',
  }

  public get name(): string {
    return 'tree'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
