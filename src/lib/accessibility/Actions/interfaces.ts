import eventStack from '../../eventStack'
export interface IActionHandler {
  onStateChanged(props: any)
}
export interface INavigable {
  moveNext(event: KeyboardEvent)
  movePrevious(event: KeyboardEvent)
  moveFirst(event: KeyboardEvent)
  moveLast(event: KeyboardEvent)
}

export interface INavigableActionHandler extends IActionHandler, INavigable {}

export interface IActionable {
  triggerAction(event: KeyboardEvent)
}

export interface ICancelable {
  cancelAction(event: KeyboardEvent)
}

export interface IActionableActionHandler extends IActionHandler, IActionable, ICancelable {}

export abstract class ActionHandler {
  protected _rootElement: HTMLElement
  protected _keyboardHandlers

  constructor(element: HTMLElement) {
    this._rootElement = element
  }

  public attachKeyboardEventHandlers() {
    if (!this._keyboardHandlers || !this._keyboardHandlers.length) return
    eventStack.sub('keydown', this._keyboardHandlers, { target: this._rootElement })
  }

  public detachKeyboardEventHandlers() {
    if (!this._keyboardHandlers || !this._keyboardHandlers.length) return
    eventStack.unsub('keydown', this._keyboardHandlers, { target: this._rootElement })
  }
}
