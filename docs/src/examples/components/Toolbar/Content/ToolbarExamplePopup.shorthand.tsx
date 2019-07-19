import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExamplePopupShorthand = () => {
  const [highlightOpen, setHighlightOpen] = React.useState(false)
  const [fontColorActive, setFontColorActive] = React.useState(false)
  return (
    <Toolbar
      items={[
        {
          key: 'highlight',
          icon: { name: 'highlight', outline: true },
          active: highlightOpen,
          popup: {
            content: <p>This is a popup</p>,
            onOpenChange: (e, { open }) => {
              setHighlightOpen(open)
            },
            open: highlightOpen,
          },
        },
        {
          key: 'font-color',
          icon: { name: 'font-color', outline: true },
          active: fontColorActive,
          popup: {
            content: <p>This is another popup</p>,
            onOpenChange: () => {
              setFontColorActive(!fontColorActive)
            },
          },
        },
      ]}
    />
  )
}

export default ToolbarExamplePopupShorthand
