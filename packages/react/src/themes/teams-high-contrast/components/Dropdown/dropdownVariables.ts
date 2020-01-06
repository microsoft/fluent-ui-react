import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColor: string
  borderColorHover: string
}

export default (siteVars): Partial<DropdownVariablesHC> => ({
  borderColor: siteVars.colors.white,
  borderColorFocus: siteVars.accessibleCyan,
  borderColorHover: siteVars.accessibleYellow,
  borderWidth: '1px',
  listBorderWidth: '1px',
  listItemFocusBorderWidth: '2px',
  listItemSelectedColor: siteVars.accessibleCyan,
})
