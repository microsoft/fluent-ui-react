import { HeaderVariables } from '../../../teams/components/Header/headerVariables'

export default (siteVars: any): Partial<HeaderVariables> => {
  return {
    color: siteVars.white,
    descriptionColor: siteVars.white,
  }
}
