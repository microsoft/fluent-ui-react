import whatInput from 'what-input'

export default class IsFromKeyboard {
  static state = () => {
    const isFromKeyboard = whatInput.ask() === 'keyboard'
    return { isFromKeyboard }
  }

  static initial = { isFromKeyboard: false }

  static propertyName = 'isFromKeyboard'
}
