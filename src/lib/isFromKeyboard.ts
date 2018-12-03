import * as whatInput from 'what-input'
import tsUtils from './typescriptUtils'
export interface State {
  isFromKeyboard: boolean
}

export default class IsFromKeyboard {
  static readonly propertyName = tsUtils.nameof<State>('isFromKeyboard')

  static initial: State = IsFromKeyboard.getObjectWithPropValue(false)

  static state = (): State => IsFromKeyboard.getObjectWithPropValue(whatInput.ask() === 'keyboard')

  private static getObjectWithPropValue(value: boolean): State {
    return { [IsFromKeyboard.propertyName]: value }
  }
}
