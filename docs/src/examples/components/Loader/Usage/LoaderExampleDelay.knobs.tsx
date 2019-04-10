import * as React from 'react'
import Knobs from 'docs/src/components/Knobs/Knobs'

type LoaderExampleLoaderKnobsProps = {
  mounted?: boolean
  onKnobChange: () => void
}

const LoaderExampleLoaderKnobs: React.FC<LoaderExampleLoaderKnobsProps> = props => {
  const { mounted, onKnobChange } = props

  return (
    <Knobs>
      <Knobs.Boolean name="mounted" onChange={onKnobChange} value={mounted} />
    </Knobs>
  )
}

LoaderExampleLoaderKnobs.defaultProps = {
  mounted: true,
}

export default LoaderExampleLoaderKnobs
