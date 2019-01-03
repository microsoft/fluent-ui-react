import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<MenuVariables> => {
  return {
    color: siteVars.gray02,
    backgroundColor: siteVars.black,

    activeColor: siteVars.white,
    activeBackgroundColor: siteVars.gray14,
    focusedBackgroundColor: siteVars.gray14,
    borderColor: siteVars.gray02,

    primaryActiveColor: siteVars.black,
    primaryActiveBackgroundColor: siteVars.brand02,
    primaryActiveBorderColor: siteVars.brand,

    primaryFocusedColor: siteVars.black,
    primaryFocusedBackgroundColor: siteVars.brand12,

    primaryBorderColor: siteVars.brand08,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,
  }
}
