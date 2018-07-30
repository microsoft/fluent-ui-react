import { Action, ActionHandler } from './Action'

export default class ClickAction {
  private static actionName = 'ClickAction'

  public static handler(call: () => void): ActionHandler<void> {
    return { name: ClickAction.actionName, call }
  }

  public static execute(): Action<void> {
    return { name: ClickAction.actionName, params: undefined }
  }
}
