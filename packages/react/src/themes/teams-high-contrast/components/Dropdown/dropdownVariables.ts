import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColorHover: string
}

export default (siteVars): Partial<DropdownVariablesHC> => ({
  borderColor: siteVars.colors.white,
  borderColorHover: siteVars.accessibleYellow,
  borderColorFocus: siteVars.accessibleCyan,
})
