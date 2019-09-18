import { createComponent } from '@stardust-ui/react'
import * as React from 'react'

export type ChatBookendProps = {
  attached?: 'bottom'
  children?: React.ReactNode
}

const ChatBookend = createComponent<ChatBookendProps>({
  className: 'ui-chat__bookend',
  displayName: 'ChatBookend',
  render: props => {
    const { children, stardust } = props

    return <div className={stardust.classes.root}>{children}</div>
  },
})

export default ChatBookend
