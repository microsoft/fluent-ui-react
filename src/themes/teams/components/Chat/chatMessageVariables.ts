import { AvatarVariables } from '../Avatar/avatarVariables'

export interface ChatMessageVariables {
  messageWidth: string
  messageColor: string
  messageColorMine: string
  avatar: AvatarVariables
}

export default (siteVars): ChatMessageVariables => ({
  messageWidth: '80%',
  messageColor: siteVars.white,
  messageColorMine: '#E0E0ED',
  avatar: {
    status: {
      borderColor: siteVars.gray10,
    },
  },
})
