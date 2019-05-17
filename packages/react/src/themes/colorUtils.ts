import {
  ColorSchemeMapping,
  ColorScheme,
  ColorSchemeMappingOverrides,
  ComponentAreaName,
} from './types'

export const extendColorScheme = (
  colorScheme: ColorSchemeMapping,
  overrides: ColorSchemeMappingOverrides,
): ColorSchemeMapping => {
  let result = colorScheme
  Object.keys(overrides).forEach(color => {
    result = {
      ...result,
      [color]: {
        ...colorScheme[color],
        ...overrides[color],
      },
    }
  })
  return result
}

// TODO add unit tests
export function pickValuesFromColorScheme<T extends Partial<ComponentAreaName>>(
  colorScheme: ColorSchemeMapping,
  componentAreas: T[],
): ColorSchemeMapping<ColorScheme<T>> {
  let result = {}
  Object.keys(colorScheme).forEach(color => {
    const colorValues = componentAreas.reduce((accumulator, area) => {
      return {
        ...accumulator,
        [area]: colorScheme[color][area],
      }
    }, {})
    result = {
      ...result,
      [color]: colorValues,
    }
  })
  return result
}
