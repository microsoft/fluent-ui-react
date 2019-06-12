import { Dropdown } from '@stardust-ui/react'

describe('Dropdown', () => {
  const triggerButton = `.${Dropdown.slotClassNames.triggerButton}`

  describe('Focus behavior', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, triggerButton)
    })

    it('keeps focused on TAB from the dropdown list', async () => {
      await e2e.focusOn(triggerButton)

      await e2e.pressKey('ArrowDown') // open dropdown list
      await e2e.pressKey('Tab') // TAB from opened dropdown list

      expect(await e2e.isFocused(triggerButton)).toBe(true)
    })

    it('keeps focused on Shift+TAB from the dropdown list', async () => {
      await e2e.focusOn(triggerButton)

      await e2e.pressKey('ArrowDown') // open dropdown list
      await e2e.pressKey('Tab', 'Shift') // Shift+TAB from opened dropdown list

      expect(await e2e.isFocused(triggerButton)).toBe(true)
    })
  })
})
