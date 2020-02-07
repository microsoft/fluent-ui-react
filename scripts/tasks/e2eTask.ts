import { jestTask, resolveCwd } from 'just-scripts'
import path from 'path'
import os from 'os'

const noOp = (done: () => void) => done()

export function e2eTask() {
  const config = resolveCwd('jest.puppeteer.js')
  if (!config) {
    return noOp
  }

  return jestTask({
    runInBand: true,
    config,
    env: {
      ...process.env,
      JEST_E2E_HEADLESS: 'true',
      JEST_E2E_SERVER: 'true',
      JEST_PUPPETEER_CONFIG: path.join(__dirname, '../config/jest/jest-puppeteer.config.js'),
    },
  })
}

export function e2eWatchTask() {
  const config = resolveCwd('jest.puppeteer.js')
  if (!config) {
    return noOp
  }

  return jestTask({
    runInBand: true,
    config,
    _: ['--watchAll'],
    env: {
      ...process.env,
      JEST_PUPPETEER_CONFIG: path.join(__dirname, '../config/jest/jest-puppeteer.config.js'),
    },
  })
}

export function e2ePerfTask() {
  const config = resolveCwd('jest.puppeteer.js')
  if (!config) {
    return noOp
  }

  const tmpDir = os.tmpdir()
  const logFile = path.join(tmpDir, 'puppeteer.log')

  return jestTask({
    runInBand: true,
    config,
    env: {
      ...process.env,
      JEST_E2E_PROFILE: logFile,
      JEST_E2E_HEADLESS: 'true',
      JEST_E2E_SERVER: 'true',
      JEST_PUPPETEER_CONFIG: path.join(__dirname, '../config/jest/jest-puppeteer.config.js'),
    },
  })
}
