import * as React from 'react'
import { Menu, Tooltip } from '@fluentui/react'

const itemRenderer = (MenuItem, props) => {
  const { tooltip = '', ...rest } = props

  return (
    <Tooltip content={tooltip}>
      <MenuItem {...rest} />
    </Tooltip>
  )
}
const items = [
  {
    key: 'editorials',
    content: 'Editorials',
    tooltip: 'Click for opening Editorials',
    children: itemRenderer,
  },
  {
    key: 'review',
    content: 'Reviews',
    tooltip: 'Click for opening Reviews',
    children: itemRenderer,
  },
  {
    key: 'events',
    content: 'Upcoming Events',
    tooltip: 'Click for opening Upcoming Events',
    children: itemRenderer,
  },
]

const MenuExampleWithTooltip = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExampleWithTooltip
