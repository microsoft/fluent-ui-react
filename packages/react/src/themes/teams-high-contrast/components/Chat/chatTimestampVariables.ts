import { ChatTimestampVariables } from '../../../teams/components/Chat/ChatTimestampVariables'

export default (siteVars: any): Partial<ChatTimestampVariables> => {
  return {
    mineColor: siteVars.colors.white,
  }
}
