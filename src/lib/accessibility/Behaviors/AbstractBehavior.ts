import { ComponentState } from '../interfaces'
import UIComponent from '../../UIComponent'
import { KeyCodes } from '../../fabric/KeyCodes'

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

  private blurHandler: (event: Event, component: UIComponent<P, S>, props: any, state: any) => void

  private focusHandler: (event: Event, component: UIComponent<P, S>, props: any, state: any) => void

  private clickHandler: (event: Event, component: UIComponent<P, S>, props: any, state: any) => void

  constructor(public readonly name: string) {}

  protected handleKey(
    key: KeyCodes,
    callback: (key: KeyCodes, event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.keyHandlers = this.keyHandlers || {}
    this.keyHandlers[key] = callback
  }

  protected handleBlur(
    callback: (event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.blurHandler = callback
  }

  protected handleFocus(
    callback: (event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.focusHandler = callback
  }

  protected handleClick(
    callback: (event: Event, sender: UIComponent<P, S>, props: P, state: S) => void,
  ): void {
    this.clickHandler = callback
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

  public onBlur(component: UIComponent<P, S>, props, state): object {
    return event => {
      this.blurHandler && this.blurHandler(event, component, props, state)
    }
  }

  public onFocus(component: UIComponent<P, S>, props, state): object {
    return event => {
      this.focusHandler && this.focusHandler(event, component, props, state)
    }
  }

  public onClick(component: UIComponent<P, S>, props, state): object {
    return event => {
      this.clickHandler && this.clickHandler(event, component, props, state)
    }
  }
}
