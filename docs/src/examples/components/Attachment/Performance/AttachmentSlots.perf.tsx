import { Attachment } from '@fluentui/react'
import * as React from 'react'

const AttachmentSlotsPerf = () => (
  <Attachment
    actionable
    icon="table"
    header="Document.docx"
    description="800 Kb"
    action={{ icon: 'more', title: 'More Action' }}
    progress={33}
  />
)

AttachmentSlotsPerf.iterations = 5000
AttachmentSlotsPerf.filename = 'AttachmentSlots.perf.tsx'

export default AttachmentSlotsPerf
