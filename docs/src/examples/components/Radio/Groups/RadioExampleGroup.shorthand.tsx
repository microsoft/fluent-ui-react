import React from 'react'
import { Divider, RadioGroup } from '@stardust-ui/react'

const items = [
  { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
  { name: 'pizza', key: 'Prosciutto', label: 'Prosciutto', value: 'prosciutto' },
  { name: 'pizza', key: 'Margherita', label: 'Margherita', value: 'margherita' },
]

class RadioGroupExample extends React.Component {
  state = { selectedValue: '' }
  handleChange = (e, props) => {
    this.setState({ selectedValue: props.value })
  }
  render() {
    const { selectedValue } = this.state
    return (
      <div>
        The selected value is: {selectedValue}
        <Divider />
        <RadioGroup defaultCheckedIndex={0} items={items} onChange={this.handleChange} />
      </div>
    )
  }
}
export default RadioGroupExample
