import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  backgroundColor: string
  backgroundColorHover: string
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
  listItemColorHover: string
  listItemBackgroundColorHover: string
  listItemBackgroundColorActive: string
  listItemColorActive: string
  selectedItemBackgroundColorFocus: string
  selectedItemsMaxHeight: string
  toggleIndicatorSize: string
  width: string
}

const [_2px_asRem, _3px_asRem, _12px_asRem] = [2, 3, 12].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.gray10, // colors.grey[100] when new color palette checks in
  backgroundColorHover: '#EDEBE9', // colors.grey[150] when new color palette checks in
  borderColorFocus: siteVars.colors.primary[500], // colors.primary[600
  borderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  color: siteVars.bodyColor,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  listBackgroundColor: siteVars.colors.white,
  listBorderRadius: _3px_asRem,
  listPadding: `${pxToRem(8)} 0`,
  listBoxShadow: `0 .2rem .6rem 0 ${siteVars.gray06}`,
  listMaxHeight: pxToRem(296),
  listItemBackgroundColor: siteVars.colors.white,
  // TODO: this should be implemented in the list component
  listItemColorHover: '#252423', // colors.grey[750] when new color palette checks in
  listItemBackgroundColorHover: siteVars.gray10, // colors.grey[100] when new color palette checks in
  listItemBackgroundColorActive: siteVars.gray10, // colors.grey[100] when new color palette checks in TODO: what is active?!
  listItemColorActive: '#252423', // colors.grey[750] when new color palette checks in
  selectedItemBackgroundColorFocus: siteVars.colors.primary[100],
  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  width: pxToRem(356),
})
