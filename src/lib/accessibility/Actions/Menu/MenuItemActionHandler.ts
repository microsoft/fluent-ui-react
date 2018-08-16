import { IActionHandler, ActionHandler } from '../interfaces'
import { mapKeysToActions } from '../../Helpers/keyboardHandler'

class MenuItemActionHandler extends ActionHandler implements IActionHandler {
  constructor(props, htmlElement, openSubmenu, closeSubmenu) {
    super(htmlElement)

    if (props['disabled']) return
    this._keyboardHandlers = mapKeysToActions(props.actionsDefinition, {
      openSubmenu,
      closeSubmenu,
    })
  }

  public onStateChanged(props) {
    if (props['disabled']) {
      this.detachKeyboardEventHandlers()
    }
  }
}

export default MenuItemActionHandler
