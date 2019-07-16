import * as React from 'react'
import * as _ from 'lodash'
import { ResponsiveToolbar } from '@stardust-ui/react'

const icons = ['bold', 'italic', 'underline']

const ToolbarExampleOverflow = () => (
  <ResponsiveToolbar
    items={[
      ..._.times(10, i => ({ key: `a${i}`, icon: icons[i % icons.length] })),
      {
        kind: 'group',
        key: 'group',
        items: _.times(5, i => ({ key: `g${i}`, icon: icons[i % icons.length] })),
      },
      ..._.times(20, i => ({ key: `b${i}`, icon: icons[i % icons.length] })),
    ]}
    reduceItems={(items, measurements) => {
      return items.slice(0, -1)
    }}
  />
)

export default ToolbarExampleOverflow
