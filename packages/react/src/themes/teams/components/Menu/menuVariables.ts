import { pxToRem, stringLiteralsArray } from '../../../../utils'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'
import { ItemType } from '../../../types'
import { TeamsSchemeMappingWithAreas } from '../../types'

export const menuColorAreas = stringLiteralsArray(
  'border',
  'borderActive',
  'foregroundActive',
  'foregroundFocus',
  'foregroundHover',
  'backgroundHover',
  'backgroundActive',
  'backgroundFocus',
  'foregroundDisabled',
)
export type MenuColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof menuColorAreas>>

export interface MenuVariables {
  colorScheme: MenuColorSchemeMapping
  color: string

  backgroundColor: string
  backgroundColorFocus: string
  backgroundColorHover: string
  backgroundColorActive: string

  borderColor: string
  borderColorHover: string
  borderColorActive: string
  borderColorFocus: string

  outlineColorFocus: string
  colorActive: string
  iconOnlyColorActive: string

  colorFocus: string
  underlinedBorderColor: string

  colorDisabled: string
  lineHeightBase: string
  horizontalPadding: string

  verticalBackgroundColor: string
  verticalItemPadding: string
  verticalBoxShadow: string
  verticalDividerMargin: string
  verticalItemBorderWidth: string
  verticalItemBorderColor: string
  verticalPointingBorderColor: string
  verticalBackgroundColorFocus: string

  pointingIndicatorBackgroundColor: string

  underlinedBottomBorderWidth: string
  primaryBorderColor: string

  dividerHeight: string
  borderWidth: string

  menuZIndex: number
  beakZIndex: number
}

export default (siteVars: any): MenuVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        default: {
          borderActive: siteVars.colorScheme.default.border2,
          backgroundActive: siteVars.colorScheme.default.backgroundActive1,
          backgroundFocus: siteVars.colorScheme.default.backgroundFocus1,
          foregroundDisabled: siteVars.colorScheme.default.foregroundDisabled1,
        },
        brand: {
          foregroundHover: siteVars.colors.white,
          backgroundHover: siteVars.colors.brand[300],
          foregroundActive: siteVars.colors.white,
          borderActive: siteVars.colors.brand[600],
          backgroundActive: siteVars.colors.brand[500], // it's 600 in the color scheme
          foregroundFocus: siteVars.colors.white,
          backgroundFocus: siteVars.colors.brand[300],
          foregroundDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
        },
      }),
      menuColorAreas,
    ),
    color: siteVars.colors.grey[500],
    colorActive: siteVars.colors.black,
    colorFocus: siteVars.colors.white,
    colorDisabled: undefined,

    borderColor: undefined,
    borderColorHover: undefined,
    borderColorActive: undefined,
    borderColorFocus: siteVars.colors.white,

    outlineColorFocus: siteVars.colors.black,

    backgroundColor: undefined,
    backgroundColorFocus: undefined,
    backgroundColorHover: undefined,
    backgroundColorActive: undefined,

    iconOnlyColorActive: siteVars.colors.brand[600],

    underlinedBorderColor: siteVars.colors.grey[200],

    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)}`,

    verticalBackgroundColor: siteVars.colors.white,
    verticalItemPadding: `${pxToRem(7)} ${pxToRem(14)}`,
    verticalBoxShadow: siteVars.shadowLevel3,
    verticalDividerMargin: `${pxToRem(8)} 0`,
    verticalItemBorderWidth: pxToRem(2),
    verticalItemBorderColor: 'transparent',
    verticalPointingBorderColor: siteVars.colorScheme.brand.borderActive,
    verticalBackgroundColorFocus: siteVars.colors.grey[150],

    pointingIndicatorBackgroundColor: siteVars.colors.brand[600],

    underlinedBottomBorderWidth: pxToRem(2),
    primaryBorderColor: siteVars.colorScheme.default.border2,

    dividerHeight: pxToRem(1),
    borderWidth: pxToRem(1),
    menuZIndex: siteVars.zIndexes.overlay,
    beakZIndex: siteVars.zIndexes.menuItem,
  }
}
