import { Dropdown } from '@stardust-ui/react'

import { selectors } from './popup-example'

describe('Popup', () => {
  const popupTrigger = `#${selectors.popupTriggerId}`
  const dropdownTriggerButton = `.${Dropdown.slotClassNames.triggerButton}`

  describe('Selection', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, popupTrigger)
    })

    it('keeps focused on TAB from the dropdown list', async () => {
      await e2e.clickOn(popupTrigger)

      await e2e.pressKey('Tab') // focuses dropdown
      await e2e.pressKey('Enter') // opens dropdown list
      await e2e.pressKey('Escape') // closes dropdown list

      expect(await e2e.isFocused(dropdownTriggerButton)).toBe(true)
    })
  })
})
