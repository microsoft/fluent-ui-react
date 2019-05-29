import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables'
import { pxToRem } from '../../../../lib'

export interface DropdownVariablesHC extends DropdownVariables {
  borderColorHover: string
}

const _3px_asRem = pxToRem(3)

export default (siteVars): Partial<DropdownVariablesHC> => ({
  backgroundColor: siteVars.colors.black,
  borderColor: siteVars.colors.white,
  containerBorderRadius: _3px_asRem,
  openAboveContainerBorderRadius: `0 0 ${_3px_asRem} ${_3px_asRem}`,
  borderWidth: `1px`,
  backgroundColorHover: siteVars.colors.black,
  borderColorHover: siteVars.accessibleYellow,
  borderColorFocus: siteVars.accessibleCyan,
  color: siteVars.colors.white,
  selectedItemColor: siteVars.colors.white,
  belowListBorderRadius: `0 0 ${_3px_asRem} ${_3px_asRem}`,
  listBackgroundColor: siteVars.colors.black,
  listBorderColor: siteVars.colors.white,
  listBoxShadow: undefined,
  listBorderWidth: '1px',
  listItemBackgroundColor: siteVars.colors.black,
  listItemColorHover: siteVars.colors.black,
  listItemBackgroundColorHover: siteVars.accessibleYellow,
  listItemBackgroundColorActive: siteVars.accessibleYellow,
  listItemColorActive: siteVars.colors.black,
  listItemSelectedColor: siteVars.accessibleCyan,
  selectedItemBackgroundColor: siteVars.colors.black,
  selectedItemColorFocus: siteVars.colors.black,
  selectedItemBackgroundColorFocus: siteVars.accessibleYellow,
  triggerButtonColorHover: siteVars.colors.white,
})
