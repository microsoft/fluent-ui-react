import { createCallbackLogFormatter } from '@stardust-ui/code-sandbox'
import { useBooleanKnob, useLogKnob } from '@stardust-ui/docs-components'
import { Toolbar } from '@stardust-ui/react'
import * as React from 'react'

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = useBooleanKnob({ initialValue: false, name: 'menuOpen' })

  const onItemClick = useLogKnob('onItemClick', null, createCallbackLogFormatter(['content']))
  const onMenuOpenChange = useLogKnob(
    'onItemClick',
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
          menu: {
            items: [
              { key: 'play', content: 'Play', icon: 'play' },
              { key: 'pause', content: 'Pause', icon: 'pause' },
              { key: 'divider', kind: 'divider' },
              'Without icon',
            ],
            onItemClick,
          },
          menuOpen,
          onMenuOpenChange,
        },
      ]}
    />
  )
}

export default ToolbarExampleMenuShorthand
