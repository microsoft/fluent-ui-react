import { INavigableActionHandler, ActionHandler } from '../interfaces'
import { mapKeysToActions } from '../../Helpers/keyboardHandler'
import { LinkedList } from '../../Helpers/linkedList'

import {
  getNextElement,
  getPreviousElement,
  isElementVisible,
  isBooleanAttributeSet,
} from '../../Helpers/dom'

class MenuActionHandler extends ActionHandler implements INavigableActionHandler {
  private readonly IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable'
  private _isCircularNavigation: boolean = true
  private _currentFocusedElement: HTMLElement
  private _linkedList: LinkedList<HTMLElement>

  private _isFocusable(element: HTMLElement | undefined | null): boolean {
    if (!element) return false

    const isDisabled = isBooleanAttributeSet(element, 'disabled')
    const isFocusable = isBooleanAttributeSet(element, this.IS_FOCUSABLE_ATTRIBUTE)

    return isFocusable && !isDisabled && isElementVisible(element)
  }

  public moveNext(event: KeyboardEvent) {
    const nextElement = this._linkedList.next()

    if (!nextElement) return
    nextElement.focus()

    event.stopPropagation()
    event.preventDefault()
  }

  public movePrevious(event: KeyboardEvent) {
    const previousElement = this._linkedList.previous()

    if (!previousElement) return
    previousElement.focus()

    event.stopPropagation()
    event.preventDefault()
  }

  public moveFirst(event: KeyboardEvent) {
    const firstElement = this._linkedList.head.item

    if (!firstElement) return
    firstElement.focus()

    event.stopPropagation()
    event.preventDefault()
  }

  public moveLast(event: KeyboardEvent) {
    const lastElement = this._linkedList.tail.item

    if (!lastElement) return
    lastElement.focus()

    event.stopPropagation()
    event.preventDefault()
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
      }
      this._currentFocusedElement = target

      event.stopPropagation()
      event.preventDefault()
    }
  }

  private getFocusableElementsList(parentElement: HTMLElement) {
    const children = parentElement.children
    if (!children.length) return
    const list = new LinkedList<HTMLElement>()
    list.isCircular = this._isCircularNavigation

    const childrenArray = [].slice.apply(children)

    childrenArray.forEach(element => {
      const focusableChild = element.querySelector(`[${this.IS_FOCUSABLE_ATTRIBUTE}]`)
      if (this._isFocusable(focusableChild)) {
        list.append(focusableChild)
      }
    })

    return list
  }

  constructor(props, htmlElement) {
    super(htmlElement)

    if (props['disabled']) return

    this._linkedList = this.getFocusableElementsList(htmlElement)

    this._keyboardHandlers = mapKeysToActions(props.actionsDefinition, {
      moveNext: this.moveNext.bind(this),
      movePrevious: this.movePrevious.bind(this),
      moveLast: this.moveLast.bind(this),
      moveFirst: this.moveFirst.bind(this),
    })
  }

  public onStateChanged(props: any) {
    if (props['disabled']) {
      this.detachKeyboardEventHandlers()
    }
  }
}

export default MenuActionHandler
