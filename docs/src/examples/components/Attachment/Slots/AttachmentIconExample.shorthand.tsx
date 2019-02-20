import * as React from 'react'
import { Attachment } from '@stardust-ui/react'

const AttachmentIconExampleShorthand = () => (
  <div>
    <Attachment icon="word-color" header="MeetingNotes.docx" />
    <Attachment icon="file excel outline" header="Budget.xlsx" />
    <Attachment icon="file powerpoint outline" header="Presentation.pptx" />
  </div>
)

export default AttachmentIconExampleShorthand
