import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import FocusAction from '../../../actions/FocusAction'

export class ChatBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('chat')

    this.handleKey('Escape', (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(FocusAction.execute())
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: '',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
