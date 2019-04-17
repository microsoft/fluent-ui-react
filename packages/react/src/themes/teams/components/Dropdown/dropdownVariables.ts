import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  backgroundColor: string
  borderColorFocus: string
  borderRadius: string
  borderWidth: string
  color: string
  comboboxPaddingButton: string
  comboboxFlexBasis: string
  listBackgroundColor: string
  listBorderRadius: string
  listPadding: string
  listBoxShadow: string
  listMaxHeight: string
  listItemBackgroundColor: string
  listItemBackgroundColorActive: string
  listItemColorActive: string
  selectedItemBackgroundColorFocus: string
  selectedItemsMaxHeight: string
  toggleIndicatorSize: string
  width: string
}

const [_2px_asRem, _3px_asRem, _12px_asRem] = [2, 3, 12].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.colors.grey[100],
  borderColorFocus: siteVars.colors.primary[600],
  borderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  color: siteVars.bodyColor,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  listBackgroundColor: siteVars.colors.white,
  listBorderRadius: _3px_asRem,
  listPadding: `${pxToRem(8)} 0`,
  listBoxShadow: `0 .2rem .6rem 0 ${siteVars.colors.grey[250]}`,
  listMaxHeight: pxToRem(296),
  listItemBackgroundColor: siteVars.colors.white,
  listItemBackgroundColorActive: siteVars.colors.primary[600],
  listItemColorActive: siteVars.colors.white,
  selectedItemBackgroundColorFocus: siteVars.colors.primary[200],
  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  width: pxToRem(356),
})
