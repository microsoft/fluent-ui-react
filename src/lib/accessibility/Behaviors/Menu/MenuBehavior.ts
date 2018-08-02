import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class MenuBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  private timeoutId: any
  private isManagingFocus: boolean = false
  private stopPropagation: boolean = true
  private func: Function
  constructor() {
    super('menu')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menu',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
