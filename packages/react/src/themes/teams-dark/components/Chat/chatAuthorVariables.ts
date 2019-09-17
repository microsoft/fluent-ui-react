import { ChatAuthorVariables } from '../../../teams/components/Chat/chatAuthorVariables'

export default (siteVars: any): Partial<ChatAuthorVariables> => {
  return {
    color: siteVars.colors.grey[250],
  }
}
