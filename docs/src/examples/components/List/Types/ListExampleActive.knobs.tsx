import PropTypes from 'prop-types'
import React from 'react'
import Knobs from 'docs/src/components/Knobs/Knobs'

const ListExampleActiveKnobs: any = props => {
  const { onKnobChange, active } = props

  return (
    <Knobs>
      <Knobs.Boolean name="active" value={active} onChange={onKnobChange} />
    </Knobs>
  )
}

ListExampleActiveKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

ListExampleActiveKnobs.defaultProps = {
  active: true,
}

export default ListExampleActiveKnobs
