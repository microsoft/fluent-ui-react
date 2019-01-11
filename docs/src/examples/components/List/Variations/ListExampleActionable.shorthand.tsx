import * as React from 'react'
import { List, Status, navigableListBehavior, navigableListItemBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'irving',
    media: <Status color="green" icon="check" title="Available" />,
    header: 'Irving Kuhic',
    itemWrapper: {
      accessibility: navigableListItemBehavior,
      tabIndex: 0,
      role: 'button',
      onClick: () => alert('onClick'),
    },
  },
  {
    key: 'skyler',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Skyler Parks',
    itemWrapper: {
      accessibility: navigableListItemBehavior,
      tabIndex: 0,
      role: 'button',
      onClick: () => alert('onClick'),
    },
  },
  {
    key: 'dante',
    media: <Status color="red" icon="minus" title="Busy" />,
    header: 'Dante Schneider',
    itemWrapper: {
      accessibility: navigableListItemBehavior,
      tabIndex: 0,
      role: 'button',
      onClick: () => alert('onClick'),
    },
  },
]

const ListExample = ({ knobs }) => (
  <div style={{ width: knobs.width }}>
    <List accessibility={navigableListBehavior} items={items} />
  </div>
)

export default ListExample
