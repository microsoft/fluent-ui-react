import { IActionHandler } from '../interfaces'
import keyboardHandlerFilter from '../../Helpers/keyboardHandlerFilter'
import {
  getNextElement,
  getPreviousElement,
  isElementVisible,
  isBooleanAttributeSet,
} from '../../Helpers/dom'
import eventStack from '../../../eventStack'

class MenuActionHandler implements IActionHandler {
  private _rootElement: HTMLElement
  private readonly IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable'
  private readonly IS_FOCUSED = 'data-focused'
  private _isCircularNavigation: boolean = true
  private _currentFocusedElement: HTMLElement

  getCurrentFocusedElement(rootElement: HTMLElement): HTMLElement | null | undefined {
    if (!rootElement) return null

    return rootElement.querySelector(`[${this.IS_FOCUSED}="true"]`) as HTMLElement
  }

  private _isFocusable(element: HTMLElement | undefined | null): boolean {
    if (!element) return false

    const isDisabled = isBooleanAttributeSet(element, 'disabled')
    const isFocusable = isBooleanAttributeSet(element, this.IS_FOCUSABLE_ATTRIBUTE)

    return isFocusable && !isDisabled && isElementVisible(element)
  }

  private _checkNextCandidateElement(currentElement?: HTMLElement): boolean {
    return this._isFocusable(currentElement) && currentElement !== this._currentFocusedElement
  }

  private _getNextCandidateElement(): HTMLElement | null {
    const nextElement = getNextElement(
      this._rootElement,
      this._currentFocusedElement,
      this._checkNextCandidateElement.bind(this),
    )

    if (nextElement) {
      return nextElement
    } else if (this._isCircularNavigation) {
      return getNextElement(
        this._rootElement,
        this._rootElement.firstElementChild as HTMLElement,
        this._checkNextCandidateElement.bind(this),
        true,
      )
    }
  }

  private _getPreviousCandidateElement() {
    const previousElement = getPreviousElement(
      this._rootElement,
      this._currentFocusedElement,
      this._checkNextCandidateElement.bind(this),
    )

    if (previousElement) {
      return previousElement
    } else if (this._isCircularNavigation) {
      return getPreviousElement(
        this._rootElement,
        this._rootElement.lastElementChild as HTMLElement,
        this._checkNextCandidateElement.bind(this),
        true,
      )
    }
  }

  public moveNext() {
    const nextElement = this._getNextCandidateElement()

    if (!nextElement) return
    nextElement.focus()
  }

  public movePrevious() {
    const previousElement = this._getPreviousCandidateElement()

    if (!previousElement) return
    previousElement.focus()
  }

  public moveFirst() {
    const firstElement = getNextElement(
      this._rootElement,
      this._rootElement.firstElementChild as HTMLElement,
      this._checkNextCandidateElement.bind(this),
      true,
    )

    if (!firstElement) return
    firstElement.focus()
  }

  public moveLast() {
    const lastElement = getPreviousElement(
      this._rootElement,
      this._rootElement.lastElementChild as HTMLElement,
      this._checkNextCandidateElement.bind(this),
      true,
    )

    if (!lastElement) return
    lastElement.focus()
  }

  public onFocus(event: Event) {
    const target = event.target as HTMLElement
    if (!target) return

    if (this._isFocusable(target)) {
      if (this._currentFocusedElement) {
        if (this._currentFocusedElement.tabIndex === 0) {
          this._currentFocusedElement.tabIndex = -1
          target.tabIndex = 0
        }
        this._currentFocusedElement.setAttribute(this.IS_FOCUSED, 'false')
      }
      this._currentFocusedElement = target
      target.setAttribute(this.IS_FOCUSED, 'true')
    }
  }

  private _actionHandlers = []

  constructor(props, htmlElement) {
    this._rootElement = htmlElement

    const actionsDefinition = props.actionsDefinition

    for (const action in actionsDefinition) {
      if (!this[action]) continue
      const filteredAction = keyboardHandlerFilter(
        this[action].bind(this),
        actionsDefinition[action].keyCombinations,
      )
      this._actionHandlers.push(filteredAction)
    }
  }

  public onStateChanged(props: any) {}

  public attachKeyboardEventHandlers() {
    eventStack.sub('keydown', this._actionHandlers, { target: this._rootElement })
  }

  public detachKeyboardEventHandlers() {
    eventStack.unsub('keydown', this._actionHandlers, { target: this._rootElement })
  }
}

export default MenuActionHandler
