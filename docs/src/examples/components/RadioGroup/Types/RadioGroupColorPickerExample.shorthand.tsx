import * as React from 'react'
import { Divider, RadioGroup } from '@fluentui/react'

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
            icon: {
              name: 'icon-circle',
              variables: {
                color,
              },
            },
          }))}
          onCheckedValueChange={(e, props) => this.setState({ selectedValue: props.value })}
        />
      </div>
    )
  }
}

export default RadioGroupColorPickerExample
