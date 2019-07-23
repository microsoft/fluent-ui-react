import { selectors } from './dialogInPopup-example'

const dialogCancel = `#${selectors.dialogCancel}`
const dialogHeader = `.${selectors.dialogHeader}`
const dialogOverlay = `.${selectors.dialogOverlay}`
const dialogTrigger = `#${selectors.dialogTrigger}`
const popupContent = `.${selectors.popupContent}`
const popupTrigger = `#${selectors.popupTrigger}`

// https://github.com/stardust-ui/react/issues/1674
describe('Dialog in Popup', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger)
  })

  it('"Popup" should be open after "Dialog" will be opened', async () => {
    await e2e.clickOn(popupTrigger)
    expect(await e2e.exists(popupContent)).toBe(true)

    await e2e.clickOn(dialogTrigger)
    expect(await e2e.exists(popupContent)).toBe(true)
    expect(await e2e.exists(dialogHeader)).toBe(true)
  })

  it('"Popup" should be open after "Dialog" will closed', async () => {
    await e2e.clickOn(popupTrigger)
    await e2e.clickOn(dialogTrigger)
    await e2e.clickOn(dialogCancel)

    expect(await e2e.exists(popupContent)).toBe(true)
    expect(await e2e.exists(dialogHeader)).toBe(false)
  })

  it('"Popup" and "Dialog" will be kept open on a click inside "Dialog"', async () => {
    await e2e.clickOn(popupTrigger)
    await e2e.clickOn(dialogTrigger)
    await e2e.clickOn(dialogHeader)

    expect(await e2e.exists(popupContent)).toBe(true)
    expect(await e2e.exists(dialogHeader)).toBe(true)
  })

  it('"Popup" will be kept open on a click inside "Dialog" overlay', async () => {
    await e2e.clickOn(popupTrigger)
    await e2e.clickOn(dialogTrigger)
    await e2e.clickOn(dialogOverlay, 0, 0)

    expect(await e2e.exists(popupContent)).toBe(true)
    expect(await e2e.exists(dialogHeader)).toBe(false)
  })
})
