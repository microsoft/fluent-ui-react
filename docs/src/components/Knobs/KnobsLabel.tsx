import * as React from 'react'

interface IKnobsLabelProps {
  name: string
  value: string
}

const KnobsLabel: React.SFC<IKnobsLabelProps> = ({ name, value }) => (
  <span>
    {name}: {JSON.stringify(value, null, 2)},
  </span>
)

export default KnobsLabel
