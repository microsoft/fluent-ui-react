import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'

export class AccordionTitleBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any
  constructor() {
    super('accordion-title')
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'heading',
    'data-is-focusable': true,
  }

  public generateAriaAttributes(props: any, state: any): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
