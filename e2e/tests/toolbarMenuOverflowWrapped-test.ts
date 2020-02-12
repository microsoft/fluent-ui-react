import { selectors } from './toolbarMenuOverflow-example'

const toolbarItem = (index: number) => `.${selectors.toolbarItem}:nth-child(${index + 1})`
const toolbarItemWrapped = (index: number) =>
  `.${selectors.toolbarItemWrapper}:nth-child(${index + 1}) .${selectors.toolbarItem}`
const toolbar = `.${selectors.toolbar}`

describe('Toolbar menu on', () => {
  let itemWidth

  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, toolbar)
    // Getting width required for an item. Assumes all items have same width.
    if (itemWidth === undefined) {
      itemWidth = (await (await e2e.getElement(toolbarItem(0))).boundingBox()).width
    }
  })

  afterEach(async () => {
    // resizes the viewport to contain all items.
    await e2e.resizeViewport({ width: itemWidth * 50 })
    await e2e.wait(500)
  })

  it("hiding focused item will set focus to first focusable element, even if it's wrapped", async () => {
    const itemToBeHiddenIndex = 10 // in example component, first half of items are not wrapped.
    const itemToReceiveFocusIndex = 0 // in example component, first element is wrapped.

    // clicks to set focus on an item to be hidden.
    await e2e.clickOn(toolbarItem(itemToBeHiddenIndex))

    expect(await e2e.isFocused(toolbarItem(itemToBeHiddenIndex))).toBe(true)

    // resizes the viewport to hide that item.
    await e2e.resizeViewport({ width: itemWidth * 5 })
    await e2e.wait(500)

    // check that the focus was applied to first item as fall-back.
    expect(await e2e.isFocused(toolbarItemWrapped(itemToReceiveFocusIndex))).toBe(true)
  })

  it("hiding focused wrapped item will set focus to first focusable element, even if it's wrapped", async () => {
    const itemToBeHiddenIndex = 30 // in example component, second half of items are wrapped.
    const itemToReceiveFocusIndex = 0 // in example component, first element is wrapped.

    // clicks to set focus on an item to be hidden.
    await e2e.clickOn(toolbarItemWrapped(itemToBeHiddenIndex))

    expect(await e2e.isFocused(toolbarItemWrapped(itemToBeHiddenIndex))).toBe(true)

    // resizes the viewport to hide that item.
    await e2e.resizeViewport({ width: itemWidth * 5 })
    await e2e.wait(500)

    // check that the focus was applied to first item as fall-back.
    expect(await e2e.isFocused(toolbarItemWrapped(itemToReceiveFocusIndex))).toBe(true)
  })
})
