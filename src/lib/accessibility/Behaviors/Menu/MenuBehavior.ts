import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import UIComponent from '../../../UIComponent'
import { AbstractBehavior } from '../AbstractBehavior'

export class MenuBehavior extends AbstractBehavior implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('menu')
    this.handleKey('ArrowRight', (key, event, component, props, state) =>
      this.handleArrowNext(key, event, component, props, state),
    )
    this.handleKey('ArrowLeft', (key, event, component, props, state) =>
      this.handleArrowPrev(key, event, component, props, state),
    )
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menubar',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}

  private handleArrowNext<P, S>(
    key: string,
    event: Event,
    component: UIComponent<P, S>,
    props: P,
    state: S,
  ): boolean {
    component.executeAction('setFocusableChild', { index: state['focusableIndex'] + 1 })
    return true
  }

  private handleArrowPrev<P, S>(
    key: string,
    event: Event,
    component: UIComponent<P, S>,
    props: P,
    state: S,
  ): boolean {
    component.executeAction('setFocusableChild', { index: state['focusableIndex'] - 1 })
    return true
  }
}
