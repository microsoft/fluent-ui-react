import { ComponentSlotStylesPrepared } from '../../../types'

import { ChatAuthorProps } from '../../../../components/Chat/ChatAuthor'
import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { ChatAuthorVariables } from './chatAuthorVariables'

const ChatAuthorStyles: ComponentSlotStylesPrepared<ChatAuthorProps, ChatAuthorVariables> = {
  root: ({ props: p, variables: v }) => ({
    ...((p.mine || p.attached === 'bottom' || p.attached === true) && screenReaderContainerStyles),
    color: v.color,
    margin: v.margin,
    fontSize: v.fontSize,
    fontWeight: v.fontWeight,
    lineHeight: v.lineHeight,
  }),
}

export default ChatAuthorStyles
