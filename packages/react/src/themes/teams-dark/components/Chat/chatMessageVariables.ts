import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.gray10,
    backgroundColorMine: '#3B3C54',
    authorColor: siteVars.gray02, // will be gray[250] with new palette
    contentColor: siteVars.colors.white,
    color: siteVars.colors.white,
    contentFocusOutlineColor: siteVars.brand,
    hasMentionNubbinColor: siteVars.naturalColors.orange[900], // orange[300] when the new palette pr is checked in
    isImportantColor: '#e73550', // red[300] when the new palette pr is checked in
  }
}
