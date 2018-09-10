import React from 'react'
import { Radio, Divider } from '@stardust-ui/react'

class RadioExample extends React.Component {
  state = { selectedValue: '' }

  handleChange = (e, props) => {
    this.setState({ selectedValue: props.value })
  }

  render() {
    const { selectedValue } = this.state
    return (
      <div role="radiogroup">
        The selected value is: {selectedValue}
        <Divider />
        <Radio
          label="Capricciosa"
          name="pizza"
          value="Capricciosa"
          onChange={this.handleChange}
          checked={selectedValue === 'Capricciosa'}
        />{' '}
        <br />
        <Radio
          label="Prosciutto"
          name="pizza"
          value="Prosciutto"
          onChange={this.handleChange}
          checked={selectedValue === 'Prosciutto'}
        />{' '}
        <br />
        <Radio
          label="Margherita"
          name="pizza"
          value="Margherita"
          onChange={this.handleChange}
          checked={selectedValue === 'Margherita'}
        />
      </div>
    )
  }
}

export default RadioExample
