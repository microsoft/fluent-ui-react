import { IAccessibilityBehavior, ComponentState } from '../interfaces'

export class DefaultBehavior implements IAccessibilityBehavior<{}, {}> {
  public get name(): string {
    return 'default'
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
