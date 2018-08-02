import { Action, ActionHandler } from './Action'

export interface ClickActionParams {
  event?: Event
}

export default class ClickAction {
  private static actionName = 'ClickAction'

  public static handler(call: (ClickActionParams) => void): ActionHandler<ClickActionParams> {
    return { name: ClickAction.actionName, call }
  }

  public static execute(params: ClickActionParams): Action<ClickActionParams> {
    return { name: ClickAction.actionName, params }
  }
}
