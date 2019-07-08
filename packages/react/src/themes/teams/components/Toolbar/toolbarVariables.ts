import { pxToRem, stringLiteralsArray } from '../../../../lib'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'
import { ItemType } from '../../../types'
import { TeamsSchemeMappingWithAreas } from '../../types'

export const toolbarColorAreas = stringLiteralsArray(
  'foreground1',
  'background',
  'border',

  'foregroundActive',

  'foregroundHover',
  'backgroundHover',

  'foregroundFocus',
  'backgroundFocus',
  'borderFocus',

  'foregroundDisabled1',

  // custom
  'menuItemForegroundHover',
  'menuItemBackgroundHover',
  'menuItemForegroundFocus',
  'menuItemBackgroundFocus',
)

export type ToolbarColorSchemeMapping = TeamsSchemeMappingWithAreas<
  ItemType<typeof toolbarColorAreas>
>

export interface ToolbarVariables {
  colorScheme: ToolbarColorSchemeMapping
  foreground: string
  background: string
  dividerBorder: string

  foregroundHover: string
  backgroundHover: string

  foregroundFocus: string
  backgroundFocus: string
  borderFocus: string

  foregroundActive: string
  backgroundActive: string

  foregroundDisabled: string
  backgroundDisabled: string

  itemHeight: string
  borderWidth: string
  borderRadius: string
  dividerMargin: string

  menuWidth: string
  menuPadding: string
  menuBackground: string
  menuBorder: string // border color
  menuBorderWidth: string
  menuBorderRadius: string
  menuBoxShadow: string

  menuItemForeground: string
  menuItemForegroundHover: string
  menuItemBackgroundHover: string
  menuItemBackgroundFocus: string
  menuItemForegroundFocus: string
  menuItemForegroundDisabled: string
  menuItemBackgroundDisabled: string
  menuItemPadding: string

  menuDividerBorder: string // border color
  menuDividerMargin: string

  customItemHorizontalPadding: string
  customItemVerticalPadding: string
}

export default (siteVars: any): ToolbarVariables => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        borderFocus: siteVars.colorScheme.brand.borderFocus1,
        foregroundHover: siteVars.colorScheme.brand.foregroundHover,
        backgroundHover: 'transparent',
        foregroundFocus: siteVars.colorScheme.brand.foregroundFocus,
        backgroundFocus: 'transparent',
        foregroundActive: siteVars.colorScheme.brand.foregroundActive,

        menuItemForegroundHover: siteVars.colorScheme.default.foregroundHover,
        menuItemBackgroundHover: siteVars.colorScheme.default.backgroundHover,
        menuItemForegroundFocus: siteVars.colorScheme.default.foregroundHover,
        menuItemBackgroundFocus: siteVars.colorScheme.default.backgroundHover,
      },
    }),
    toolbarColorAreas,
  ),
  foreground: undefined,
  background: 'transparent',
  dividerBorder: undefined,

  foregroundHover: undefined,
  backgroundHover: undefined,

  foregroundFocus: undefined,
  backgroundFocus: undefined,
  borderFocus: undefined,

  foregroundActive: undefined,
  backgroundActive: 'transparent',

  foregroundDisabled: undefined,
  backgroundDisabled: 'transparent',

  itemHeight: pxToRem(32),
  borderWidth: '2px',
  borderRadius: '50%',
  dividerMargin: `${pxToRem(10)} ${pxToRem(4)}`,

  menuWidth: pxToRem(200),
  menuPadding: `${pxToRem(8)} 0`,
  menuBackground: undefined,
  menuBorder: undefined,
  menuBorderWidth: '1px',
  menuBorderRadius: pxToRem(4),
  menuBoxShadow: siteVars.shadowLevel3,

  menuItemForeground: undefined,
  menuItemForegroundHover: undefined,
  menuItemBackgroundHover: undefined,
  menuItemForegroundFocus: undefined,
  menuItemBackgroundFocus: undefined,
  menuItemForegroundDisabled: undefined,
  menuItemBackgroundDisabled: 'transparent',
  menuItemPadding: `${pxToRem(9)} ${pxToRem(16)}`,

  menuDividerBorder: undefined,
  menuDividerMargin: `${pxToRem(8)} 0`,

  customItemHorizontalPadding: pxToRem(16),
  customItemVerticalPadding: pxToRem(4),
})
