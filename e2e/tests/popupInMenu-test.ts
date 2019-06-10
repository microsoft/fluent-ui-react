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
    expect(await e2e.exists(itemPopup(0))).toBe(true)

    await e2e.clickOn(menuItem(1))
    expect(await e2e.count(popupContent)).toBe(1)
    expect(await e2e.exists(itemPopup(1))).toBe(true)

    await e2e.clickOn(menuItem(2))
    expect(await e2e.count(popupContent)).toBe(1)
    expect(await e2e.exists(itemPopup(2))).toBe(true)
  })
})
