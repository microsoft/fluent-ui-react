import { Portal, Tooltip, createComponent } from '@stardust-ui/react'
import * as React from 'react'

type NotificationProps = {
  children?: React.ReactNode
}

type NotificationContextValue = (
  value: React.ReactNode,
  targetRef: React.MutableRefObject<HTMLElement>,
  timeout: number,
) => void
export const NotificationContext = React.createContext<NotificationContextValue>(() => {
  throw new Error('No matching NotificationContext.Provider')
})

export const NotificationProvider: React.FC = props => {
  const { children } = props
  const [notification, setNotification] = React.useState<React.ReactNode>()
  const [targetRef, setTargetRef] = React.useState<React.MutableRefObject<HTMLElement>>()
  const timeoutId = React.useRef<number>()

  const update = React.useCallback<NotificationContextValue>((value, targetRef, timeout) => {
    setNotification(value)
    setTargetRef(targetRef)
    timeoutId.current = window.setTimeout(() => {
      setNotification(null)
      setTargetRef(null)
    }, timeout)
  }, [])

  React.useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  }, [])

  return (
    <>
      {!!targetRef ? (
        !!notification && (
          <Tooltip
            content={notification}
            pointing={true}
            open={!!notification}
            target={targetRef.current}
            variables={{ primary: true }}
          />
        )
      ) : (
        <Portal open={!!notification}>
          (<Notification>{notification}</Notification>)
        </Portal>
      )}
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
