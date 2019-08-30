import { Portal, createComponent } from '@stardust-ui/react/src'
import * as React from 'react'

const containerStyles = {
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'center',
  left: 0,
  overflow: 'auto',
  position: 'fixed' as 'fixed',
  right: 0,
  top: 0,
  zIndex: 1000,
}

const contentStyles = {
  backgroundColor: 'black',
  color: 'white',
  padding: 10,
}

const CopyButtonNotification = createComponent({
  displayName: 'CopyButtonNotification',
  render: ({ children, stardust: { classes } }) => {
    return (
      <Portal open={true}>
        <div className={classes.root} style={containerStyles}>
          <div className={classes.content} style={contentStyles}>
            {children}
          </div>
        </div>
      </Portal>
    )
  },
})

export default CopyButtonNotification
