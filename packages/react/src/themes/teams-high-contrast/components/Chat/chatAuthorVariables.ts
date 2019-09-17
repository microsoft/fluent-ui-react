import { ChatAuthorVariables } from '../../../teams/components/Chat/ChatAuthorVariables'

export default (siteVars: any): Partial<ChatAuthorVariables> => {
  return {
    color: siteVars.colors.white,
  }
}
