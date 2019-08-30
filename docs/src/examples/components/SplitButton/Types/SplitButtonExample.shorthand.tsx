import * as React from 'react'
import { Flex, SplitButton } from '@stardust-ui/react'

class SplitButtonExampleShorthand extends React.Component {
  items = [
    {
      key: 'conversation',
      content: 'New conversation',
    },
    {
      key: 'group',
      content: 'New group message',
    },
    {
      key: 'channel',
      content: 'New channel message',
    },
  ]
  state = {
    index: 0,
    message: 'Send a message',
  }

  handleClick = () => {
    this.setState({ message: 'Great! Now start writing your message.' })
  }

  render() {
    const { index, message } = this.state
    const filteredItems = [...this.items.slice(0, index), ...this.items.slice(index + 1)]
    return (
      <>
        <div>{message}</div>
        <Flex gap="gap.small">
          <SplitButton
            onMainButtonClick={this.handleClick}
            onMenuItemClick={this.handleClick}
            menu={filteredItems}
            button={this.items[index]}
          />
          <SplitButton
            onMainButtonClick={this.handleClick}
            onMenuItemClick={this.handleClick}
            menu={filteredItems}
            button={this.items[index]}
            primary
          />
        </Flex>
      </>
    )
  }
}

export default SplitButtonExampleShorthand
