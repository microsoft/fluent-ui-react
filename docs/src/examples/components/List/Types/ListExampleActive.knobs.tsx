import PropTypes from 'prop-types'
import React from 'react'
import Knobs from 'docs/src/components/Knobs/Knobs'

const ListExampleSelectedKnobs: any = props => {
  const { onKnobChange, active } = props

  return (
    <Knobs>
      <Knobs.Boolean name="active" value={active} onChange={onKnobChange} />
    </Knobs>
  )
}

ListExampleSelectedKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

ListExampleSelectedKnobs.defaultProps = {
  active: true,
}

export default ListExampleSelectedKnobs
