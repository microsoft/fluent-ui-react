import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class ToggleButtonBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('toggle-button')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'button',
  }

  public get name(): string {
    return 'toggle-button'
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    switch (newState) {
      case ComponentState.disabled:
        this.attributes['aria-disabled'] = true
        break
      case ComponentState.enabled:
        delete this.attributes['aria-disabled']
        break
      case ComponentState.active:
        this.attributes['aria-pressed'] = true
        break
      case ComponentState.inactive:
        delete this.attributes['aria-pressed']
        break
    }
  }
}
