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

const SplitButtonIconAndContentExampleShorthand = () => (
  <div>
    <SplitButton
      menu={items}
      button={{
        content: items[0],
        'aria-roledescription': 'splitbutton',
        'aria-describedby': 'instruction-message-icon-content',
      }}
      toggleButton={{ 'aria-label': 'more options' }}
    />
    <span aria-hidden="true" id="instruction-message-icon-content" style={{ opacity: 0 }}>
      {' '}
      to open menu, press Alt + Arrrow Down{' '}
    </span>
  </div>
)

export default SplitButtonIconAndContentExampleShorthand
