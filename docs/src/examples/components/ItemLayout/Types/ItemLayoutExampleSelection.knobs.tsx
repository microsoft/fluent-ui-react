import * as PropTypes from 'prop-types'
import * as React from 'react'
import Knobs from 'docs/src/components/Knobs/Knobs'

const ItemLayoutExampleSelectionKnobs: any = props => {
  const { onKnobChange, selection } = props

  return (
    <Knobs>
      <Knobs.Boolean name="selection" value={selection} onChange={onKnobChange} />
    </Knobs>
  )
}

ItemLayoutExampleSelectionKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  selection: PropTypes.bool,
}

ItemLayoutExampleSelectionKnobs.defaultProps = {
  selection: true,
}

export default ItemLayoutExampleSelectionKnobs
