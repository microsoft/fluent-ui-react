import * as React from 'react'
import { List, Status } from '@stardust-ui/react'

const items = [
  {
    key: 'irving',
    media: <Status state="error" icon="minus" />,
    header: 'Irving Kuhic',
  },
  {
    key: 'skyler',
    media: <Status state="success" icon="check" />,
    header: 'Skyler Parks',
  },
  {
    key: 'dante',
    media: <Status />,
    header: 'Dante Schneider',
  },
]

const ListExampleSelectable = () => (
  <List selectable defaultSelectedIndex={0} items={items} vertical={false} />
)

export default ListExampleSelectable
