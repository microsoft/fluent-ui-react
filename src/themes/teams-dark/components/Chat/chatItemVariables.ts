import { ChatItemVariables } from '../../../teams/components/Chat/chatItemVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ChatItemVariables> => {
  return {
    messageColor: siteVars.white,
    messageColorMine: '#E0E0ED',
    avatar: {
      statusBorderColor: siteVars.black,
    },
  }
}
