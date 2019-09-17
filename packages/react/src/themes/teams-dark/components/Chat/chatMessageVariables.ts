import { ChatTimestampVariables } from '../../../teams/components/Chat/chatTimestampVariables'

export default (siteVars: any): Partial<ChatTimestampVariables> => {
  return {
    mineColor: siteVars.colors.grey[250],
  }
}
