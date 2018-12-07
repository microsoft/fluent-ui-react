import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'
import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsShowTransparent: React.SFC = ({ active, onClick }: any) => (
  <Menu.Item
    active={active}
    onClick={onClick}
    content={<LabelledButton iconName="adjust" label="Transparent" active={active} />}
  />
)

ComponentControlsShowTransparent.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowTransparent)
