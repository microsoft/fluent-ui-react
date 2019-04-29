import { ColorSchemeMapping, ColorSchemeMappingOverrides } from './types'

export const extendColorScheme = (
  colorScheme: ColorSchemeMapping,
  overrides: ColorSchemeMappingOverrides,
): ColorSchemeMapping => {
  let result = colorScheme
  Object.keys(overrides).map(color => {
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

export const extendColorObject = (colorScheme: object, overrides: object): object => {
  let result = colorScheme
  Object.keys(overrides).map(color => {
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
