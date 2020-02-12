import { selectors } from './toolbarMenuOverflow-example'

const toolbarItem = (index: number) => `#item${index}`
// const toolbarItem = (index: number) => `.${selectors.toolbarItem}:nth-child(${index})`
const toolbar = `.${selectors.toolbar}`

describe('Toolbar menu on', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, toolbar)
  })

  it('hiding focused item will set focus to first focusable element', async () => {
    const itemToBeHiddenIndex = 20
    const itemToReceiveFocusIndex = 0
    // Getting width required for an item. Assumes all items have same width.
    const itemWidth = (await (await e2e.getElement(toolbarItem(itemToBeHiddenIndex))).boundingBox())
      .width

    // clicks to set focus on an item to be hidden.
    await e2e.clickOn(toolbarItem(itemToBeHiddenIndex))

    expect(await e2e.isFocused(toolbarItem(itemToBeHiddenIndex))).toBe(true)

    // resizes the viewport to hide that item.
    await e2e.resizeViewport({ width: itemWidth * 5 })
    await e2e.wait(500)

    // check that the focus was applied to first item as fall-back.
    expect(await e2e.isFocused(toolbarItem(itemToReceiveFocusIndex))).toBe(true)
  })
})
