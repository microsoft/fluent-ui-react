import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import keyboardKey from 'keyboard-key'

export class PopupButtonBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  constructor() {
    super('popup-button')

    this.handleKey(keyboardKey.Enter, (key, event, component, props, state) => {
      this.onKeyDownHandler(event, component, props, state)
    })

    this.handleKey(keyboardKey.Spacebar, (key, event, component, props, state) => {
      this.onKeyDownHandler(event, component, props, state)
    })

    this.handleKey(keyboardKey.ArrowDown, (key, event, component, props, state) => {
      this.onKeyDownHandler(event, component, props, state)
    })

    this.handleKey(keyboardKey.ArrowUp, (key, event, component, props, state) => {
      this.onKeyDownHandler(event, component, props, state)
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'button',
    'aria-hidden': false,
    'aria-haspopup': true,
    'aria-expanded': false,
  }

  public generateAriaAttributes(props, state): object {
    this.attributes['aria-expanded'] = state['active']
    return this.attributes
  }

  public changeState(newState: ComponentState): void {
    if (newState === ComponentState.disabled) {
      this.attributes['aria-disabled'] = true
    } else if (newState === ComponentState.enabled) {
      delete this.attributes['aria-disabled']
    }
  }

  private onKeyDownHandler = (event, component, props, state) => {
    if (props['disabled']) {
      event.preventDefault()
      return
    }

    component.setState({ active: !state['active'] })

    props['onKeyDown'] && props['onKeyDown'](event)
  }
}
