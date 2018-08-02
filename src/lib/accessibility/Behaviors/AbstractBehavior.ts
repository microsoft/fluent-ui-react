import { ComponentState } from '../interfaces'
import UIComponent from '../../UIComponent'
import { KeyCodes } from '@uifabric/utilities'

export abstract class AbstractBehavior<P, S> {
  private keyHandlers: {
    [key: number]: (
      key: number,
      event: Event,
      component: UIComponent<P, S>,
      props: any,
      state: any,
    ) => void,
  }

  constructor(public readonly name: string) {}

  protected handleKey(
    key: KeyCodes,
    callback: (key: KeyCodes, event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.keyHandlers = this.keyHandlers || {}
    this.keyHandlers[key] = callback
  }

  public abstract changeState(newState: ComponentState): void

  public onKeyDown(component: UIComponent<P, S>, props, state): object {
    return event => {
      const keyCode = event.which || event.keyCode
      if (this.keyHandlers && this.keyHandlers[keyCode]) {
        this.keyHandlers[keyCode](keyCode, event, component, props, state)
      }
    }
  }
}
