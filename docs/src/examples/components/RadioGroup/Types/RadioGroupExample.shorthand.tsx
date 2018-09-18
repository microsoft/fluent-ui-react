import React from 'react'
import { Divider, RadioGroup } from '@stardust-ui/react'
const props = [
  { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
  { name: 'pizza', key: 'Prosciutto', label: 'Prosciutto', value: 'prosciutto', disabled: true },
  {
    name: 'pizza',
    key: 'Margherita',
    label: 'Margherita',
    value: 'margherita',
  },
]
const items = [
  <RadioGroup.Item {...props[0]} />,
  <RadioGroup.Item {...props[1]} />,
  <RadioGroup.Item {...props[2]} />,
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
        <RadioGroup
          defaultCheckedValue="capricciosa"
          items={items}
          checkedValueChanged={this.handleChange}
        />
      </div>
    )
  }
}
export default RadioGroupExample
