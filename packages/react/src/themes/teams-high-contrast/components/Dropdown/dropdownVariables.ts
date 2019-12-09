import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'
import { pxToRem } from '../../../../lib'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColorHover: string
}
export default (siteVars): Partial<DropdownVariablesHC> => ({
  backgroundColor: siteVars.colors.black,
  borderColor: siteVars.colors.white,
  borderWidth: `1px`,
  backgroundColorHover: siteVars.colors.black,
  borderColorHover: siteVars.accessibleYellow,
  borderColorFocus: siteVars.accessibleCyan,
  listBorderColor: siteVars.colors.white,
  listBoxShadow: undefined,
  listBorderWidth: '1px',
  listItemFocusBorderWidth: pxToRem(2),
  triggerButtonColorHover: siteVars.colors.white,
})
