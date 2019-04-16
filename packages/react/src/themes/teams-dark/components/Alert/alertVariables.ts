import { SiteVariablesPrepared } from '../../../types'

export interface AlertVariables {
  backgroundColor: string
  borderColor: string
  color: string

  dangerColor: string
  dangerBackgroundColor: string
  dangerBorderColor: string

  oofColor: string
  oofBackgroundColor: string
  oofBorderColor: string

  infoColor: string
  infoBackgroundColor: string
  infoBorderColor: string

  urgentColor: string
  urgentBackgroundColor: string
  urgentBorderColor: string
}

export default (siteVars: SiteVariablesPrepared): AlertVariables => {
  return {
    backgroundColor: siteVars.gray02,
    borderColor: siteVars.gray09,
    color: siteVars.gray09,

    dangerColor: '#E73550', // red[300] when new color palette PR goes in
    dangerBackgroundColor: siteVars.red08,
    dangerBorderColor: '#1E040A', // red[900] when new color palette PR goes in

    oofColor: '#ec6fae', // pink[200] when new color palette PR goes in
    oofBackgroundColor: '#3e2d3b', // pink[800] when new color palette PR goes in
    oofBorderColor: '#1f191d', // pink[900] when new color palette PR goes in

    infoColor: siteVars.gray02,
    infoBackgroundColor: siteVars.gray09,
    infoBorderColor: '#11100F', // gray[900] when new color palette PR goes in

    urgentColor: siteVars.colors.white,
    urgentBackgroundColor: siteVars.colors.red[900],
    urgentBorderColor: siteVars.colors.red[900],
  }
}
