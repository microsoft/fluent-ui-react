import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

export default (siteVars): Partial<DropdownVariables> => ({
  backgroundColor: '#2D2C2C', // colors.grey[650] when new color palette checks in
  backgroundColorHover: '#3B3A39', // colors.grey[550] when new color palette checks in
  borderColor: 'transparent',
  borderColorFocus: siteVars.colors.primary[500],
  color: '#C8C6C4', // colors.grey[250] when new color palette checks in
  listBackgroundColor: '#2D2C2C', // colors.grey[650] when new color palette checks in
  listItemBackgroundColor: '#2D2C2C', // colors.grey[650] when new color palette checks in
  listItemColorHover: siteVars.colors.white,
  listItemBackgroundColorHover: '#3B3A39', // colors.grey[550] when new color palette checks in
  listItemBackgroundColorActive: '#3B3A39', // colors.grey[550] when new color palette checks in
  listItemColorActive: siteVars.colors.white,
  selectedItemBackgroundColorFocus: siteVars.colors.primary[100],
  triggerButtonColorHover: '#C8C6C4', // colors.grey[250] when new color palette checks in
})
