import { Toolbar, ToolbarMenuItemProps } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

const ToolbarExampleMenuItemCheckbox = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeIndexes, setActiveIndexes] = React.useState<number[]>([])

  const handleCheckboxClick = (e: React.SyntheticEvent, props: ToolbarMenuItemProps) => {
    if (_.includes(activeIndexes, props.index)) {
      setActiveIndexes(_.without(activeIndexes, props.index))
    } else {
      setActiveIndexes([...activeIndexes, props.index])
    }
  }

  return (
    <Toolbar
      items={[
        {
          key: 'more',
          active: menuOpen,
          icon: 'more',
          menu: [
            {
              key: 'bold',
              checked: _.includes(activeIndexes, 0),
              content: 'Bold',
              kind: 'checkbox',
              icon: 'bold',
              index: 0,
              onClick: handleCheckboxClick,
            },
            {
              key: 'italic',
              checked: _.includes(activeIndexes, 1),
              content: 'Italic',
              kind: 'checkbox',
              icon: 'italic',
              index: 1,
              onClick: handleCheckboxClick,
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

export default ToolbarExampleMenuItemCheckbox
