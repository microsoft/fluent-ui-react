import { Action, ActionHandler } from './Action'

export default class FocusAction {
  private static actionName = 'FocusAction'

  public static handler(call: () => void): ActionHandler<void> {
    return { name: FocusAction.actionName, call }
  }

  public static execute(): Action<void> {
    return { name: FocusAction.actionName, params: undefined }
  }
}
