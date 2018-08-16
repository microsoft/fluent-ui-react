import { IActionHandler, ActionHandler } from '../interfaces'
import { mapKeysToActions } from '../../Helpers/keyboardHandler'
import { KeyCodes } from '../../../KeyCodes'


class MenuItemActionHandler extends ActionHandler implements IActionHandler {
  private readonly IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable'

  constructor(props, htmlElement, openSubmenu, closeSubmenu) {
    super(htmlElement)

    if (props['disabled']) return

    const wrappedOpenSubmenu = (event) => {
      openSubmenu(event, (event)=> {        
        const submenu = htmlElement.querySelector('.ui-menu') as HTMLElement
        if (!submenu) return
        
        var keyboardEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'ArrowDown',
          code: KeyCodes.down.toString()
        });
        submenu.dispatchEvent(keyboardEvent) 
      }
    )}

    const wrappedCloseMenu = (event) => {
      closeSubmenu(event, () => {
        const focusableELement = htmlElement.querySelector(`[${this.IS_FOCUSABLE_ATTRIBUTE}="true"]`)
        if (!focusableELement) return
        focusableELement.focus()
      })
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
}

export default MenuItemActionHandler


