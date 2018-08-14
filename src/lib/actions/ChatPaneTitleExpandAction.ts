import { Action, ActionHandler } from './Action'

export interface ChatPaneTitleExpandActionParams {
  index: number
  expand: boolean
  event: Event
}

export default class ChatPaneTitleExpandAction {
  private static actionName = 'ChatPaneTitleExpandAction'

  public static handler(
    call: (params: ChatPaneTitleExpandActionParams) => void,
  ): ActionHandler<ChatPaneTitleExpandActionParams> {
    return { name: ChatPaneTitleExpandAction.actionName, call }
  }

  public static execute(
    params: ChatPaneTitleExpandActionParams,
  ): Action<ChatPaneTitleExpandActionParams> {
    return { name: ChatPaneTitleExpandAction.actionName, params }
  }
}
