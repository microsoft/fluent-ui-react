import { Popup } from '@stardust-ui/react'

import { selectors } from './menuPopup-example'

describe('Menu popup', () => {
  const menu = `#${selectors.menuId}`

  const menuItem = (index: number) => `#${selectors.menuItemId(index)}`
  const itemPopup = (index: number) => `#${selectors.popupContentId(index)}`

  const popupContent = `.${Popup.slotClassNames.content}`

  describe('Selection', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, menu)
    })

    it('keeps focused on TAB from the dropdown list', async () => {
      await e2e.clickOn(menuItem(0))
      expect(await e2e.count(popupContent)).toBe(1)
      expect(await e2e.getElement(itemPopup(0))).toBeTruthy

      await e2e.clickOn(menuItem(1))
      expect(await e2e.count(popupContent)).toBe(1)
      expect(await e2e.getElement(itemPopup(1))).toBeTruthy

      await e2e.clickOn(menuItem(2))
      expect(await e2e.count(popupContent)).toBe(1)
      expect(await e2e.getElement(itemPopup(2))).toBeTruthy
    })
  })
})
