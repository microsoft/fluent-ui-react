import { ComponentSlotStylesPrepared } from '../../../types'

import { screenReaderContainerStyles } from '../../../../lib/accessibility/Styles/accessibilityStyles'
import { ChatTimestampProps } from '../../../../components/Chat/ChatTimestamp'
import { ChatTimestampVariables } from './chatTimestampVariables'

const chatTimestampStyles: ComponentSlotStylesPrepared<
  ChatTimestampProps,
  ChatTimestampVariables
> = {
  root: ({ props: p, variables: v }) => ({
    margin: v.margin,
    ...(p.mine && {
      color: v.mineColor,
    }),
    ...((p.attached === 'bottom' || p.attached === true) &&
      !p.reactionGroup &&
      screenReaderContainerStyles),
  }),
}

export default chatTimestampStyles
