import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'
import { pxToRem } from '../../../../utils'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColor: string
  borderColorHover: string
}

export default (siteVars): Partial<DropdownVariablesHC> => ({
  borderColor: siteVars.colorScheme.default.border,
  borderColorFocus: siteVars.colorScheme.default.borderFocus,
  borderColorHover: siteVars.colorScheme.default.borderHover,
  borderWidth: pxToRem(1),
  listBorderWidth: pxToRem(1),
  listItemFocusBorderWidth: pxToRem(2),
  listItemSelectedColor: siteVars.accessibleCyan,
})
