import * as React from 'react'
import { Alert, Popup, Flex } from '@stardust-ui/react'

interface UfdProps {
  content: string
  position: 'top' | 'center' | 'popup'
  label: string
  attachedTo?: string
  buttons?: any[]
  contentId?: string
  /**
   * make sure to focus the right element after you call onDismiss!
   */
  onDismiss?: () => void
}

// UFDs should never grab or trap focus
// Content should be announced when they appear
// They should either be complementary if outside of main or region
// TODO: figure out label, labelledby
// TODO: figure out narration, currently aria-live on the alert, but we might need to use aria-live
const Ufd = (props: UfdProps) => {
  const { content, position, label, attachedTo, buttons, contentId, onDismiss } = props

  const height = position === 'center' ? '80px' : undefined
  const hideBorder = position === 'popup' || position === 'center'

  const alert = (
    <UfdAlert
      hideBorder={hideBorder}
      height={height}
      contentId={contentId}
      content={content}
      onDismiss={onDismiss}
      buttons={buttons}
      label={label}
    />
  )

  if (position === 'popup') {
    return <UfdPopup contentId={contentId} attachedTo={attachedTo} alert={alert} />
  }
  return alert
}

const UfdAlert = props => {
  const { contentId, content, hideBorder, onDismiss, buttons, height } = props
  return (
    <Alert
      danger
      content={{ id: contentId, content }}
      actions={
        buttons
          ? render =>
              render({}, (Component, props) => {
                return <Flex gap="gap.small">{buttons.length > 0 && buttons}</Flex>
              })
          : {
              icon: 'close',
              'aria-label': 'Dismiss',
              'aria-describedby': contentId,
              onClick: onDismiss,
            }
      }
      variables={{
        dangerBackgroundColor: '#585A96', // TODO: use theme color
        dangerColor: 'white',
        ...(hideBorder && { borderStyle: 'transparent' }),
      }}
      {...(height && { styles: { height } })}
    />
  )
}

const UfdPopup = props => {
  const { attachedTo, contentId, alert } = props
  const target = document.querySelector(`#${attachedTo}`) as HTMLElement // TODO: use refs
  return (
    <Popup
      inline
      variables={{ contentBackgroundColor: '#585A96' }} // TODO: use theme color
      offset="20px"
      open={true}
      target={target}
      content={{
        content: alert,
        'aria-describedby': contentId,
        // aria-label and region in case that each ufd would have region
        // 'aria-label': label,
        role: 'region',
      }}
      position="above"
    />
  )
}

export default Ufd
