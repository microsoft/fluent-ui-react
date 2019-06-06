import puppeteer from 'puppeteer'

import { safeLaunchOptions } from '../build/puppeteer.config'
import { E2EApi } from './e2eApi'

jest.setTimeout(10000)

let browser: puppeteer.Browser
let page: puppeteer.Page

const launchOptions: puppeteer.LaunchOptions = safeLaunchOptions({
  headless: true,
  dumpio: false,
  slowMo: 10,
})

beforeAll(async () => {
  browser = await puppeteer.launch(launchOptions)
})

beforeEach(async () => {
  page = await browser.newPage()
  global['e2e'] = new E2EApi(page)
})

afterEach(async () => {
  await page.close()
  global['e2e'] = null
})

afterAll(async () => {
  await browser.close()
})
