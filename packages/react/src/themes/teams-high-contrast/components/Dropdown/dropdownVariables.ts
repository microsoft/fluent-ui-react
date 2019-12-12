import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColorHover: string
  borderColor: string
}

export default (siteVars): Partial<DropdownVariablesHC> => ({
  borderColor: 'white',
  borderColorHover: 'yellow',
})
