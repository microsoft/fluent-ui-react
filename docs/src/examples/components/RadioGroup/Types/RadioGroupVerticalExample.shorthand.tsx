import * as React from 'react'
import { Divider, RadioGroup, Input, Text } from '@fluentui/react'

class RadioGroupVerticalExample extends React.Component {
  state = { selectedValue: '', inputTabIndex: '-1' }

  render() {
    const { selectedValue } = this.state
    return (
      <div style={{ maxWidth: '400px' }}>
        The selected value is: {selectedValue}
        <Divider />
        <RadioGroup
          vertical
          defaultCheckedValue="prosciutto"
          items={this.getItems()}
          onCheckedValueChange={this.handleChange}
        />
      </div>
    )
  }

  getItems() {
    return [
      {
        name: 'pizza',
        key: 'Capricciosa',
        label: 'Capricciosa',
        value: 'capricciosa',
      },
      {
        name: 'pizza',
        key: 'Prosciutto',
        label: 'Prosciutto',
        value: 'prosciutto',
        disabled: true,
      },
      {
        name: 'pizza',
        key: 'Pepperoni',
        label: 'Pepperoni',
        value: 'pepperoni',
      },
      {
        name: 'pizza',
        key: 'Custom',
        label: (
          <Text>
            Choose your own{' '}
            <Input
              input={{ tabIndex: this.state.inputTabIndex }}
              inline
              styles={{
                fontSize: '12px',
                '& .ui-input__input': {
                  padding: '2px 8px',
                },
              }}
              placeholder="flavour"
            />
          </Text>
        ),
        value: 'custom',
        checkedChanged: this.handleCustomCheckedChange,
        'aria-label': 'Press Tab to change flavour',
      },
    ]
  }

  handleChange = (e, props) => this.setState({ selectedValue: props.value })

  handleCustomCheckedChange = (e, props) =>
    this.setState({ inputTabIndex: props.checked ? '0' : '-1' })
}

export default RadioGroupVerticalExample
