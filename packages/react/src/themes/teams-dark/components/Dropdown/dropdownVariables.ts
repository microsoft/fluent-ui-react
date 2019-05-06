import { pxToRem } from '../../../../lib'
import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

const [_2px_asRem, _3px_asRem, _12px_asRem] = [2, 3, 12].map(v => pxToRem(v))

export default (siteVars): Partial<DropdownVariables> => ({
  backgroundColor: '#2D2C2C', // colors.grey[650] when new color palette checks in
  backgroundColorHover: '#3B3A39', // colors.grey[550] when new color palette checks in
  borderColorFocus: siteVars.colors.primary[500],
  borderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  color: '#C8C6C4', // colors.grey[250] when new color palette checks in
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  listBackgroundColor: '#2D2C2C', // colors.grey[650] when new color palette checks in
  listBorderRadius: _3px_asRem,
  listPadding: `${pxToRem(8)} 0`,
  listBoxShadow: `0 .2rem .6rem 0 ${siteVars.gray06}`,
  listMaxHeight: pxToRem(296),
  listItemBackgroundColor: '#2D2C2C', // colors.grey[650] when new color palette checks in
  // TODO: this should be implemented in the list component
  listItemColorHover: siteVars.colors.white,
  listItemBackgroundColorHover: '#3B3A39', // colors.grey[550] when new color palette checks in
  listItemBackgroundColorActive: '#3B3A39', // colors.grey[550] when new color palette checks in
  listItemColorActive: siteVars.colors.white,
  selectedItemBackgroundColorFocus: siteVars.colors.primary[100],
  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  width: pxToRem(356),
})
