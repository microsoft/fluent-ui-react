import { ComponentSlotStylesPrepared } from '../../../types'

import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { ChatTimestampProps } from '../../../../components/Chat/ChatTimestamp'
import { ChatTimestampVariables } from './chatTimestampVariables'

const chatTimestampStyles: ComponentSlotStylesPrepared<
  ChatTimestampProps,
  ChatTimestampVariables
> = {
  root: ({ props: p, variables: v }) => ({
    color: v.color,
    fontSize: v.fontSize,
    lineHeight: v.lineHeight,
    margin: v.margin,

    ':hover': {
      color: v.colorHover,
    },

    ...(p.mine && {
      color: v.mineColor,
    }),

    ...((p.attached === 'bottom' || p.attached === true) &&
      !p.reactionGroup &&
      screenReaderContainerStyles),
  }),
}

export default chatTimestampStyles
