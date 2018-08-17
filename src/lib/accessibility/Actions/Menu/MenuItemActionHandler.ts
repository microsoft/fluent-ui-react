import { IActionHandler, ActionHandler } from '../interfaces'
import { mapKeysToActions } from '../../Helpers/keyboardHandler'
import eventStack from '../../../eventStack'
import doesNodeContainClick from '../../../doesNodeContainClick'

class MenuItemActionHandler extends ActionHandler implements IActionHandler {
  private readonly IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable'
  private _documentEventHandler
  private _focusableElement: HTMLElement

  constructor(props, htmlElement, openSubmenu, closeSubmenu) {
    super(htmlElement)

    if (props['disabled']) return

    this._focusableElement = htmlElement.querySelector(`[${this.IS_FOCUSABLE_ATTRIBUTE}="true"]`)

    const wrappedOpenSubmenu = event => {
      openSubmenu(event, event => {
        const submenu = htmlElement.querySelector('.ui-menu') as HTMLElement
        if (!submenu) return

        let keyboardEvent

        if (event.type !== 'keydown') return

        // Propagate event to submenu, so it will focus menu item (first or last)
        if (event.code === 'Space' || event.code === 'Enter') {
          keyboardEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
            code: 'ArrowDown',
          })
        } else {
          keyboardEvent = new KeyboardEvent(event.type, event)
        }

        submenu.dispatchEvent(keyboardEvent)
      })
    }

    const wrappedCloseMenu = event => {
      closeSubmenu(event, () => {
        if (!this._focusableElement) return
        this._focusableElement.focus()
      })
    }

    // close submenu on Blur event
    this._documentEventHandler = (e: Event) => {
      e.stopPropagation()
      if (this._rootElement && doesNodeContainClick(this._rootElement, e)) return
      closeSubmenu()
    }

    this._keyboardHandlers = mapKeysToActions(props.actionsDefinition, {
      triggerAction: wrappedOpenSubmenu,
      cancelAction: wrappedCloseMenu,
    })
  }

  public onStateChanged(props) {
    if (props['disabled']) {
      this.detachKeyboardEventHandlers()
    }
  }

  public attachKeyboardEventHandlers() {
    super.attachKeyboardEventHandlers()

    eventStack.sub('click', this._documentEventHandler)

    // Focus event doesn't bubble itself, so capturing was used to handle event on a menu
    eventStack.sub('focus', () => {}, { target: this._focusableElement, useCapture: true })
  }

  public detachKeyboardEventHandlers() {
    super.detachKeyboardEventHandlers()

    eventStack.unsub('click', this._documentEventHandler)

    // Focus event doesn't bubble itself, so capturing was used to handle event on a menu
    eventStack.unsub('focus', () => {}, { target: this._focusableElement, useCapture: true })
  }
}

export default MenuItemActionHandler
