import { Portal, createComponent } from '@stardust-ui/react'
import * as React from 'react'

type NotificationProps = {
  children?: React.ReactNode
}

type NotificationContextValue = (value: React.ReactNode, timeout: number) => void
export const NotificationContext = React.createContext<NotificationContextValue>(() => {
  throw new Error('No matching NotificationContext.Provider')
})

export const NotificationProvider: React.FC = props => {
  const { children } = props
  const [notification, setNotification] = React.useState<React.ReactNode>()
  const timeoutId = React.useRef<number>()

  const update = React.useCallback<NotificationContextValue>((value, timeout) => {
    setNotification(value)
    timeoutId.current = window.setTimeout(() => {
      setNotification(null)
    }, timeout)
  }, [])

  React.useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  }, [])

  return (
    <>
      <Portal open={!!notification}>
        <Notification>{notification}</Notification>
      </Portal>
      <NotificationContext.Provider value={update}>{children}</NotificationContext.Provider>
    </>
  )
}

export const Notification = createComponent<NotificationProps>({
  displayName: 'Notification',
  render: ({ children, stardust: { classes } }) => {
    return (
      <div className={classes.root}>
        <div className={classes.overlay}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    )
  },
})
