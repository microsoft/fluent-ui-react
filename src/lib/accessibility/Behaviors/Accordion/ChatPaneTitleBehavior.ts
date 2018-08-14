import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import AutoControlledComponent from '../../../AutoControlledComponent'
import ChatPaneTitleExpandAction from '../../../actions/ChatPaneTitleExpandAction'

export class ChatPaneTitleBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('chat-pane-title')

    this.handleKeys()
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'heading',
    'data-is-focusable': true,
  }

  private handleKeys(): void {
    this.handleKey(
      39 /* 'ArrowRight' */,
      (key, event: Event, component: AutoControlledComponent<any, any>, props, state): void => {
        component.executeAction(
          ChatPaneTitleExpandAction.execute({ index: props['index'], expand: true, event }),
        )
      },
    )

    this.handleKey(
      37 /* 'ArrowLeft' */,
      (key, event: Event, component: AutoControlledComponent<any, any>, props, state): void => {
        component.executeAction(
          ChatPaneTitleExpandAction.execute({ index: props['index'], expand: false, event }),
        )
      },
    )
  }

  public generateAriaAttributes(props: any, state: any): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
