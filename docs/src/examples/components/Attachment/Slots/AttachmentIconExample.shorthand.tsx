import React from 'react'
import { Attachment, Provider } from '@stardust-ui/react'

const slotLabelStyles = label => ({
  position: 'relative',
  border: '2px solid red',
  ':before': {
    position: 'absolute',
    content: `'${label}'`,
    letterSpacing: '0.7px',
    color: 'white',
    padding: '2px',
    background: 'red',
    fontSize: '10px',
    lineHeight: '12px',
    bottom: '-16px',
    left: '-2px',
    zIndex: 30,
    opacity: 1,
  },
})

const AttachmentIconExampleShorthand = () => (
  <Provider
    theme={{
      componentStyles: {
        Attachment: { icon: { ...(slotLabelStyles('icon') as any), padding: '3px' } },
      },
    }}
  >
    <div>
      <Attachment icon="file word outline" header="MeetingNotes.pptx" />
      <Attachment icon="file excel outline" header="Budget.pptx" />
      <Attachment icon="file powerpoint outline" header="Presentation.pptx" />
    </div>
  </Provider>
)

export default AttachmentIconExampleShorthand
