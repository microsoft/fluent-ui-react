import addKeyDownHandler from 'src/lib/addKeyDownHandler'
import { IAccessibilityDefinition } from 'src/lib/accessibility/interfaces'
import { DefaultBehavior } from 'src/lib/accessibility'

const testKeyCode = 27
const accessibility = DefaultBehavior as IAccessibilityDefinition
const props = {}
let rest = {}

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
      testAction: {
        keyCombinations: [{ keyCode: testKeyCode }],
      },
    }

    rest = {}
  })

  describe('should attach onKeyDown handler', () => {
    test('when there are common actions and actions definition', () => {
      const actions = {
        testAction: () => {},
      }

      addKeyDownHandler(rest, actions, accessibility, props)
      expect(rest.hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('when there is 1 common action and few others that are not common', () => {
      const actions = {
        uncommonAction: () => {},
        testAction: () => {},
      }

      accessibility.actionsDefinition.doSomething = { keyCombinations: [{ keyCode: testKeyCode }] }
      accessibility.actionsDefinition.doSomethingElse = {
        keyCombinations: [{ keyCode: testKeyCode }],
      }

      addKeyDownHandler(rest, actions, accessibility, props)
      expect(rest.hasOwnProperty('onKeyDown')).toBeTruthy()
    })
    test('and action should be invoked if keydown event has keycode mapped to that action', () => {
      const actions = {
        testAction: jest.fn(),
        otherAction: jest.fn(),
        anotherTestAction: jest.fn(),
      }

      accessibility.actionsDefinition.otherAction = { keyCombinations: [{ keyCode: testKeyCode }] }
      accessibility.actionsDefinition.anotherTestAction = { keyCombinations: [{ keyCode: 21 }] }

      addKeyDownHandler(rest, actions, accessibility, props)

      rest['onKeyDown'] && rest['onKeyDown'](eventArg)
      expect(actions.testAction).toHaveBeenCalled()
      expect(actions.otherAction).toHaveBeenCalled()
      expect(actions.anotherTestAction).not.toHaveBeenCalled()
    })
  })

  describe('should not attach onKeyDown handler', () => {
    test('when actions are null', () => {
      const actions = null

      addKeyDownHandler(rest, actions, accessibility, props)
      expect(rest.hasOwnProperty('onKeyDown')).toBeFalsy()
    })
    test("when acessibility's actionsDefinition is null", () => {
      const actions = {
        otherAction: (event: React.KeyboardEvent) => {},
      }

      addKeyDownHandler(rest, actions, DefaultBehavior as IAccessibilityDefinition, props)
      expect(rest.hasOwnProperty('onKeyDown')).toBeFalsy()
    })
    test('there are not common actions and actions definition', () => {
      const actions = {
        otherAction: (event: React.KeyboardEvent) => {},
      }

      addKeyDownHandler(rest, actions, accessibility, props)
      expect(rest.hasOwnProperty('onKeyDown')).toBeFalsy()
    })
  })
})
