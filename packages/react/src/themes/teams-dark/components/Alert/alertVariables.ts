import { AlertVariables } from '../../../teams/components/Alert/alertVariables'

export default (siteVars: any): Partial<AlertVariables> => {
  return {
    backgroundColor: siteVars.gray02,
    borderColor: siteVars.gray09,
    color: siteVars.gray09,

    dangerColor: siteVars.colors.red[200],
    dangerBackgroundColor: siteVars.colors.red[800],
    dangerBorderColor: siteVars.colors.red[900],

    oofColor: siteVars.colors.pink[200],
    oofBackgroundColor: siteVars.colors.pink[800],
    oofBorderColor: siteVars.colors.pink[900],

    infoColor: siteVars.colors.grey[250],
    infoBackgroundColor: siteVars.colors.grey[550],
    infoBorderColor: siteVars.colors.grey[900],

    urgentColor: siteVars.colors.white,
    urgentBackgroundColor: siteVars.colors.red[400],
    urgentBorderColor: siteVars.colors.red[400],
  }
}
