import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Toolbar } from '@stardust-ui/react'
import * as React from 'react'

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = useBooleanKnob({ name: 'menuOpen', initialValue: false })

  return (
    <Toolbar
      items={[
        {
          key: 'more',
          icon: 'more',
          active: menuOpen,
          menu: [
            {
              key: 'group',
              kind: 'checkbox-group',
              items: [
                { key: 'bold', content: 'Bold', icon: 'bold' },
                { key: 'italic', content: 'Italic', icon: 'italic' },
              ],
            },
            { key: 'divider', kind: 'divider' },
            'About...',
          ],
          menuOpen,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenuOpen(menuOpen)
          },
        },
      ]}
    />
  )
}

export default ToolbarExampleMenuShorthand
