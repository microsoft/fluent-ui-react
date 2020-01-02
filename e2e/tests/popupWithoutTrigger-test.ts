import { selectors } from './popupWithoutTrigger-example'

const button = `.${selectors.button}`
const popupContent = `.${selectors.popupContent}`

describe('Popup without `trigger`', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, button)
  })

  it('Popup can be opened on button click', async () => {
    await e2e.clickOn(button)
    expect(await e2e.exists(popupContent)).toBe(true)
  })

  it('Popup can be closed on click outside', async () => {
    await e2e.clickOn(button)
    expect(await e2e.exists(popupContent)).toBe(true)

    await e2e.clickOn('body')
    expect(await e2e.exists(popupContent)).toBe(false)
  })
})
