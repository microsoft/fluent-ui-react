import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class ListBehavior extends AbstractBehavior implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('list')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'list',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
