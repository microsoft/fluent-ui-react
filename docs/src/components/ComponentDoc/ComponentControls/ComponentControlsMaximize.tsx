import * as _ from 'lodash'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsMaximize: any = ({ examplePath, onClick }) => (
  <Menu.Item
    onClick={onClick}
    styles={{
      root: {
        display: 'grid',
        textAlign: 'center',
      },
    }}
    icon={{
      styles: { root: { color: 'grey', marginBottom: '10px' } },
      size: 'large',
      name: 'window maximize',
      xspacing: 'both',
    }}
    content="Maximize"
    examplePath={examplePath}
  />
)

export default updateForKeys(['examplePath'])(ComponentControlsMaximize)
