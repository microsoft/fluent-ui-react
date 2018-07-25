import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class ButtonBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('button')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'button',
    'aria-hidden': false,

    // child: {
    //   'ms-acc-behavior': this.name,
    //   role: 'menu-item',
    //   'aria-hidden': false,
    //   'tab-index': 0,
    // },
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
