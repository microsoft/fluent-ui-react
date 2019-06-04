import shouldHandleOnKeys from 'src/lib/shouldHandleOnKeys'

const getEventArg = (
  keyCode: number,
  altKey?: boolean,
  ctrlKey?: boolean,
  metaKey?: boolean,
  shiftKey?: boolean,
): any => {
  return {
    keyCode,
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
  }
}

describe('shouldHandleOnKeys', () => {
  test('should return `true`', () => {
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

      expect(shouldHandleOnKeys(eventArg, keyCombinations)).toBe(true)
    })
  })

  test('should return `false`', () => {
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

      expect(shouldHandleOnKeys(eventArg, keyCombinations)).toBe(false)
    })
  })
})
