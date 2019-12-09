import * as React from 'react'
import { Attachment } from '@fluentui/react'

class AttachmentActionExampleShorthand extends React.Component {
  handleClick = action => () => alert(`'${action}' was clicked`)

  render() {
    return (
      <div>
        <Attachment
          header="Picture.jpg"
          action={{ icon: 'close', onClick: this.handleClick('Remove'), title: 'Close' }}
        />
        <Attachment
          header="Document.docx"
          action={{ icon: 'more', onClick: this.handleClick('Show more'), title: 'Show more' }}
        />
      </div>
    )
  }
}

export default AttachmentActionExampleShorthand
