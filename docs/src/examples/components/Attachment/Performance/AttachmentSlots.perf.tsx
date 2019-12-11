import { Attachment } from '@fluentui/react'
import * as React from 'react'

export default {
  iterations: 1000,
  filename: 'AttachmentSlots.perf.tsx',
}

export const AttachmentSlotsPerf = () => (
  <Attachment
    actionable
    icon="table"
    header="Document.docx"
    description="800 Kb"
    action={{ icon: 'more', title: 'More Action' }}
    progress={33}
  />
)
