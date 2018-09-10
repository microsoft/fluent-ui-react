import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const handleChange = (e, params) => {
  console.log('The selected value is changed', e, params)
}

const radios = [
  { key: '1', name: 'pizza', label: 'Capricciosa', value: '1' },
  { key: '2', name: 'pizza', label: 'Prosciutto', value: '2' },
  { key: '3', name: 'pizza', label: 'Margherita', value: '3' },
]

const RadioExampleGroupShorthand = () => (
  <React.Fragment>
    Choose your pizza:
    <RadioGroup defaultSelectedValue="2" onChange={handleChange} radios={radios} />
  </React.Fragment>
)

export default RadioExampleGroupShorthand
