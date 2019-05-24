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
}

export type TeamsColorNames = keyof (TeamsContextualColors &
  TeamsNaturalColors &
  PrimitiveColors &
  TeamsTransparentColors)

export type TeamsSchemeMappingWithAreas<TAreas extends string> = StrictColorSchemeMapping<
  StrictColorScheme<TAreas>,
  TeamsColorNames
>
