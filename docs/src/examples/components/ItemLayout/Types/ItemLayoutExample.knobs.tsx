import * as PropTypes from 'prop-types'
import * as React from 'react'

import Knobs from 'docs/src/components/Knobs/Knobs'

const LayoutExampleGapKnobs: any = props => {
  const { onKnobChange, debug } = props

  return (
    <Knobs>
      <Knobs.Boolean name="debug" value={debug} onChange={onKnobChange} />
    </Knobs>
  )
}

LayoutExampleGapKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  debug: PropTypes.bool,
}

LayoutExampleGapKnobs.defaultProps = {
  debug: false,
}

export default LayoutExampleGapKnobs
