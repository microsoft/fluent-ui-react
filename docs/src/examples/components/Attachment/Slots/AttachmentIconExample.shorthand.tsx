import * as React from 'react'
import { Attachment } from '@fluentui/react'

const AttachmentIconExampleShorthand = () => (
  <div>
    <Attachment icon={{ name: 'word-color' }} header="MeetingNotes.docx" />
    <Attachment icon={{ name: 'excel-color' }} header="Budget.xlsx" />
    <Attachment icon={{ name: 'powerpoint-color' }} header="Presentation.pptx" />
  </div>
)

export default AttachmentIconExampleShorthand
