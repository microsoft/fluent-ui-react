import { selectors } from './popupInMenu-example'

const menu = `#${selectors.menuId}`

const menuItem = (index: number) => `#${selectors.menuItemId(index)}`
const itemPopup = (index: number) => `#${selectors.popupContentId(index)}`
const popupContent = `.${selectors.popupContentClass}`

// https://github.com/stardust-ui/react/issues/557
describe('Popup of menu item', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menu)
  })

  it('should close when another menu item is clicked', async () => {
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
