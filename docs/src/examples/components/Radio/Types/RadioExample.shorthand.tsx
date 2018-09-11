import React from 'react'
import { Radio } from '@stardust-ui/react'

const handleChange = () => {
  alert('The radio checked value was changed!')
}

const RadioExample = () => <Radio label="Make your choice" onChange={handleChange} />

export default RadioExample
