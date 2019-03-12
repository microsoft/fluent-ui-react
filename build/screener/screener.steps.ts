import * as _ from 'lodash'
import * as fs from 'fs'
import * as Steps from 'screener-runner/src/steps'
import * as keys from 'screener-runner/src/keys'

Steps.prototype.resetExternalLayout = function () {
  return this.executeScript(`window.resetExternalLayout()`)
}

Steps.prototype.switchTheme = function (themeName: ScreenerThemeName) {
  return this.executeScript(`window.switchTheme("${themeName}")`)
}

const getStepsForTheme = (
  sb: ScreenerStepBuilder,
  themeName: ScreenerThemeName,
): ScreenerStepBuilder =>
  themeName ? sb.switchTheme(themeName).snapshot(`${_.startCase(themeName)} theme`) : sb

const applyThemeBeforeStep = (step: ScreenerStep, themeName: ScreenerThemeName): ScreenerStep => (
  sb,
  keys,
) => step(getStepsForTheme(sb, themeName), keys)

/**
 * Inserts the switchTheme step before [step] steps for each theme in [themes] array
 * returns an array of steps
 * e.g.: applyThemesBeforeStep(steps => steps.hover('sel').snapshot('snapshot hover'), ['teams', 'teamsDark'])
 * returns:
 * [
 *   steps => steps.switchTheme('teams').snapshot('Teams theme').hover('#sel').snapshot('snapshot name'),
 *   steps => steps.switchTheme('teamsDark').snapshot('Teams Dark theme').hover('#sel').snapshot('snapshot name'),
 *   steps => steps.switchTheme('teamsHighContrast').snapshot('Teams High Contrast theme').hover('#sel').snapshot('snapshot name'),
 * ]
 */
const applyThemesBeforeStep = (step: ScreenerStep, themes: ScreenerThemeName[]): ScreenerStep => {
  if (!themes || themes.length < 1) return step
  return (sb, keys) =>
    themes
      .map(themeName => applyThemeBeforeStep(step, themeName))
      .reduce((stepAcc, currentStep) => currentStep(stepAcc, keys), sb)
}

/**
 * Resets the layout after each element in [steps] and reduces it to one step
 * e.g.: reduceSteps([
 *  steps => steps.click('#sel1'),
 *  steps => steps.click('#sel2'),
 *  steps => steps.click('#sel3'),
 * ]
 * returns:
 * steps =>
 *  steps.click('#sel1').resetExternalLayout(),
 *  steps.click('#sel2').resetExternalLayout(),
 *  steps.click('#sel3').resetExternalLayout(),
 */
const reduceSteps = (steps: ScreenerSteps): ScreenerStep => (sb, keys) => {
  if (!steps || steps.length < 1) return sb
  return steps.reduce((stepsAcc, steps) => steps(stepsAcc, keys).resetExternalLayout(), sb)
}

const getScreenerSteps = (stepsModulePath: string): any[] => {
  if (!fs.existsSync(`${stepsModulePath}.ts`)) {
    return undefined
  }

  const { steps, themes } = require(stepsModulePath).default as ScreenerTestsConfig
  const themedStep = applyThemesBeforeStep(reduceSteps(steps), themes)

  return themedStep(new Steps(), keys).end()
}

export default getScreenerSteps
