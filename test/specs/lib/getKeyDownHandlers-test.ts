import getKeyDownHandlers from 'src/lib/getKeyDownHandlers'

const testKeyCode = 27
const props = {}
const partElementName = 'anchor'
let actionsDefinition

const eventArg: KeyboardEvent = {
  keyCode: testKeyCode,
  altKey: false,
  charCode: null,
  ctrlKey: null,
  getModifierState: () => undefined,
  key: null,
  locale: null,
  location: null,
  metaKey: null,
  repeat: null,
  shiftKey: null,
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
} as any

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

      keyHandlers[partElementName] && keyHandlers[partElementName]['onKeyDown'](eventArg)
      expect(actions.testAction).toHaveBeenCalled()
      expect(actions.otherAction).toHaveBeenCalled()
      expect(actions.anotherTestAction).not.toHaveBeenCalled()
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
