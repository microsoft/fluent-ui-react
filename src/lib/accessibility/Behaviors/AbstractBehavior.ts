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
    ) => void,
  }

  constructor(public readonly name: string) {}

  protected handleKey(
    key: string,
    callback: (key: string, event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.keyHandlers = this.keyHandlers || {}
    this.keyHandlers[key] = callback
  }

  public abstract changeState(newState: ComponentState): void

  public onKeyDown(component: UIComponent<P, S>, props, state): object {
    return event => {
      if (this.keyHandlers && this.keyHandlers[event.key]) {
        this.keyHandlers[event.key](event.key, event, component, props, state)
      }
    }
  }
}
