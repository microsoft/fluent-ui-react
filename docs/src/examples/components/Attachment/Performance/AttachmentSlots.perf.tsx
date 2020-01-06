import { Attachment } from '@fluentui/react'
import * as React from 'react'

const AttachmentSlotsPerf = () => (
  <Attachment
    actionable
    icon={{ name: 'table' }}
    header="Document.docx"
    description="800 Kb"
    action={{ icon: { name: 'more' }, title: 'More Action' }}
    progress={33}
  />
)

AttachmentSlotsPerf.iterations = 1000
AttachmentSlotsPerf.filename = 'AttachmentSlots.perf.tsx'

export default AttachmentSlotsPerf
