import { splitButtonBehavior } from '@stardust-ui/accessibility'

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
})
