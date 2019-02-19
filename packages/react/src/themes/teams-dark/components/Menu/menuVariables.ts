import { pxToRem } from '../../../../lib'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({

    color: siteVars.gray02,
    borderColor: siteVars.black,

    focusedBorder: `solid ${pxToRem(1)} ${siteVars.colors.white}`,
    focusedBackgroundColor: 'transparent',

    hoverBackgroundColor: siteVars.gray08,

    activeColor: siteVars.colors.white,
    activeBackgroundColor: siteVars.gray08,
    iconOnlyActiveColor: siteVars.brand06,

    primaryActiveColor: siteVars.colors.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.colors.primary[500],

    primaryFocusedColor: siteVars.white,
    primaryFocusedBackgroundColor: siteVars.brand12,

    verticalMenuBackgroundColor: siteVars.gray10,
    verticalMenuBoxShadow: siteVars.shadowLevel3,

    menuDividerHeight: pxToRem(2),
    menuBorderWidth: pxToRem(2),
})
