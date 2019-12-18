import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColor: string
  borderColorHover: string
}

export default (siteVars): Partial<DropdownVariablesHC> => ({
  borderColor: siteVars.colors.white,
  borderColorHover: siteVars.accessibleYellow,
  borderWidth: '1px',
  listBorderWidth: '1px',
})
