import { pxToRem, stringLiteralsArray } from '../../../../lib'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'
import { ItemType } from '../../../types'
import { TeamsSchemeMappingWithAreas } from '../../types'

export const toolbarColorAreas = stringLiteralsArray(
  'foreground1',
  'border',

  'foregroundActive',

  'foregroundHover',
  'backgroundHover',

  'foregroundFocus',
  'backgroundFocus',
  'borderFocus',

  'foregroundDisabled1',
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
})
