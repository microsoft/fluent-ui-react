import * as React from 'react'
import { Attachment } from '@stardust-ui/react'

class AttachmentActionExampleShorthand extends React.Component {
  handleClick = action => () => alert(`'${action}' was clicked`)

  render() {
    return (
      <div>
        <Attachment
          header="Picture.jpg"
          action={{
            icon: {
              name: 'close',
              outline: true,
            },
            onClick: this.handleClick('Remove'),
          }}
        />
        <Attachment
          header="Document.docx"
          action={{
            icon: {
              name: 'more',
              outline: true,
            },
            onClick: this.handleClick('Show more'),
          }}
        />
      </div>
    )
  }
}

export default AttachmentActionExampleShorthand
