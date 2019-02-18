import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
    color: siteVars.gray02,
    iconOnlyActiveColor: siteVars.brand06,
    activeColor: siteVars.colors.white,
    activeBackgroundColor: siteVars.gray10,
    focusedBackgroundColor: siteVars.gray14,
    borderColor: siteVars.gray08,

    primaryActiveColor: siteVars.colors.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.colors.primary[500],

    primaryFocusedColor: siteVars.white,
    primaryFocusedBackgroundColor: siteVars.brand12,

    verticalMenuBackgroundColor: siteVars.colors.black,
    verticalMenuBoxShadow: siteVars.shadowLevel3,
})
