import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  backgroundColor: string
  backgroundColorHover: string
  borderColor: string
  borderColorFocus: string
  borderRadius: string
  openBorderRadius: string
  borderWidth: string
  searchBorderBottomWidth: string
  color: string
  comboboxPaddingButton: string
  comboboxFlexBasis: string
  listBackgroundColor: string
  listBorderColor: string
  listBorderRadius: string
  listBorderWidth: string
  listPadding: string
  listBoxShadow: string
  listMaxHeight: string
  listItemBackgroundColor: string
  listItemColorHover: string
  listItemBackgroundColorHover: string
  listItemBackgroundColorActive: string
  listItemColorActive: string
  selectedItemColor: string
  selectedItemBackgroundColor: string
  selectedItemColorFocus: string
  selectedItemBackgroundColorFocus: string
  selectedItemsMaxHeight: string
  toggleIndicatorSize: string
  triggerButtonColorHover: string
  width: string
}

const [_2px_asRem, _3px_asRem, _12px_asRem] = [2, 3, 12].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.gray10, // colors.grey[100] when new color palette checks in
  backgroundColorHover: '#EDEBE9', // colors.grey[150] when new color palette checks in
  borderColor: 'transparent',
  borderColorFocus: siteVars.colors.primary[500], // colors.primary[600
  borderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  openBorderRadius: `${_3px_asRem} ${_3px_asRem} 0 0`,
  borderWidth: '0px',
  searchBorderBottomWidth: pxToRem(2),
  color: siteVars.bodyColor,
  selectedItemColor: siteVars.bodyColor,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  listBackgroundColor: siteVars.colors.white,
  listBorderRadius: `0 0 ${_3px_asRem} ${_3px_asRem}`,
  listBorderColor: 'transparent',
  listBorderWidth: '0px',
  listPadding: `${pxToRem(8)} 0`,
  listBoxShadow: `0 .2rem .6rem 0 ${siteVars.colors.grey[250]}`,
  listMaxHeight: pxToRem(296),
  listItemBackgroundColor: siteVars.colors.white,
  listItemColorHover: '#252423', // colors.grey[750] when new color palette checks in
  listItemBackgroundColorHover: siteVars.gray10, // colors.grey[100] when new color palette checks in
  listItemBackgroundColorActive: siteVars.gray10, // colors.grey[100] when new color palette checks in TODO: what is active?!
  listItemColorActive: '#252423', // colors.grey[750] when new color palette checks in
  selectedItemBackgroundColor: undefined,
  selectedItemColorFocus: siteVars.bodyColor,
  selectedItemBackgroundColorFocus: siteVars.colors.primary[100],
  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  triggerButtonColorHover: siteVars.bodyColor,
  width: pxToRem(356),
})
