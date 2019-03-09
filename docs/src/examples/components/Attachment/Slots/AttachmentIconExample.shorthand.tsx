import * as React from 'react'
import { Attachment } from '@stardust-ui/react'

const AttachmentIconExampleShorthand = () => (
  <div>
    <Attachment icon="word-color" header="MeetingNotes.docx" />
    <Attachment icon="excel-color" header="Budget.xlsx" />
    <Attachment icon="powerpoint-color" header="Presentation.pptx" />
  </div>
)

export default AttachmentIconExampleShorthand
