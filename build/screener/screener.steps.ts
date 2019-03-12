import * as _ from 'lodash'
import * as fs from 'fs'
import * as Steps from 'screener-runner/src/steps'
import * as keys from 'screener-runner/src/keys'

const DEFAULT_THEMES = ['teams']

Steps.prototype.resetExternalLayout = function () {
  return this.executeScript(`window.resetExternalLayout()`)
}

Steps.prototype.switchTheme = function (themeName: ScreenerThemeName) {
  return this.executeScript(`window.switchTheme("${themeName}")`)
}

const getScreenerSteps = (stepsModulePath: string): any[] => {
  if (!fs.existsSync(`${stepsModulePath}.ts`)) {
    return undefined
  }

  const stepsBuilder = new Steps()
  const { steps: screenerSteps, themes = DEFAULT_THEMES } = require(stepsModulePath)
    .default as ScreenerTestsConfig

  _.forEach(themes, themeName => {
    stepsBuilder.switchTheme(themeName).snapshot(`Theme: `, themeName)

    _.forEach(screenerSteps, (screenerStep: ScreenerStep) => {
      screenerStep(stepsBuilder, keys)
      stepsBuilder.executeScript(`window.resetExternalLayout()`)
    })
  })

  return stepsBuilder.end()
}

export default getScreenerSteps
