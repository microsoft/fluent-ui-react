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

  switch (position) {
    case 'popup': {
      return renderPopup({ contentId, attachedTo, label, content, onDismiss })
    }
    case 'center': {
      return renderAlertWithCloseIcon({ contentId, content, hideBorder: true, onDismiss })
    }
    default: {
      return renderAlertWithCustomButtons({ contentId, position, label, content, buttons })
    }
  }
}

// return position === 'popup'
//   ? renderPopup({ contentId, attachedTo, label, content, onDismiss })
//   : renderAlert({ contentId, position, label, content, buttons })
// }

const renderAlertWithCustomButtons = props => {
  const { contentId, position, content, hideBorder, buttons } = props
  return (
    <Alert
      danger
      content={{ id: contentId, content }}
      action={
        buttons &&
        (render =>
          render({}, (Component, props) => {
            return (
              <Flex gap="gap.small">{buttons.length > 0 && buttons.map(button => button)}</Flex>
            )
          }))
      }
      variables={{
        dangerBackgroundColor: '#585A96', // TODO: use theme color
        dangerColor: 'white',
        ...(hideBorder && { borderStyle: 'transparent' }),
      }}
      {...position === 'center' && { styles: { height: '80px' } }}
    />
  )
}

const renderAlertWithCloseIcon = props => {
  const { contentId, position, label, content, hideBorder, onDismiss } = props

  let role: string = undefined
  let describedBy: string = undefined
  if (position === 'center') {
    role = 'region'
    describedBy = contentId
  } else if (position === 'top') {
    role = 'region'
    describedBy = contentId
  }
  return (
    <div role={role} aria-label={label} aria-describedby={describedBy}>
      <Alert
        danger
        content={{ id: contentId, content }}
        action={{
          icon: 'close',
          'aria-label': 'Dismiss',
          'aria-describedby': contentId,
          onClick: onDismiss,
        }}
        variables={{
          dangerBackgroundColor: '#585A96', // TODO: use theme color
          dangerColor: 'white',
          ...(hideBorder && { borderStyle: 'transparent' }),
        }}
        {...position === 'center' && { styles: { height: '80px' } }}
      />
    </div>
  )
}

const renderPopup = props => {
  const { contentId, attachedTo, label, content, onDismiss } = props
  const target = document.querySelector(`#${attachedTo}`) as HTMLElement // TODO: use refs
  return (
    <Popup
      inline
      variables={{ contentBackgroundColor: '#585A96' }} // TODO: use theme color
      offset="20px"
      open={true}
      target={target}
      content={{
        content: renderAlertWithCloseIcon({ contentId, content, hideBorder: true, onDismiss }),
        'aria-label': label,
        'aria-describedby': contentId,
        role: 'region',
      }}
      position="above"
    />
  )
}

export default Ufd
