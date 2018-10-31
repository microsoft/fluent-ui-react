import * as React from 'react'

interface KnobsLabelProps {
  name: string
  value: string
}

const KnobsLabel: React.SFC<KnobsLabelProps> = ({ name, value }) => (
  <span>
    {name}: {JSON.stringify(value, null, 2)},
  </span>
)

export default KnobsLabel
