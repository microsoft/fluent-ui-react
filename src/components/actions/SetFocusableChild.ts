import { Action, ActionHandler } from './Action'
import FocusGrab from '../../lib/accessibility/FocusGrab'

export const indexProperty = 'index'
export const focusableIndexProperty = 'focusableIndex'
export const defaultFocusableIndexProperty = 'defaultFocusableIndex'

export interface FocusableIndexState {
  [focusableIndexProperty]: number
  [FocusGrab.tokenProperty]: string
}

export enum Direction {
  Current,
  First,
  Previous,
  Next,
  Last,
}

export interface SetFocusableChildParams {
  state: FocusableIndexState
  direction?: Direction
}

export default class SetFocusableChild {
  private static readonly actionName = 'SetFocusableChild'
  public static readonly indexProperty = indexProperty
  public static readonly focusableIndexProperty = focusableIndexProperty
  public static readonly defaultFocusableIndexProperty = defaultFocusableIndexProperty

  public static handler(
    call: (SetFocusableChildParams) => boolean,
  ): ActionHandler<SetFocusableChildParams> {
    return { name: SetFocusableChild.actionName, call }
  }

  public static execute(params: SetFocusableChildParams): Action<SetFocusableChildParams> {
    return { name: SetFocusableChild.actionName, params }
  }

  public static getNewIndex: (params: SetFocusableChildParams, count: number) => number = (
    params,
    count,
  ) => {
    const fromIndex = params.state[focusableIndexProperty]
    switch (params.direction) {
      case Direction.First:
        return 0
      case Direction.Last:
        return count - 1
      case Direction.Next:
        return fromIndex + 1
      case Direction.Previous:
        return fromIndex - 1
      default:
        return fromIndex
    }
  }

  public static updateState: (
    params: SetFocusableChildParams,
    count: number,
    updateState: (state: FocusableIndexState) => void,
  ) => boolean = (params, count, updateState) => {
    const index = SetFocusableChild.getNewIndex(params, count)
    if (index < 0 || index >= count) {
      return false
    }
    updateState({
      [focusableIndexProperty]: index,
      [FocusGrab.tokenProperty]: FocusGrab.focusOnce(),
    })
    return true
  }
}
