import * as React from 'react'
import { Attachment } from '@stardust-ui/react'

const AttachmentProgressExampleShorthand = () => (
  <Attachment
    header="Photo.jpg"
    action={{ icon: 'x', onClick: () => alert("'X' is clicked!") }}
    progress={33}
  />
)

export default AttachmentProgressExampleShorthand
