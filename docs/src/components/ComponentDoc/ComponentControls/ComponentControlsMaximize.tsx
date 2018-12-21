import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { updateForKeys } from 'docs/src/hoc'

const ComponentControlsMaximize: any = ({ examplePath }) => (
  <Menu.Item
    as={NavLink}
    to={`/maximize/${_.kebabCase(examplePath.split('/').slice(-1))}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon color="grey" fitted name="external alternate" size="large" />
    Popout
  </Menu.Item>
)

ComponentControlsMaximize.propTypes = {
  examplePath: PropTypes.string.isRequired,
}

export default updateForKeys(['examplePath'])(ComponentControlsMaximize)
