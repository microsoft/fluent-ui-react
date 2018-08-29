import * as _ from 'lodash'
import PropTypes from 'prop-types'
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
    <Icon color="grey" fitted name="window maximize" size="large" />
    Maximize
  </Menu.Item>
)

ComponentControlsMaximize.propTypes = {
  examplePath: PropTypes.string.isRequired,
}

export default updateForKeys(['examplePath'])(ComponentControlsMaximize)
