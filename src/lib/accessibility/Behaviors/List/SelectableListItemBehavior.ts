import { IAccessibilityBehavior, ComponentState } from '../../interfaces'

export class SelectableListItemBehavior implements IAccessibilityBehavior<{}, {}> {
  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'option',
    // tabIndex: -1,
  }

  public get name(): string {
    return 'selectable-listitem'
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
