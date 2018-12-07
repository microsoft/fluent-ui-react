import * as _ from 'lodash'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'
import { NavLink } from 'react-router-dom'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsMaximize: any = ({ examplePath, onClick }) => (
  <Menu.Item
    as={NavLink}
    to={`/maximize/${_.kebabCase(examplePath.split('/').slice(-1))}`}
    target="_blank"
    rel="noopener noreferrer"
  />
)

export default updateForKeys(['examplePath'])(ComponentControlsMaximize)
