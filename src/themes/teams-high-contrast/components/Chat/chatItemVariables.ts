import { ChatItemVariables } from '../../../teams/components/Chat/chatItemVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ChatItemVariables> => {
  return {
    messageColor: siteVars.black,
    messageColorMine: siteVars.black,
    avatar: {
      statusBorderColor: siteVars.black,
    },
  }
}
