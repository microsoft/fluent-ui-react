import * as React from 'react'
import { Alert, Popup, Flex, Button } from '@stardust-ui/react'

interface UfdProps {
  content: string
  position: 'top' | 'center' | 'popup' | 'popupButtons'
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
    case 'popupButtons': {
      return renderPopupWithButtons({ contentId, attachedTo, label, content, onDismiss })
    }
    case 'center': {
      return renderAlertWithCloseIcon({ contentId, content, hideBorder: true, onDismiss })
    }
    default: {
      return renderAlertWithCustomButtons({ contentId, position, label, content, buttons })
    }
  }
}

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
  const { contentId, position, content, hideBorder, onDismiss } = props
  return (
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
  )
}

const contentWithButtons = props => {
  const { contentId, content, onDismiss } = props
  return (
    <Flex gap="gap.smaller">
      {renderAlertWithCloseIcon({ contentId, content, hideBorder: true, onDismiss })}
      <Button aria-describedby={contentId}>Device settings</Button>
      <Button aria-describedby={contentId} primary>
        Call me back
      </Button>
    </Flex>
  )
}

const renderPopup = props => {
  const { contentId, attachedTo, content, onDismiss } = props
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
        'aria-describedby': contentId,
        // aria-label and region in case that each ufd would have region
        // 'aria-label': label,
        // role: 'region',
      }}
      position="above"
    />
  )
}

const renderPopupWithButtons = props => {
  const { contentId, attachedTo, content, onDismiss } = props
  const target = document.querySelector(`#${attachedTo}`) as HTMLElement // TODO: use refs
  return (
    <Popup
      inline
      variables={{ contentBackgroundColor: '#585A96' }} // TODO: use theme color
      offset="20px"
      open={true}
      target={target}
      content={{
        content: contentWithButtons({ contentId, content, hideBorder: true, onDismiss }),
        'aria-describedby': contentId,
        // region will be done when there will be clear if it should go under one common region or each alert will have own one
        // aria-label and region in case that each ufd would have region
        // 'aria-label': label,
        role: 'region',
      }}
      position="above"
    />
  )
}

export default Ufd
