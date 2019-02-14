import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.black,
    backgroundColorMine: siteVars.black,
    color: siteVars.white,
    contentFocusOutlineColor: siteVars.colors.yellow[900], // Red flag (should this be accessibleYellow?)
    border: `1px solid ${siteVars.white}`,
  }
}
