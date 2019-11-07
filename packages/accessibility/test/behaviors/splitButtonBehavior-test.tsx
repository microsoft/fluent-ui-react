import { splitButtonBehavior } from '@stardust-ui/accessibility'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

function verifyKeys(supportedKeys, obtainedKeys) {
  obtainedKeys.forEach(keyCombination => {
    const keyCombinationFound = _.find(supportedKeys, keyCombination)
    expect(keyCombinationFound).toEqual(keyCombination)
  })
}

describe('SplitButtonBehavior.ts', () => {
  test('aria-haspopup is not defined for splitButton', () => {
    const property = {
      contextMenu: false,
    }
    const expectedResult = splitButtonBehavior(property)
    expect(
      expectedResult['childBehaviors']['menuButton'](property).attributes.trigger['aria-haspopup'],
    ).toBe(undefined)
  })

  test('close menu and focus trigger with different keys', () => {
    const property = {}
    const supportedKeys = [
      { keyCode: keyboardKey.Escape },
      { altKey: true, keyCode: keyboardKey.ArrowUp },
      { keyCode: keyboardKey.Tab, shiftKey: false },
      { keyCode: keyboardKey.Tab, shiftKey: true },
    ]
    const obtainedKeys = splitButtonBehavior(property)['childBehaviors']['menuButton'](property)
      .keyActions.popup.closeAndFocusTrigger.keyCombinations
    verifyKeys(supportedKeys, obtainedKeys)
  })

  test('open menu with alt + arrow down ', () => {
    const property = {}
    const supportedKeys = [{ altKey: true, keyCode: keyboardKey.ArrowDown }]
    const obtainedKeys = splitButtonBehavior(property)['childBehaviors']['menuButton'](property)
      .keyActions.trigger.open.keyCombinations
    verifyKeys(supportedKeys, obtainedKeys)
  })
})
