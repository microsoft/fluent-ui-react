import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class ImageBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    alt: '',
  }

  public get name(): string {
    return 'image'
  }

  public generateAriaAttributes(props, state): object {
    if (!props['alt']) {
      this.attributes['role'] = 'presentation'
    }

    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
