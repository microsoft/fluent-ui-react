import { Browser, Page, LaunchOptions, launch } from 'puppeteer'
import { safeLaunchOptions } from '../build/puppeteer.config'
import { E2EApi } from './e2eApi'

jest.setTimeout(10000)

let browser: Browser
let page: Page

const launchOptions: LaunchOptions = safeLaunchOptions({
  headless: true,
  dumpio: false,
  slowMo: 10,
})

beforeAll(async () => {
  browser = await launch(launchOptions)
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
