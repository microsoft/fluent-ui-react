import { AlertVariables } from '../../../teams/components/Alert/alertVariables'

export default (siteVars: any): Partial<AlertVariables> => {
  return {
    backgroundColor: siteVars.gray02,
    borderColor: siteVars.gray09,
    color: siteVars.gray09,

    dangerColor: '#f9526b', // red[200] when new color palette PR goes in
    dangerBackgroundColor: '#3e1f25', // red[800] when new color palette PR goes in
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
