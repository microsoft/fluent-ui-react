import { createComponent } from '@stardust-ui/react'
import * as React from 'react'

type ChatMetaProps = {
  'aria-label': string
  children?: React.ReactNode
}

const ChatMeta = createComponent<ChatMetaProps>({
  className: 'ui-chat__meta',
  displayName: 'ChatMeta',
  render: props => {
    const { 'aria-label': ariaLabel, children, stardust } = props

    return (
      <div aria-label={ariaLabel} className={stardust.classes.root}>
        {children}
      </div>
    )
  },
})

export default ChatMeta
