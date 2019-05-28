import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleShorthand = () => (
  <Toolbar
    items={[
      { icon: { name: 'bold', outline: true } },
      { icon: { name: 'italic', outline: true } },
      { icon: { name: 'underline', outline: true } },
      { icon: { name: 'strike', outline: true } },
      { kind: 'divider' },
      { icon: { name: 'highlight', outline: true } },
      { icon: { name: 'font-color', outline: true } },
      { icon: { name: 'font-size', outline: true } },
      { kind: 'button' },
      { icon: { name: 'remove-format', outline: true } },
      { kind: 'divider' },
      { icon: { name: 'outdent', outline: true } },
      { icon: { name: 'indent', outline: true } },
      { icon: { name: 'bullets', outline: true } },
      { icon: { name: 'number-list', outline: true } },
      { kind: 'divider' },
      { icon: { name: 'more', outline: true } },
    ]}
  />
)

export default ToolbarExampleShorthand
