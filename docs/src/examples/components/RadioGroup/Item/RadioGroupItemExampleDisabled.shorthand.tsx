import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const RadioGroupItemExampleDisabledShorthand = () => (
  <RadioGroup
    items={[
      <RadioGroup.Item key="1" label="Disabled" value="1" disabled />,
      <RadioGroup.Item key="2" label="Enabled" value="2" />,
    ]}
  />
)

export default RadioGroupItemExampleDisabledShorthand
