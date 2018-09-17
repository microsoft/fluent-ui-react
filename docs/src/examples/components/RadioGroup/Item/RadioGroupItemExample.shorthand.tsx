import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const handleChange = () => {
  alert('The radio checked value was changed!')
}

const RadioGroupItemExample = () => (
  <RadioGroup.Item label="Make your choice" onChange={handleChange} />
)

export default RadioGroupItemExample
