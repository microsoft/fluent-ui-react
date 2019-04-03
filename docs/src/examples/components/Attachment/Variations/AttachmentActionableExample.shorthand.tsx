import * as React from 'react'
import { Attachment } from '@stardust-ui/react'

class AttachmentActionableExampleShorthand extends React.Component {
  handleClick = message => e => {
    alert(`'${message}' was clicked`)
    e.stopPropagation()
  }

  render() {
    return (
      <Attachment
        actionable
        icon="table"
        header="Document.docx"
        description="800 Kb"
        action={{
          icon: {
            name: 'more',
            outline: true,
          },
          onClick: this.handleClick('More Action'),
        }}
        progress={33}
        onClick={this.handleClick('Attachment')}
      />
    )
  }
}
export default AttachmentActionableExampleShorthand
