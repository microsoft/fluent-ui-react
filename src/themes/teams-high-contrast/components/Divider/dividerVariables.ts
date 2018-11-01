import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<DividerVariables> => ({
  dividerColor: siteVars.white,
  textColor: siteVars.white,
  primaryColor: siteVars.white,
})
