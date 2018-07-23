import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class SelectableListItemBehavior extends AbstractBehavior
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('selectable-listitem')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'option',
    // tabIndex: -1,
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    switch (newState) {
      case ComponentState.active:
        this.attributes['aria-selected'] = true
        break
      case ComponentState.inactive:
        delete this.attributes['aria-selected']
        break
    }
  }
}
