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
class AttachmentActionExampleShorthand extends React.Component {
  handleClick = action => () => alert(`'${action}' was clicked`)

  render() {
    return (
      <Provider
        theme={{
          componentStyles: {
            Attachment: { action: slotLabelStyles('action') as any },
          },
        }}
      >
        <div>
          <Attachment
            header="Picture.jpg"
            action={{ icon: 'x', onClick: this.handleClick('Remove') }}
          />
          <Attachment
            header="Document.docx"
            action={{ icon: 'ellipsis horizontal', onClick: this.handleClick('Show more') }}
          />
        </div>
      </Provider>
    )
  }
}

export default AttachmentActionExampleShorthand
