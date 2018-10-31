import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<DividerVariables> => ({
  primaryColor: siteVars.brand06,
  textColor: siteVars.gray02,
})
