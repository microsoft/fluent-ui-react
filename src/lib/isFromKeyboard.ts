import whatInput from 'what-input'
import tsUtils from './typescriptUtils'
export interface IState {
  isFromKeyboard: boolean
}

export default class IsFromKeyboard {
  static readonly propertyName = tsUtils.nameof<IState>('isFromKeyboard')

  static initial: IState = IsFromKeyboard.getObjectWithPropValue(false)

  static state = (): IState => IsFromKeyboard.getObjectWithPropValue(whatInput.ask() === 'keyboard')

  private static getObjectWithPropValue(value: boolean): IState {
    return { [IsFromKeyboard.propertyName]: value }
  }
}
