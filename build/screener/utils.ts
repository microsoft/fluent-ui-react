import * as _ from 'lodash'

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
export const applyThemesBeforeStep = (
  step: ScreenerStep,
  themes: ScreenerThemeName[],
): ScreenerStep =>
  themes && themes.length > 0
    ? (sb, keys) =>
        themes
          .map(themeName => applyThemeBeforeStep(step, themeName))
          .reduce((stepAcc, currentStep) => currentStep(stepAcc, keys), sb)
    : step

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
export const reduceSteps = (steps: ScreenerSteps): ScreenerStep => (sb, keys) =>
  steps && steps.length > 0
    ? steps.reduce((stepsAcc, steps) => steps(stepsAcc, keys).resetExternalLayout(), sb)
    : sb
