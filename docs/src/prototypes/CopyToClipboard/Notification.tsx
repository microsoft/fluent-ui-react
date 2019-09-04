import { Portal, createComponent } from '@stardust-ui/react'
import * as React from 'react'

type NotificationProps = {
  children?: React.ReactNode
  open?: boolean
}

const Notification = createComponent<NotificationProps>({
  displayName: 'Notification',
  render: ({ children, open, stardust: { classes } }) => {
    return (
      <Portal open={open}>
        <div className={classes.root}>
          <div className={classes.overlay}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </Portal>
    )
  },
})

export default Notification
