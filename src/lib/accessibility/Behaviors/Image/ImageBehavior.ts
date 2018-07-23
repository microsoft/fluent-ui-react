import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class ImageBehavior extends AbstractBehavior implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('image')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    alt: '',
  }

  public generateAriaAttributes(props, state): object {
    if (!props['alt']) {
      this.attributes['role'] = 'presentation'
    }

    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
