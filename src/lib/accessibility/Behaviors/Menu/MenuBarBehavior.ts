import { ComponentState } from '../../interfaces'
import { MenuBehavior } from './MenuBehavior'

export class MenuBarBehavior extends MenuBehavior {
  protected attributes = {
    'ms-acc-behavior': 'menubar',
    role: 'menubar',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
