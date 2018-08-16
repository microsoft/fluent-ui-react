import { IActionHandler, ActionHandler } from '../interfaces'
import { mapKeysToActions } from '../../Helpers/keyboardHandler'
import eventStack from '../../../eventStack'
import doesNodeContainClick from '../../../doesNodeContainClick'

class MenuItemActionHandler extends ActionHandler implements IActionHandler {
  private readonly IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable'
  private _documentEventHandler

  constructor(props, htmlElement, openSubmenu, closeSubmenu) {
    super(htmlElement)

    if (props['disabled']) return

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
        const focusableELement = htmlElement.querySelector(
          `[${this.IS_FOCUSABLE_ATTRIBUTE}="true"]`,
        )
        if (!focusableELement) return
        focusableELement.focus()
      })
    }

    this._documentEventHandler = (e: Event) => {
      e.stopPropagation()
      if (this._rootElement && doesNodeContainClick(this._rootElement, e)) return
      closeSubmenu()
    }

    this._keyboardHandlers = mapKeysToActions(props.actionsDefinition, {
      openSubmenu: wrappedOpenSubmenu,
      closeSubmenu: wrappedCloseMenu,
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
  }

  public detachKeyboardEventHandlers() {
    super.detachKeyboardEventHandlers()

    eventStack.unsub('click', this._documentEventHandler)
  }
}

export default MenuItemActionHandler
