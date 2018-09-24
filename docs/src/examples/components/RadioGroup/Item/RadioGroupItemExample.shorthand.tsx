import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const handleChange = () => {
  alert('The radio checked value was changed!')
}

const RadioGroupItemExample = () => (
  <RadioGroup
    items={[
      <RadioGroup.Item label="Make your choice" value="1" checkedChanged={handleChange} />,
      <RadioGroup.Item label="Another option" value="2" checkedChanged={handleChange} />,
    ]}
  />
)

export default RadioGroupItemExample
