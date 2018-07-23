import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class InputBehavior extends AbstractBehavior implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('input')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    if (newState === ComponentState.disabled) {
      this.attributes['aria-disabled'] = true
    } else if (newState === ComponentState.enabled) {
      delete this.attributes['aria-disabled']
    }
  }
}
