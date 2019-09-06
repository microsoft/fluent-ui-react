import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

const items = [
  {
    key: 'pdf',
    content: 'Export to PDF',
    icon: 'files-pdf',
  },
  {
    key: 'pds',
    content: 'Export to PDS',
    icon: 'files-photoshop',
  },
  {
    key: 'gif',
    content: 'Export as GIF',
    icon: 'files-gif',
    disabled: true,
  },
  {
    key: 'eps',
    content: 'Export to EPS',
    icon: 'files-illustrator',
  },
]

const SplitButtonExampleIconShorthand = () => <SplitButton menu={items} button={items[0]} />

export default SplitButtonExampleIconShorthand
