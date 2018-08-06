import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import AutoControlledComponent from '../../../AutoControlledComponent'

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
      'ArrowRight',
      (key, event: Event, component: AutoControlledComponent<any, any>, props, state): void => {
        const activeIndex: boolean = props['active']

        if (activeIndex) {
          return
        }

        event.preventDefault()
        const index: number = props['index']
        const updateActiveIndex: (index: number, markAsInactive: boolean) => void =
          props['updateActiveIndex']
        updateActiveIndex(index, false)
      },
    )

    this.handleKey(
      'ArrowLeft',
      (key, event: Event, component: AutoControlledComponent<any, any>, props, state): void => {
        const activeIndex: boolean = props['active']
        event.preventDefault()

        if (!activeIndex) {
          return
        }

        const index: number = props['index']
        const updateActiveIndex: (index: number, markAsInactive: boolean) => void =
          props['updateActiveIndex']
        updateActiveIndex(index, true)
      },
    )
  }

  public generateAriaAttributes(props: any, state: any): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
