import UIComponent from '../../UIComponent'
import keyboardKey from 'keyboard-key'

export abstract class AbstractBehavior<P, S> {
  public component: UIComponent<P, S>
  public elementRef: HTMLElement

  private keyHandlers: {
    [key: number]: (
      key: number,
      event: Event,
      component: UIComponent<P, S>,
      props: any,
      state: any,
    ) => void
  }

  constructor(public readonly name: string) {}

  protected handleKey(
    key: number,
    callback: (key: number, event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.keyHandlers = this.keyHandlers || {}
    this.keyHandlers[key] = callback
  }

  public onKeyDown(component: UIComponent<P, S>, props, state): object {
    return event => {
      const keyCode = keyboardKey.getCode(event)
      if (this.keyHandlers && this.keyHandlers[keyCode]) {
        this.keyHandlers[keyCode](keyCode, event, component, props, state)
      }
    }
  }
}
