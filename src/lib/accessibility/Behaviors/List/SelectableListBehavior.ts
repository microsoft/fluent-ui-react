import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class SelectableListBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'listbox',
  }

  public get name(): string {
    return 'selectable-list'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
