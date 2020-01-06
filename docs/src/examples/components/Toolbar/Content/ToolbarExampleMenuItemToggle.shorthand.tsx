import { Toolbar, ToolbarMenuItemProps } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'

const ToolbarExampleMenuItemToggle = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeIndexes, setActiveIndexes] = React.useState<number[]>([])

  const handleToggleClick = (e: React.SyntheticEvent, props: ToolbarMenuItemProps) => {
    if (_.includes(activeIndexes, props.index)) {
      setActiveIndexes(_.without(activeIndexes, props.index))
    } else {
      setActiveIndexes([...activeIndexes, props.index])
    }
  }

  return (
    <Toolbar
      aria-label="Toolbar can contain toggle items in a menu"
      items={[
        {
          key: 'more',
          active: menuOpen,
          icon: { name: 'more' },
          title: 'More',
          menu: [
            {
              key: 'bold',
              active: _.includes(activeIndexes, 0),
              content: 'Bold',
              kind: 'toggle',
              icon: { name: 'bold' },
              index: 0,
              onClick: handleToggleClick,
            },
            {
              key: 'italic',
              active: _.includes(activeIndexes, 1),
              content: 'Italic',
              kind: 'toggle',
              icon: { name: 'italic' },
              index: 1,
              onClick: handleToggleClick,
            },
            { key: 'divider', kind: 'divider' },
            'About...',
          ],
          menuOpen,
          onMenuOpenChange: (e, { menuOpen }) => setMenuOpen(menuOpen),
        },
      ]}
    />
  )
}

export default ToolbarExampleMenuItemToggle
