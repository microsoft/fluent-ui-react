import * as PropTypes from 'prop-types'
import * as React from 'react'
import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsShowTransparent: React.SFC = ({ active }: any) => (
  <LabelledButton iconName="adjust" label="Transparent" active={active} />
)

ComponentControlsShowTransparent.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default updateForKeys(['active'])(ComponentControlsShowTransparent)
