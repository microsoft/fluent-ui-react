import { DialogVariables } from '../../../teams/components/Dialog/dialogVariables'

export default (siteVars: any): Partial<DialogVariables> => {
  return {
    boxShadow: 'none',
    rootBackground: siteVars.colors.black,
    foregroundColor: siteVars.colors.white,

    overlayBackground: 'rgba(37, 36, 36, .74)', // todo: ask daisy what this color should map to
  }
}
