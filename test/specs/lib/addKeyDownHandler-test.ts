import addKeyDownHandler from 'src/lib/addKeyDownHandler'
import { IAccessibilityDefinition } from 'src/lib/accessibility/interfaces'
import { DefaultBehavior } from 'src/lib/accessibility'

const testKeyCode = 27
const accessibility = DefaultBehavior as IAccessibilityDefinition
const props = {}
const partElementName = 'anchor'

const eventArg: React.KeyboardEvent = {
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
}

describe('addKeyDownHandler', () => {
  beforeEach(() => {
    accessibility.actionsDefinition = {
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

      addKeyDownHandler(actions, accessibility, props)
      expect(accessibility.hasOwnProperty('handlers')).toBeTruthy()
      expect(accessibility.handlers.hasOwnProperty(partElementName)).toBeTruthy()
      expect(accessibility.handlers[partElementName].hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('for few component elements', () => {
      const actions = {
        testAction: () => {},
        someOtherTestAction: () => {},
      }

      const anotherPartName = 'root'

      accessibility.actionsDefinition[anotherPartName] = {
        someOtherTestAction: {
          keyCombinations: [{ keyCode: testKeyCode }],
        },
      }

      addKeyDownHandler(actions, accessibility, props)
      expect(accessibility.hasOwnProperty('handlers')).toBeTruthy()
      expect(accessibility.handlers.hasOwnProperty(partElementName)).toBeTruthy()
      expect(accessibility.handlers.hasOwnProperty(anotherPartName)).toBeTruthy()
      expect(accessibility.handlers[partElementName].hasOwnProperty('onKeyDown')).toBeTruthy()
      expect(accessibility.handlers[anotherPartName].hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('when there is 1 common action and few others that are not common', () => {
      const actions = {
        uncommonAction: () => {},
        testAction: () => {},
      }

      accessibility.actionsDefinition[partElementName].doSomething = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }
      accessibility.actionsDefinition[partElementName].doSomethingElse = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }

      addKeyDownHandler(actions, accessibility, props)
      expect(accessibility.handlers.hasOwnProperty(partElementName)).toBeTruthy()
      expect(accessibility.handlers[partElementName].hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('and action should be invoked if keydown event has keycode mapped to that action', () => {
      const actions = {
        testAction: jest.fn(),
        otherAction: jest.fn(),
        anotherTestAction: jest.fn(),
      }

      accessibility.actionsDefinition[partElementName].otherAction = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }
      accessibility.actionsDefinition[partElementName].anotherTestAction = {
        keyCombinations: [{ keyCode: 21 }],
      }

      addKeyDownHandler(actions, accessibility, props)

      accessibility.handlers[partElementName] &&
        accessibility.handlers[partElementName]['onKeyDown'](eventArg)
      expect(actions.testAction).toHaveBeenCalled()
      expect(actions.otherAction).toHaveBeenCalled()
      expect(actions.anotherTestAction).not.toHaveBeenCalled()
    })
  })

  describe('should not attach onKeyDown handler', () => {
    test('when actions are null', () => {
      const actions = null

      addKeyDownHandler(actions, accessibility, props)
      expect(accessibility.handlers.hasOwnProperty(partElementName)).toBeFalsy()
    })
    test("when acessibility's actionsDefinition is null", () => {
      const actions = {
        otherAction: (event: React.KeyboardEvent) => {},
      }

      addKeyDownHandler(actions, DefaultBehavior as IAccessibilityDefinition, props)
      expect(accessibility.handlers.hasOwnProperty(partElementName)).toBeFalsy()
    })
    test('there are not common actions and actions definition', () => {
      const actions = {
        otherAction: (event: React.KeyboardEvent) => {},
      }

      addKeyDownHandler(actions, accessibility, props)
      expect(accessibility.handlers.hasOwnProperty(partElementName)).toBeFalsy()
    })
  })
})
