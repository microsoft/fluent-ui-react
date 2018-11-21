import { HeaderVariables } from '../../../teams/components/Header/headerVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<HeaderVariables> => {
  return {
    color: siteVars.white,
    descriptionColor: siteVars.gray02,
  }
}
