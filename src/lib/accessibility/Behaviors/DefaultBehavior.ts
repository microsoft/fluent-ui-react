import { IAccessibilityBehavior, ComponentState } from '../interfaces'
import { AbstractBehavior } from './AbstractBehavior'

export class DefaultBehavior<P, S> extends AbstractBehavior<P, S>
  implements IAccessibilityBehavior<P, S> {
  constructor() {
    super('default')
  }

  public generateAriaAttributes(): object {
    return {
      'ms-acc-behavior': this.name,
      role: 'default',
    }
  }

  public changeState(newState: ComponentState): void {
    throw new Error('Method not implemented.')
  }
}
