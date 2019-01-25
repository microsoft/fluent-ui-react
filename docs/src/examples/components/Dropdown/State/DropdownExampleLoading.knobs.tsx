import * as React from 'react'
import Knobs from 'docs/src/components/Knobs/Knobs'

type DropdownExampleLoadingKnobsProps = {
  loading?: boolean
  onKnobChange: () => void
}

const DropdownExampleLoadingKnobs: React.FC<DropdownExampleLoadingKnobsProps> = props => {
  const { loading, onKnobChange } = props

  return (
    <Knobs>
      <Knobs.Boolean name="loading" onChange={onKnobChange} value={loading} />
    </Knobs>
  )
}

DropdownExampleLoadingKnobs.defaultProps = {
  loading: true,
}

export default DropdownExampleLoadingKnobs
