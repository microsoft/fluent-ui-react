// import { Dropdown } from '@stardust-ui/react'

describe('Dropdown', () => {
  const triggerButton = '.ui-dropdown__trigger-button'

  describe('Selection', () => {
    beforeEach(async () => {
      await e2e.goto('/maximize/dropdown-example-multiple-shorthand/false', triggerButton)
    })

    it('keeps focused on TAB from the dropdown list', async () => {
      await e2e.focusOn(triggerButton)

      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('Tab')

      expect(await e2e.isFocused(triggerButton)).toBe(true)
    })

    it('keeps focused on Shift+TAB from the dropdown list', async () => {
      await e2e.focusOn(triggerButton)

      await e2e.pressKey('ArrowDown')
      await e2e.pressKey('Tab', 'Shift')

      expect(await e2e.isFocused(triggerButton)).toBe(true)
    })
  })
})
