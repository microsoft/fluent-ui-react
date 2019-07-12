import {
  ColorVariants,
  StrictColorScheme,
  StrictColorSchemeMapping,
  PrimitiveColors,
} from '../types'

export type TeamsContextualColors = {
  brand: ColorVariants
}

export type TeamsNaturalColors = {
  grey: ColorVariants
  green: ColorVariants
  orange: ColorVariants
  red: ColorVariants
  yellow: ColorVariants
  pink: ColorVariants
}

export type TeamsTransparentColors = {
  silver: ColorVariants
  ruby: ColorVariants
  onyx: ColorVariants
  amethyst: ColorVariants
}

export type TeamsCategoryColors = {
  redDark: ColorVariants
  red: ColorVariants
  orangeDark: ColorVariants
  orange: ColorVariants
  orangeLight: ColorVariants
  yellowDark: ColorVariants
  yellow: ColorVariants
  brown: ColorVariants
  oliveDark: ColorVariants
  olive: ColorVariants
  greenDark: ColorVariants
  green: ColorVariants
  tealDark: ColorVariants
  teal: ColorVariants
  tealLight: ColorVariants
  blueDark: ColorVariants
  blue: ColorVariants
  purpleDark: ColorVariants
  purple: ColorVariants
  maroon: ColorVariants
  pink: ColorVariants
  smokeDark: ColorVariants
  smokeLight: ColorVariants
  steelDark: ColorVariants
  steelLight: ColorVariants
}

export type TeamsCategoryColorNames = keyof TeamsCategoryColors

export type TeamsColorNames = keyof (TeamsContextualColors &
  TeamsNaturalColors &
  PrimitiveColors &
  TeamsTransparentColors)

export type TeamsSchemeMappingWithAreas<TAreas extends string> = StrictColorSchemeMapping<
  StrictColorScheme<TAreas>,
  TeamsColorNames
>
