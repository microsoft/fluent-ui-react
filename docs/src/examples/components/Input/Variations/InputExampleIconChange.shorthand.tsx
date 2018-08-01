import React from 'react'
import { Input, Icon } from '@stardust-ui/react'

class InputExampleIconChangeShorthand extends React.Component<
  {},
  { icon: string; inputValue: string }
> {
  constructor() {
    super({})
    this.state = {
      icon: 'search',
      inputValue: '',
    }
  }

  public handleChange = (e, { value }) => {
    this.setState({
      icon: value ? 'close' : 'search',
      inputValue: value,
    })
  }

  public onIconClick = (e, value) => {
    if (value === 'close') {
      this.setState({
        icon: 'search',
        inputValue: '',
      })
    }
  }

  public render() {
    const { icon, inputValue } = this.state

    return (
      <Input
        icon={icon}
        placeholder="Search..."
        value={inputValue}
        onChange={this.handleChange}
        onIconClick={e => this.onIconClick(e, icon)}
      />
    )
  }
}

export default InputExampleIconChangeShorthand
