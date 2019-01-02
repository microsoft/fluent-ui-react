import getKeyDownHandlers from 'src/lib/getKeyDownHandlers'
import * as keyboardKey from 'keyboard-key'

const testKeyCode = keyboardKey.ArrowRight
const props = {}
const partElementName = 'anchor'
let actionsDefinition

const eventArg = (keyCodeValue: number): any => ({
  keyCode: keyCodeValue,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
})

describe('getKeyDownHandlers', () => {
  beforeEach(() => {
    actionsDefinition = {
      [partElementName]: {
        testAction: {
          keyCombinations: [{ keyCode: testKeyCode }],
        },
      },
    }
  })

  describe('should attach onKeyDown handler', () => {
    test('when there are common actions and actions definition', () => {
      const actions = {
        testAction: () => {},
      }

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, props)
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeTruthy()
      expect(keyHandlers[partElementName].hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('for few component elements', () => {
      const actions = {
        testAction: () => {},
        someOtherTestAction: () => {},
      }

      const anotherPartName = 'root'

      actionsDefinition[anotherPartName] = {
        someOtherTestAction: {
          keyCombinations: [{ keyCode: testKeyCode }],
        },
      }

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, props)
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeTruthy()
      expect(keyHandlers.hasOwnProperty(anotherPartName)).toBeTruthy()
      expect(keyHandlers[partElementName].hasOwnProperty('onKeyDown')).toBeTruthy()
      expect(keyHandlers[anotherPartName].hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('when there is 1 common action and few others that are not common', () => {
      const actions = {
        uncommonAction: () => {},
        testAction: () => {},
      }

      actionsDefinition[partElementName].doSomething = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }
      actionsDefinition[partElementName].doSomethingElse = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, props)
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeTruthy()
      expect(keyHandlers[partElementName].hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('and action should be invoked if keydown event has keycode mapped to that action', () => {
      const actions = {
        testAction: jest.fn(),
        otherAction: jest.fn(),
        anotherTestAction: jest.fn(),
      }

      actionsDefinition[partElementName].otherAction = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }
      actionsDefinition[partElementName].anotherTestAction = {
        keyCombinations: [{ keyCode: 21 }],
      }

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, props)

      keyHandlers[partElementName] &&
        keyHandlers[partElementName]['onKeyDown'](eventArg(testKeyCode))
      expect(actions.testAction).toHaveBeenCalled()
      expect(actions.otherAction).toHaveBeenCalled()
      expect(actions.anotherTestAction).not.toHaveBeenCalled()
    })

    describe('with respect of RTL', () => {
      test('swap Right key to Left key', () => {
        const actions = {
          actionOnLeftArrow: jest.fn(),
          actionOnRightArrow: jest.fn(),
        }

        actionsDefinition[partElementName].actionOnLeftArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        }
        actionsDefinition[partElementName].actionOnRightArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        }
        const keyHandlers = getKeyDownHandlers(
          actions,
          actionsDefinition,
          props,
          /** isRtlEnabled */ true,
        )

        keyHandlers[partElementName]['onKeyDown'](eventArg(keyboardKey.ArrowRight))
        expect(actions.actionOnLeftArrow).toHaveBeenCalled()
        expect(actions.actionOnRightArrow).not.toHaveBeenCalled()
      })

      test('swap Left key to Right key', () => {
        const actions = {
          actionOnLeftArrow: jest.fn(),
          actionOnRightArrow: jest.fn(),
        }

        actionsDefinition[partElementName].actionOnLeftArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        }
        actionsDefinition[partElementName].actionOnRightArrow = {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        }
        const keyHandlers = getKeyDownHandlers(
          actions,
          actionsDefinition,
          props,
          /** isRtlEnabled */ true,
        )

        keyHandlers[partElementName]['onKeyDown'](eventArg(keyboardKey.ArrowLeft))
        expect(actions.actionOnLeftArrow).not.toHaveBeenCalled()
        expect(actions.actionOnRightArrow).toHaveBeenCalled()
      })
    })
  })

  describe('should not attach onKeyDown handler', () => {
    test('when actions are null', () => {
      const actions = null

      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, props)
      expect(keyHandlers.hasOwnProperty(partElementName)).toBeFalsy()
    })
    test("when acessibility's actionsDefinition is null", () => {
      const actions = { otherAction: () => {} }
      const keyHandlers = getKeyDownHandlers(actions, null, props)

      expect(keyHandlers.hasOwnProperty(partElementName)).toBeFalsy()
    })
    test('there are not common actions and actions definition', () => {
      const actions = { otherAction: () => {} }
      const keyHandlers = getKeyDownHandlers(actions, actionsDefinition, props)

      expect(keyHandlers.hasOwnProperty(partElementName)).toBeFalsy()
    })
  })
})
