import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables'

export default (siteVars: any): Partial<CheckboxVariables> => {
  return {
    checkboxBorderColorHover: siteVars.accessibleYellow,
  }
}
