import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class TreeItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('treeitem')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'treeitem',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    switch (newState) {
      case ComponentState.expanded:
        if (this.attributes.hasOwnProperty('aria-expanded')) {
          this.attributes['aria-expanded'] = true
        }
        break
      case ComponentState.collapsed:
        if (this.attributes.hasOwnProperty('aria-expanded')) {
          this.attributes['aria-expanded'] = false
        }
        break
    }
  }
}
