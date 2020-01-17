import config from '@fluentui/internal-tooling/config'
import { Page } from 'puppeteer'
import * as path from 'path'
import * as _ from 'lodash'

const serverUrl = `http://${config.server_host}:${config.e2e_port}`

export const exampleUrlTokenFromFilePath = (filePath: string) => {
  const testName = path
    .basename(filePath)
    .replace(/^(.+)-test.tsx?$/, '$1')
    .replace(/^(.+)-example.tsx?$/, '$1')

  return _.kebabCase(testName)
}

export class E2EApi {
  constructor(private readonly page: Page) {}

  public goto = async (docsUrl: string, waitForSelector: string) => {
    await this.page.goto(`${serverUrl}/${docsUrl.replace(/^\//, '')}`)
    await this.page.waitForSelector(waitForSelector, { timeout: 30 * 1000 })
  }

  public gotoTestCase = async (testFilePath: string, waitForSelector: string) => {
    const testCaseUrl = `/${exampleUrlTokenFromFilePath(testFilePath)}`
    await this.goto(testCaseUrl, waitForSelector)
  }

  public getElement = async (selector: string) => {
    return await this.page.waitForSelector(selector, { timeout: 10 * 1000 })
  }

  public count = async (selector: string) => {
    return (await this.page.$$(selector)).length
  }

  public exists = async (selector: string) => {
    return (await this.count(selector)) > 0
  }

  public clickOn = async (selector: string) => await (await this.getElement(selector)).click()

  public clickOnPosition = async (selector: string, x: number, y: number) => {
    const elementHandle = await this.getElement(selector)
    const boundingBox = await elementHandle.boundingBox()

    await this.page.mouse.click(Math.round(boundingBox.x) + x, Math.round(boundingBox.y) + y)
  }

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
