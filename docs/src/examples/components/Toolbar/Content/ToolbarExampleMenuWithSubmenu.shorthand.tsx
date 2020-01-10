import { createCallbackLogFormatter } from '@fluentui/code-sandbox'
import { useLogKnob } from '@fluentui/docs-components'
import { Toolbar } from '@fluentui/react'
import * as React from 'react'

const ToolbarExampleMenuWithSubmenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const onMenuOpenChange = useLogKnob(
    'onMenuOpenChange',
    (e, { menuOpen }) => setMenuOpen(menuOpen),
    createCallbackLogFormatter(['menuOpen']),
  )

  return (
    <Toolbar
      items={[
        {
          key: 'more',
          icon: 'more',
          active: menuOpen,
          menu: [
            {
              key: 'play',
              content: 'Play',
              icon: 'play',
              menu: {
                items: [
                  'Play with audio',
                  { content: 'Play with video', key: 'playVideo', menu: ['HD', 'Full HD'] },
                ],
              },
            },
            { key: 'pause', content: 'Pause', icon: 'pause' },
            { key: 'divider', kind: 'divider' },
            'Without icon',
          ],
          menuOpen,
          onMenuOpenChange,
        },
      ]}
    />
  )
}

export default ToolbarExampleMenuWithSubmenuShorthand
