import * as _ from 'lodash'
import * as React from 'react'
import { Alert, Popup } from '@stardust-ui/react'

interface UfdProps {
  content: string
  position: 'top' | 'center' | 'popup'
  attachedTo?: string
  label: string

  /**
   * make sure to focus the right element after you call onDismiss!
   */
  onDismiss: () => void
}

// UFDs should never grab or trap focus
// Content should be announced when they appear
// They should either be complementary if outside of main or region
// TODO: figure out label, labelledby
// TODO: figure out narration, currently aria-live on the alert, but we might need to use aria-live
const Ufd = (props: UfdProps) => {
  const { content, position, label, attachedTo, onDismiss } = props
  const contentId = React.useRef(_.uniqueId('ufd-content-'))

  return position === 'popup'
    ? renderPopup({ contentId: contentId.current, attachedTo, label, content, onDismiss })
    : renderAlert({ contentId: contentId.current, position, label, content, onDismiss })
}

const renderAlert = props => {
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
        content: renderAlert({ contentId, content, hideBorder: true, onDismiss }),
        'aria-label': label,
        'aria-describedby': contentId,
        role: 'region',
      }}
      position="above"
    />
  )
}

export default Ufd
