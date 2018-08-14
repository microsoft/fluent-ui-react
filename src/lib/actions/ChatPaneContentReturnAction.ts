import { Action, ActionHandler } from './Action'

export interface ChatPaneContentReturnActionParams {
  index: number
}

export default class ChatPaneContentReturnAction {
  private static actionName = 'ChatPaneTitleExpandAction'

  public static handler(
    call: (params: ChatPaneContentReturnActionParams) => void,
  ): ActionHandler<ChatPaneContentReturnActionParams> {
    return { name: ChatPaneContentReturnAction.actionName, call }
  }

  public static execute(
    params: ChatPaneContentReturnActionParams,
  ): Action<ChatPaneContentReturnActionParams> {
    return { name: ChatPaneContentReturnAction.actionName, params }
  }
}
