import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables'
// import { transparentColors } from '../../../teams/colors';

export default (siteVars: any): Partial<CheckboxVariables> => {
  return {
    checkedCheckboxBackground: siteVars.accessibleCyan,
    checkboxCheckedIndicatorColor: siteVars.colors.black,

    disabledcheckboxCheckedIndicatorColor: siteVars.colors.black,
    checkboxBorderColorHover: siteVars.accessibleYellow,
    checkedCheckboxBackgroundHover: siteVars.accessibleYellow,

    toggleIndicatorColor: siteVars.colors.white,
    disabledtoggleIndicatorColor: siteVars.colors.accessibleGreen,
  }
}
