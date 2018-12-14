import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.gray14,
    backgroundColorMine: siteVars.brand16,
    color: siteVars.white,
    contentFocusOutlineColor: siteVars.brand,
  }
}
