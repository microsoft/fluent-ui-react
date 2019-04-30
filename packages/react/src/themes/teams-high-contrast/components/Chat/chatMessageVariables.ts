import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.black,
    backgroundColorMine: siteVars.black,
    authorColor: siteVars.white,
    contentColor: siteVars.white,
    color: siteVars.white,
    contentFocusOutlineColor: siteVars.colors.yellow[900], // Red flag (should this be accessibleYellow?)
    border: `1px solid ${siteVars.white}`,
    hasMentionColor: siteVars.accessibleYellow,
    hasMentionNubbinColor: siteVars.accessibleYellow,
    isImportantColor: siteVars.accessibleYellow,
    badgeTextColor: siteVars.colors.black,
    timestampColorMine: siteVars.colors.white,
  }
}
