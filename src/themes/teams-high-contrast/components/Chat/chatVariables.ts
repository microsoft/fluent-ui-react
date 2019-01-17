import { ChatVariables } from '../../../teams/components/Chat/chatVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ChatVariables> => {
  return {
    backgroundColor: siteVars.black,
  }
}
