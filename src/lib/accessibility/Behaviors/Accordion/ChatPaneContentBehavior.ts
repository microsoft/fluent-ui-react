import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import AutoControlledComponent from '../../../AutoControlledComponent'
import ChatPaneContentReturnAction from '../../../actions/ChatPaneContentReturnAction'

export class ChatPaneContentBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('chat-pane-content')

    this.handleKeys()
  }

  private attributes = {
    'ms-acc-behavior': this.name,
  }

  private handleKeys(): void {
    this.handleKey(
      'ArrowRight',
      (key, event: Event, component: AutoControlledComponent<any, any>, props, state): void => {
        event.preventDefault()
      },
    )

    this.handleKey(
      'ArrowLeft',
      (key, event: Event, component: AutoControlledComponent<any, any>, props, state): void => {
        event.preventDefault()

        component.executeAction(ChatPaneContentReturnAction.execute({ index: props['titleIndex'] }))
      },
    )
  }

  public generateAriaAttributes(props: any, state: any): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
