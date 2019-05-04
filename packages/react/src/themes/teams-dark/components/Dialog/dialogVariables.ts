import { DialogVariables } from '../../../teams/components/Dialog/dialogVariables'

export default (siteVars: any): Partial<DialogVariables> => {
  return {
    boxShadow: siteVars.shadowLevel4,
    rootBackground: '#2d2c2c', // gray[650] with new color palette
    foregroundColor: siteVars.colors.white,

    overlayBackground: 'rgba(37, 36, 36, .74)', // todo: ask daisy what this color should map to
  }
}
