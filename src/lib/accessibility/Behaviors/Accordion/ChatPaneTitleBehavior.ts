import { Accessibility } from '../../interfaces'

const ChatPaneTitleBehavior: Accessibility = {
  attributes: {
    root: {
      role: 'heading',
      'data-is-focusable': true,
    },
  },
}

export default ChatPaneTitleBehavior
