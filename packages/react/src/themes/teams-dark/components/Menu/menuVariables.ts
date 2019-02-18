import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
    color: siteVars.white,

    verticalMenuBackgroundColor: 'red',
    verticalMenuBoxShadow: siteVars.shadowLevel3,
})
