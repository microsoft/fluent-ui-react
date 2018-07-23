import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class ListItemBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'listitem',
    //   tabIndex: -1,
  }

  public get name(): string {
    return 'listitem'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
