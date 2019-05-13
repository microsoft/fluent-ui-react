import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

export default (siteVars): Partial<DropdownVariables> => ({
  backgroundColor: siteVars.colors.grey[650],
  backgroundColorHover: siteVars.colors.grey[550],
  borderColor: 'transparent',
  borderColorFocus: siteVars.colors.brand[400],
  color: siteVars.colors.grey[250],
  selectedItemColor: siteVars.colors.grey[250],
  listBoxShadow: `0 .2rem .6rem 0 rgba(0, 0, 0, 0.25)`,
  listBackgroundColor: siteVars.colors.grey[650],
  listItemBackgroundColor: siteVars.colors.grey[650],
  listItemColorHover: siteVars.colors.white,
  listItemBackgroundColorHover: siteVars.colors.grey[550],
  listItemBackgroundColorActive: siteVars.colors.grey[550],
  listItemColorActive: siteVars.colors.white,
  selectedItemBackgroundColor: siteVars.colors.grey[650],
  selectedItemColorFocus: siteVars.colors.grey[700], // check this value
  listItemSelectedColor: siteVars.colors.white,
  selectedItemBackgroundColorFocus: siteVars.colors.brand[200],
  triggerButtonColorHover: siteVars.colors.grey[250],
})
