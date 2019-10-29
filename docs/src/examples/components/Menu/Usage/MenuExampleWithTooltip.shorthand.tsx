import * as React from 'react'
import { Menu, Tooltip } from '@stardust-ui/react'

const items = [
  { key: 'editorials', content: 'Editorials', tooltip: 'Click for opening Editorials' },
  { key: 'review', content: 'Reviews', tooltip: 'Click for opening Reviews' },
  { key: 'events', content: 'Upcoming Events', tooltip: 'Click for opening Upcoming Events' },
]

const MenuExampleWithTooltip = () => (
  <Menu
    defaultActiveIndex={0}
    items={items.map(item => render =>
      render(
        /* what to render */
        item,

        /* how to render */
        (MenuItem, props) => {
          const { tooltip = '', ...rest } = props || {}
          return (
            <Tooltip content={tooltip}>
              <MenuItem {...rest} />
            </Tooltip>
          )
        },
      ),
    )}
  />
)

export default MenuExampleWithTooltip
