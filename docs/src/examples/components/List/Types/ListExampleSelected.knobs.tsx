import PropTypes from 'prop-types'
import React from 'react'
import Knobs from 'docs/src/components/Knobs/Knobs'

const ListExampleSelectedKnobs: any = props => {
  const { onKnobChange, selected } = props

  return (
    <Knobs>
      <Knobs.Boolean name="selected" value={selected} onChange={onKnobChange} />
    </Knobs>
  )
}

ListExampleSelectedKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
}

ListExampleSelectedKnobs.defaultProps = {
  selected: true,
}

export default ListExampleSelectedKnobs
