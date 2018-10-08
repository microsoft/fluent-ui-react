import keyboardHandlerFilter from 'src/lib/keyboardHandlerFilter'

const getEventArg = (
  keyCode: number,
  altKey?: boolean,
  ctrlKey?: boolean,
  metaKey?: boolean,
  shiftKey?: boolean,
): React.KeyboardEvent => {
  return {
    keyCode,
    altKey,
    charCode: null,
    ctrlKey,
    getModifierState: () => undefined,
    key: null,
    locale: null,
    location: null,
    metaKey,
    repeat: null,
    shiftKey,
    which: null,
    bubbles: null,
    cancelable: null,
    currentTarget: null,
    defaultPrevented: null,
    eventPhase: null,
    isTrusted: null,
    nativeEvent: null,
    persist: () => undefined,
    preventDefault: () => undefined,
    isDefaultPrevented: () => undefined,
    stopPropagation: () => undefined,
    isPropagationStopped: () => undefined,
    target: null,
    timeStamp: null,
    type: null,
  }
}

describe('addKeyDownHandler', () => {
  test('should invoke handler', () => {
    const handlerSpy = jest.fn()

    // keys mapping defined for actions
    const keyCombinations = [
      { keyCode: 27 },
      { keyCode: 28, altKey: true },
      { keyCode: 32, shiftKey: true, metaKey: true },
      { keyCode: 39, ctrlKey: true },
      { keyCode: 42, altKey: true, ctrlKey: true, shiftKey: true, metaKey: true },
    ]

    keyCombinations.forEach(keyCombination => {
      const eventArg = getEventArg(
        keyCombination.keyCode,
        keyCombination.altKey,
        keyCombination.ctrlKey,
        keyCombination.metaKey,
        keyCombination.shiftKey,
      )

      const eventHandler = keyboardHandlerFilter(handlerSpy, keyCombinations)
      eventHandler(eventArg)
      expect(handlerSpy).toHaveBeenCalled()
      expect(handlerSpy).toHaveBeenCalledWith(eventArg)
    })
  })

  test('should not invoke handler', () => {
    const handlerSpy = jest.fn()

    // keys mapping defined for actions
    const keyCombinations = [
      { keyCode: 27, ctrlKey: true },
      { keyCode: 32 },
      { keyCode: 32, altKey: true },
      { keyCode: 39, shiftKey: true, metaKey: true },
    ]

    // other keys mapping, that will be passed as keydown event
    const otherKeysMapping = [
      { keyCode: 27, ctrlKey: false },
      { keyCode: 31, altKey: true },
      { keyCode: 39, shiftKey: false, metaKey: false },
    ]

    otherKeysMapping.forEach(keyCombination => {
      const eventArg = getEventArg(
        keyCombination.keyCode,
        keyCombination.altKey,
        keyCombination.ctrlKey,
        keyCombination.metaKey,
        keyCombination.shiftKey,
      )

      const eventHandler = keyboardHandlerFilter(handlerSpy, keyCombinations)
      eventHandler(eventArg)
      expect(handlerSpy).not.toHaveBeenCalled()
    })
  })
})
