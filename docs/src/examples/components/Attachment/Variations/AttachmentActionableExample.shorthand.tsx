import * as React from 'react'
import { Attachment } from '@stardust-ui/react'

class AttachmentActionableExampleShorthand extends React.Component {
  handleClick = () => alert('Attachment was clicked')

  render() {
    return (
      <Attachment
        actionable
        icon="file word outline"
        header="Document.docx"
        description="800 Kb"
        action={{ icon: 'x' }}
        progress={33}
        onClick={this.handleClick}
      />
    )
  }
}
export default AttachmentActionableExampleShorthand
