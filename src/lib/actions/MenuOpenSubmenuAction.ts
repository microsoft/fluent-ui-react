import { Action, ActionHandler } from './Action'

export interface MenuOpenSubmenuActionParams {
  moveFocus: boolean
  focusLast?: boolean
}

export default class MenuOpenSubmenuAction {
  private static actionName = 'MenuOpenSubmenuAction'

  public static handler(
    call: (MenuCloseSubmenuActionParams) => void,
  ): ActionHandler<MenuOpenSubmenuActionParams> {
    return { name: MenuOpenSubmenuAction.actionName, call }
  }

  public static execute(params: MenuOpenSubmenuActionParams): Action<MenuOpenSubmenuActionParams> {
    return { name: MenuOpenSubmenuAction.actionName, params }
  }
}
