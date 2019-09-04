import { Portal, createComponent } from '@stardust-ui/react/src'
import * as React from 'react'

const Notification = createComponent({
  displayName: 'Notification',
  render: ({ children, stardust: { classes } }) => {
    return (
      <Portal open>
        <div className={classes.root}>
          <div className={classes.content}>{children}</div>
        </div>
      </Portal>
    )
  },
})

export default Notification
