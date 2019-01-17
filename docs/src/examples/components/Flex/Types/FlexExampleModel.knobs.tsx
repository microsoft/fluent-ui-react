import * as PropTypes from 'prop-types'
import * as React from 'react'

import Knobs from 'docs/src/components/Knobs/Knobs'

const LayoutExampleGapKnobs: any = props => {
  const { onKnobChange, leftAreaGap, rightAreaGap } = props

  return (
    <Knobs>
      <Knobs.Scalar name="leftAreaGap" value={leftAreaGap} onChange={onKnobChange} />
      <Knobs.Scalar name="rightAreaGap" value={rightAreaGap} onChange={onKnobChange} />
    </Knobs>
  )
}

LayoutExampleGapKnobs.propTypes = {
  onKnobChange: PropTypes.func.isRequired,
  leftAreaGap: PropTypes.string,
  rightAreaGap: PropTypes.string,
}

LayoutExampleGapKnobs.defaultProps = {
  leftAreaGap: '2rem',
  rightAreaGap: '1rem',
}

export default LayoutExampleGapKnobs
