import { ComponentState } from '../interfaces'
import UIComponent from '../../UIComponent'

export abstract class AbstractBehavior<P, S> {
  private keyHandlers: {
    [key: string]: (
      key: string,
      event: Event,
      component: UIComponent<P, S>,
      props: any,
      state: any,
    ) => boolean,
  }

  constructor(public readonly name: string) {}

  protected handleKey(
    key: string,
    callback: (key: string, event: Event, sender: UIComponent<P, S>, props: P, state: S) => boolean,
  ): void {
    this.keyHandlers = this.keyHandlers || {}
    this.keyHandlers[key] = callback
  }

  public abstract changeState(newState: ComponentState): void

  public generateKeyHandlers(component: UIComponent<P, S>, props, state): object {
    return {
      onKeyDown: event => {
        if (this.keyHandlers && this.keyHandlers[event.key]) {
          this.keyHandlers[event.key](event.key, event, component, props, state)
        }
      },
    }
  }
}
