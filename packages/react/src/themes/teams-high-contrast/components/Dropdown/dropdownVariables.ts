import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'
import { pxToRem } from '../../../../lib'

export interface DropdownVariablesHOC extends DropdownVariables {
  borderColorHover: string
}

export default (siteVars): Partial<DropdownVariablesHOC> => ({
  backgroundColor: siteVars.colors.black,
  borderColor: siteVars.colors.white,
  borderRadius: pxToRem(3),
  borderWidth: `1px`,
  backgroundColorHover: siteVars.colors.black,
  borderColorHover: siteVars.accessibleYellow,
  borderColorFocus: siteVars.accessibleCyan,
  color: siteVars.colors.white,
  selectedItemColor: siteVars.colors.white,
  listBackgroundColor: siteVars.colors.black,
  listBorderColor: siteVars.colors.white,
  listBoxShadow: undefined,
  listBorderWidth: '1px',
  listItemBackgroundColor: siteVars.colors.black,
  listItemColorHover: siteVars.colors.black,
  listItemBackgroundColorHover: siteVars.accessibleYellow,
  listItemBackgroundColorActive: siteVars.accessibleYellow,
  listItemColorActive: siteVars.colors.black,
  selectedItemBackgroundColor: siteVars.colors.black,
  selectedItemColorFocus: siteVars.colors.black,
  selectedItemBackgroundColorFocus: siteVars.accessibleYellow,
  triggerButtonColorHover: siteVars.colors.white,
})
