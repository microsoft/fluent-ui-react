import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleShorthand = () => (
  <Toolbar
    items={[
      { key: 'bold', icon: { name: 'bold', outline: true } },
      { key: 'italic', icon: { name: 'italic', outline: true } },
      { key: 'underline', icon: { name: 'underline', outline: true } },
      { key: 'strike', icon: { name: 'strike', outline: true } },
      { key: 'divider1', kind: 'divider' },
      { key: 'highlight', icon: { name: 'highlight', outline: true } },
      { key: 'font-color', icon: { name: 'font-color', outline: true } },
      { key: 'font-size', icon: { name: 'font-size', outline: true } },
      { key: 'paragraph', kind: 'button' },
      { key: 'remove-format', icon: { name: 'remove-format', outline: true } },
      { key: 'divider2', kind: 'divider' },
      { key: 'outdent', icon: { name: 'outdent', outline: true } },
      { key: 'indent', icon: { name: 'indent', outline: true } },
      { key: 'bullets', icon: { name: 'bullets', outline: true } },
      { key: 'number-list', icon: { name: 'number-list', outline: true } },
      { key: 'divider3', kind: 'divider' },
      { key: 'more', icon: { name: 'more', outline: true } },
    ]}
  />
)

export default ToolbarExampleShorthand
