import { pxToRem } from '../../../../lib'
import { TextAreaVariables } from '../../../teams/components/TextArea/textAreaVariables'

export default (siteVars: any): Partial<TextAreaVariables> => {
  return {
    borderColor: siteVars.bodyColor,
    borderWidth: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(2)} ${pxToRem(1)}`,
    borderColorFocus: `${siteVars.colors.white} ${siteVars.colors.white} ${siteVars.colorScheme.brand.borderFocus1} ${siteVars.colors.white}`,
  }
}
