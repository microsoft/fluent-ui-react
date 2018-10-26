import React from 'react'
import { Divider, RadioGroup } from '@stardust-ui/react'

class RadioGroupColorPickerExample extends React.Component {
  createIcon = value => {
    const { selectedValue } = this.state
    const isSelected = selectedValue === value
    return {
      variables: {
        backgroundColor: value,
        borderColor: 'white',
        ...(isSelected && {
          borderColor: 'black',
        }),
      },
      css: {
        borderRadius: '3px',
        ...(isSelected && {
          backgroundClip: 'content-box',
          padding: '2px',
        }),
      },
    }
  }

  items = () => {
    const colors = ['pink', 'blue', 'green', 'red', 'orange']
    return colors.map(color => (
      <RadioGroup.Item
        value={color}
        icon={this.createIcon(color)}
        name={color}
        key={color}
        aria-label={color}
      />
    ))
  }

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
          defaultCheckedValue="pink"
          items={this.items()}
          checkedValueChanged={this.handleChange}
        />
      </div>
    )
  }
}
export default RadioGroupColorPickerExample
