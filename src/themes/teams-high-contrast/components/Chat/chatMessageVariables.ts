import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    messageColor: siteVars.black,
    messageColorMine: siteVars.black,
    avatar: {
      statusBorderColor: siteVars.black,
    },
    messageBody: { focusOutlineColor: siteVars.brand },
  }
}
