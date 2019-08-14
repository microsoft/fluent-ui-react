import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

const items = [
  {
    content: 'Export to PDF',
    icon: 'files-pdf',
  },
  {
    content: 'Export to PDS',
    icon: 'files-photoshop',
  },
  {
    content: 'Export as GIF',
    icon: 'files-gif',
    disabled: true,
  },
  {
    content: 'Export to EPS',
    icon: 'files-illustrator',
  },
]

const SplitButtonExampleShorthand = () => <SplitButton items={items} />

export default SplitButtonExampleShorthand
