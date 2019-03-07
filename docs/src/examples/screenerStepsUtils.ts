import { ThemeName } from '@stardust-ui/react'

const commonThemes: ThemeName[] = ['teams', 'teamsDark', 'teamsHighContrast']

const getStepsForTheme = (sb: ScreenerStepBuilder, themeName: ThemeName): ScreenerStepBuilder =>
  themeName ? sb.switchTheme(themeName).snapshot(`Switched to ${themeName} theme`) : sb

const getThemeStep = (themeName: ThemeName): ScreenerStep => sb => getStepsForTheme(sb, themeName)

const applyThemeBeforeStep = (step: ScreenerStep, themeName: ThemeName): ScreenerStep => (
  sb,
  keys,
) => step(getStepsForTheme(sb, themeName), keys)

const applyThemesBeforeStep = (
  step: ScreenerStep,
  appliedThemes: ThemeName | ThemeName[],
): ScreenerSteps => {
  const themes = typeof appliedThemes === 'string' ? [appliedThemes] : appliedThemes
  return themes.map(themeName => applyThemeBeforeStep(step, themeName))
}

/**
 * Inserts the switchTheme step with every common theme and its snapshot before the rest of step
 * returns an array of steps
 * e.g.: For step: steps => steps.hover('sel').snapshot('snapshot hover')
 * applyThemeBeforeSteps(step) returns
 * [
 *   steps => steps.switchTheme('teams').snapshot('Switched to teams theme').hover('sel').snapshot('snapshot name'),
 *   steps => steps.switchTheme('teamsDark').snapshot('Switched to teamsDark theme').hover('sel').snapshot('snapshot name'),
 *   steps => steps.switchTheme('teamsHighContrast').snapshot('Switched to teamsHighContrast theme').hover('sel').snapshot('snapshot name'),
 * ]
 */
export const applyCommonThemesBeforeStep = (step: ScreenerStep) =>
  applyThemesBeforeStep(step, commonThemes)

/**
 * Keeps an array with the screener steps needed to take a screenshot in every common theme:
 * [
 *   steps => steps.switchTheme('teams').snapshot('Switched to teams theme'),
 *   steps => steps.switchTheme('teamsDark').snapshot('Switched to teamsDark theme'),
 *   steps => steps.switchTheme('teamsHighContrast').snapshot('Switched to teamsHighContrast theme'),
 * ]
 */
export const commonThemesSteps: ScreenerSteps = commonThemes.map(themeName =>
  getThemeStep(themeName),
)
