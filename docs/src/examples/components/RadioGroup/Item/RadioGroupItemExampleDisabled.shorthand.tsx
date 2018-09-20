import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const RadioGroupItemExampleDisabledShorthand = () => (
  <RadioGroup
    items={[
      <RadioGroup.Item label="Disabled" value="1" disabled />,
      <RadioGroup.Item label="Enabled" value="2" />,
    ]}
  />
)

export default RadioGroupItemExampleDisabledShorthand
