import e2e from './e2eApi'

jest.setTimeout(10000)

global['e2e'] = e2e

beforeAll(e2e.beforeAll)
beforeEach(e2e.beforeEach)

afterEach(e2e.afterEach)
afterAll(e2e.afterAll)
