import { IActionHandler } from '../interfaces'
import { getNextElement, getPreviousElement } from '../Helpers'

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

  isElementVisible(element: HTMLElement | undefined | null): boolean {
    if (!element) return false
    return element.offsetHeight !== 0 || element.offsetParent !== null
  }

  isBooleanAttributeSet(element: HTMLElement | undefined | null, attributeName: string) {
    if (!element) return false
    return element.hasAttribute(attributeName) && element.getAttribute(attributeName) !== 'false'
  }

  isFocusable(element: HTMLElement | undefined | null): boolean {
    if (!element) return false

    const isDisabled = this.isBooleanAttributeSet(element, 'disabled')
    const isFocusable = this.isBooleanAttributeSet(element, this.IS_FOCUSABLE_ATTRIBUTE)

    return isFocusable && !isDisabled && this.isElementVisible(element)
  }

  checkNextCandidateElement(rootElement: HTMLElement, currentElement?: HTMLElement): boolean {
    return this.isFocusable(currentElement) && currentElement !== this._currentFocusedElement
  }

  getNextCandidateElement(): HTMLElement | null {
    const nextElement = getNextElement(
      this._rootElement,
      this._currentFocusedElement,
      this.checkNextCandidateElement.bind(this),
    )

    if (nextElement) {
      return nextElement
    } else if (this._isCircularNavigation) {
      return getNextElement(
        this._rootElement,
        this._rootElement.firstElementChild as HTMLElement,
        this.checkNextCandidateElement.bind(this),
        true,
      )
    }
  }

  getPreviousCandidateElement() {
    const previousElement = getPreviousElement(
      this._rootElement,
      this._currentFocusedElement,
      this.checkNextCandidateElement.bind(this),
    )

    if (previousElement) {
      return previousElement
    } else if (this._isCircularNavigation) {
      return getPreviousElement(
        this._rootElement,
        this._rootElement.lastElementChild as HTMLElement,
        this.checkNextCandidateElement.bind(this),
        true,
      )
    }
  }

  moveNext() {
    const nextElement = this.getNextCandidateElement()

    if (!nextElement) return

    if (this._currentFocusedElement) {
      this._currentFocusedElement.setAttribute(this.IS_FOCUSED, 'false')
    }

    this._currentFocusedElement = nextElement
    nextElement.setAttribute(this.IS_FOCUSED, 'true')
    nextElement.focus()
  }

  movePrevious() {
    const previousElement = this.getPreviousCandidateElement()

    if (!previousElement) return

    if (this._currentFocusedElement) {
      this._currentFocusedElement.setAttribute(this.IS_FOCUSED, 'false')
    }

    this._currentFocusedElement = previousElement
    previousElement.setAttribute(this.IS_FOCUSED, 'true')
    previousElement.focus()
  }

  moveFirst() {}

  moveLast() {}

  onFocus(event: Event) {
    console.log(event)
    // const target = event.target as HTMLElement
    // if (!target) return

    // if(this.isFocusable(target)) {

    //     if (this._currentFocusedElement) {
    //         this._currentFocusedElement.setAttribute(this.IS_FOCUSED, 'false')
    //     }
    //     this._currentFocusedElement = target
    //     target.setAttribute(this.IS_FOCUSED, 'true')
    // }
  }

  constructor(props, htmlElement) {
    this._rootElement = htmlElement
  }

  public onStateChanged(props: any) {}
}

export default MenuActionHandler
