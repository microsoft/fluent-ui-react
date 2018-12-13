import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    messageColor: siteVars.white,
    messageColorMine: '#E0E0ED',
    avatar: {
      statusBorderColor: siteVars.black,
    },
    messageBody: { focusOutlineColor: siteVars.brand },
  }
}
