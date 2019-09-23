import { Portal, Tooltip, createComponent, TooltipProps } from '@stardust-ui/react'
import * as React from 'react'

type NotificationProps = {
  attach: TooltipProps
  content: React.ReactNode
}

type NotificationContextValue = (
  content: React.ReactNode,
  attach: boolean | TooltipProps,
  timeout: number,
) => void

export const NotificationContext = React.createContext<NotificationContextValue>(() => {
  throw new Error('No matching NotificationContext.Provider')
})

export const NotificationProvider: React.FC = props => {
  const { children } = props
  const [notification, setNotification] = React.useState<React.ReactNode>()
  const [attach, setAttach] = React.useState<boolean | TooltipProps>()
  const timeoutId = React.useRef<number>()

  const update = React.useCallback<NotificationContextValue>(
    (notification, attachProps, timeout) => {
      setNotification(notification)
      setAttach(attachProps)
      timeoutId.current = window.setTimeout(() => {
        setNotification(null)
        setAttach(null)
      }, timeout)
    },
    [],
  )

  React.useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  }, [])

  return (
    <>
      {!!notification && <Notification attach={attach} content={notification} />}
      <NotificationContext.Provider value={update}>{children}</NotificationContext.Provider>
    </>
  )
}

export const Notification = createComponent<NotificationProps>({
  displayName: 'Notification',
  render: ({ attach, content, stardust: { classes } }) => {
    if (attach) {
      return Tooltip.create(attach, {
        defaultProps: {
          pointing: false,
          offset: '0 10',
        },
        overrideProps: {
          content,
          open: true,
        },
      })
    }

    return (
      <Portal open={true}>
        <div className={classes.root}>
          <div className={classes.overlay}>
            <div className={classes.content}>{content}</div>
          </div>
        </div>
      </Portal>
    )
  },
})
