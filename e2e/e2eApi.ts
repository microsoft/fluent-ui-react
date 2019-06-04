import config from '../config'

const serverUrl = `http://${config.server_host}:${config.e2e_port}`

export class E2EApi {
  constructor(private readonly page) {}

  public goto = async (docsUrl: string, waitForSelector: string) => {
    await this.page.goto(`${serverUrl}/${docsUrl.replace(/^\//, '')}`)
    await this.page.waitForSelector(waitForSelector, { timeout: 30 * 1000 })
  }

  public getElement = async (selector: string) => {
    return await this.page.waitForSelector(selector, { timeout: 3 * 1000 })
  }

  public clickOn = async (selector: string) => await (await this.getElement(selector)).click()

  public textOf = async (selector: string) => {
    const element = await this.getElement(selector)
    return await (await element.getProperty('textContent')).jsonValue()
  }

  public focusOn = async (selector: string) => await (await this.getElement(selector)).focus()

  public isFocused = async (selector: string) =>
    await this.page.evaluate(selector => {
      const activeElement = document.activeElement
      const selectorElement = document.querySelector(selector)

      return activeElement === selectorElement
    }, selector)

  public pressKey = async (key: string, modifier?: string) => {
    if (modifier) {
      await this.page.keyboard.down(modifier)
    }

    await this.page.keyboard.press(key)

    if (modifier) {
      await this.page.keyboard.up(modifier)
    }
  }
}
