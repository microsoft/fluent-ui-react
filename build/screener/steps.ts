import * as fs from 'fs'
import * as Steps from 'screener-runner/src/steps'
import * as keys from 'screener-runner/src/keys'
import { reduceSteps, applyThemesBeforeStep } from './utils'

/** converts the arguments into a script passed to Steps.executeScript method
 * e.g.: steps.executeOnWindow('switchTheme', 'teams')
 * will call steps.executeScript('window.switchTheme("teams"))
 */
Steps.prototype.executeOnWindow = function (methodName: string, ...args: string[]) {
  const computerArgs = args.length ? `"${args.join('", "')}"` : ''
  return this.executeScript(`window.${methodName}(${computerArgs})`)
}

Steps.prototype.resetExternalLayout = function () {
  return this.executeOnWindow('resetExternalLayout')
}

Steps.prototype.switchTheme = function (themeName: ScreenerThemeName) {
  return this.executeOnWindow('switchTheme', themeName)
}

const getSteps = (stepsModulePath: string): any[] => {
  if (!fs.existsSync(`${stepsModulePath}.ts`)) {
    return undefined
  }

  const { steps, themes } = require(stepsModulePath).default as ScreenerTestsConfig
  const themedStep = applyThemesBeforeStep(reduceSteps(steps), themes)

  return themedStep(new Steps(), keys).end()
}

export default getSteps
