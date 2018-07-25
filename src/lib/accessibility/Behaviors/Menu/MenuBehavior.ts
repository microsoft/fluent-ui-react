import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import SetFocusableChild, {
  Direction,
  FocusableIndexState,
} from '../../../../components/actions/SetFocusableChild'

export class MenuBehavior extends AbstractBehavior<{}, FocusableIndexState>
  implements IAccessibilityBehavior<{}, FocusableIndexState> {
  constructor() {
    super('menu')
    this.handleKey('ArrowRight', (key, event, component, props, state) => {
      if (event.defaultPrevented) {
        return
      }
      event.preventDefault()
      return component.executeAction(
        SetFocusableChild.execute({ state, direction: Direction.Next }),
      )
    })
    this.handleKey('ArrowLeft', (key, event, component, props, state) => {
      if (event.defaultPrevented) {
        return
      }
      event.preventDefault()
      return component.executeAction(
        SetFocusableChild.execute({ state, direction: Direction.Previous }),
      )
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menubar',
  }

  public generateAriaAttributes(props, state): object {
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
