import { ChatContentVariables } from '../../../teams/components/Chat/chatContentVariables'

export default (siteVars: any): Partial<ChatContentVariables> => {
  return {
    color: siteVars.colors.white,
  }
}
