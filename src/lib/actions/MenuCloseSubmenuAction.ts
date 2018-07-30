import { Action, ActionHandler } from './Action'

export interface MenuCloseSubmenuActionParams {
  moveFocus: boolean
}

export default class MenuCloseSubmenuAction {
  private static actionName = 'MenuCloseSubmenuAction'

  public static handler(
    call: (MenuCloseSubmenuActionParams) => void,
  ): ActionHandler<MenuCloseSubmenuActionParams> {
    return { name: MenuCloseSubmenuAction.actionName, call }
  }

  public static execute(
    params: MenuCloseSubmenuActionParams,
  ): Action<MenuCloseSubmenuActionParams> {
    return { name: MenuCloseSubmenuAction.actionName, params }
  }
}
