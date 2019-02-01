import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'

export default (siteVars: any): Partial<DividerVariables> => ({
  colors: {
    primary: siteVars.brand06,
  },
  textColor: siteVars.gray02,
})
