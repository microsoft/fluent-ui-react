import * as React from 'react'

import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsMaximize: any = () => (
  <LabelledButton iconName="external alternate" label="Popout" active={false} />
)

export default updateForKeys(['examplePath'])(ComponentControlsMaximize)
/*
const ComponentControlsMaximize: any = ({ examplePath, rtl }) => (
  <Menu.Item
    as={NavLink}
    to={`/maximize/${_.kebabCase(examplePath.split('/').slice(-1))}/${rtl}`}
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

export default updateForKeys(['examplePath', 'rtl'])(ComponentControlsMaximize)
*/
