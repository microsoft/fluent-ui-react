import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const handleChange = (e, params) => {
  console.log('The selected value is changed', e, params)
}

const radios = [
  { key: '1', name: 'pizza', label: 'Capricciosa', value: 'Capricciosa' },
  { key: '2', name: 'pizza', label: 'Prosciutto', value: 'Prosciutto' },
  { key: '3', name: 'pizza', label: 'Margherita', value: 'Margherita' },
]

const RadioExampleGroupShorthand = () => (
  <React.Fragment>
    Choose your pizza:
    <RadioGroup defaultSelectedValue="Prosciutto" onChange={handleChange} radios={radios} />
  </React.Fragment>
)

export default RadioExampleGroupShorthand
