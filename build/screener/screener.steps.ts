import * as _ from 'lodash'
import * as fs from 'fs'
import * as Steps from 'screener-runner/src/steps'
import * as keys from 'screener-runner/src/keys'

const DEFAULT_THEMES: ScreenerThemes = ['teams']

Steps.prototype.resetExternalLayout = function resetExternalLayout() {
  return this.executeScript(`window.resetExternalLayout()`)
}

Steps.prototype.switchTheme = function switchTheme(themeName: ScreenerThemeName) {
  return this.executeScript(`window.switchTheme("${themeName}")`)
}

const getScreenerSteps = (stepsModulePath: string): any[] => {
  if (!fs.existsSync(`${stepsModulePath}.ts`)) {
    return undefined
  }

  const stepsBuilder: ScreenerStepBuilder = new Steps()
  const {
    steps: screenerSteps,
    themes = DEFAULT_THEMES,
  }: ScreenerTestsConfig = require(stepsModulePath).default

  _.forEach(themes, themeName => {
    stepsBuilder.switchTheme(themeName).snapshot(`Theme: ${themeName}`)

    _.forEach(screenerSteps, screenerStep => {
      screenerStep(stepsBuilder, keys)
      stepsBuilder.resetExternalLayout()
    })
  })

  return stepsBuilder.end()
}

export default getScreenerSteps
