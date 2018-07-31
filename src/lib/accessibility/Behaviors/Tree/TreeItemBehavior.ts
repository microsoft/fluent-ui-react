import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class TreeItemBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'treeitem',
  }

  public get name(): string {
    return 'treeitem'
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
