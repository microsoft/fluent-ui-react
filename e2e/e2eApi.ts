import { Page, Browser, launch } from 'puppeteer'
import config from '../config'

const serverUrl = `http://${config.server_host}:${config.e2e_port}`
const launchOptions = {
  dumpio: false,
  headless: true,
  slowMo: 10,

  // Workaround for newPage hang in CircleCI: https://github.com/GoogleChrome/puppeteer/issues/1409#issuecomment-453845568
  args: [process.env.CI && '--single-process'].filter(Boolean),
}

export class E2EApiClass {
  private browser: Browser
  private page: Page

  public beforeAll = async () => {
    this.browser = await launch(launchOptions)
  }

  public beforeEach = async () => {
    this.page = await this.browser.newPage()
  }

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

  public afterEach = async () => await this.page.close()

  public afterAll = async () => await this.browser.close()
}

export type E2EApi = Pick<
  E2EApiClass,
  'goto' | 'getElement' | 'clickOn' | 'textOf' | 'focusOn' | 'isFocused' | 'pressKey'
>

export default new E2EApiClass()
