import keyboardKey from 'keyboard-key'
import _ from 'lodash'

function keyListener(keyCodes: number | number[]) {
  if (!(keyCodes instanceof Array)) {
    keyCodes = [keyCodes]
  }

  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const decorated: Function = descriptor.value
    descriptor.value = function (event: KeyboardEvent) {
      if (
        !event ||
        !(event instanceof KeyboardEvent) ||
        !_.includes(<number[]>(<any>keyCodes), keyboardKey.getCode(event))
      ) {
        return
      }
      event.preventDefault()
      return decorated.apply(this, arguments)
    }
  }
}

export default keyListener
