import * as React from 'react'
import { Divider, RadioGroup } from '@stardust-ui/react'

class RadioGroupColorPickerExample extends React.Component {
  state = { selectedValue: '' }

  render() {
    const { selectedValue } = this.state
    return (
      <div>
        The selected value is: {selectedValue}
        <Divider />
        <RadioGroup
          defaultCheckedValue="pink"
          items={['pink', 'blue', 'green', 'red', 'orange'].map(color => ({
            key: color,
            value: color,
            name: color,
            'aria-label': color,
            icon: this.createIcon(color),
          }))}
          checkedValueChanged={(e, props) => this.setState({ selectedValue: props.value })}
        />
      </div>
    )
  }

  createIcon(value) {
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
      styles: {
        borderRadius: '3px',
        ...(isSelected && {
          backgroundClip: 'content-box',
          padding: '2px',
        }),
      },
    }
  }
}

export default RadioGroupColorPickerExample
