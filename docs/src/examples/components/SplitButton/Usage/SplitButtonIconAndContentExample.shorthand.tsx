import * as React from 'react'
import { Flex, SplitButton } from '@stardust-ui/react'

class SplitButtonExampleShorthand extends React.Component {
  items = [
    {
      key: 'pdf',
      content: 'Export to PDF',
      icon: 'files-pdf',
    },
    {
      key: 'pds',
      content: 'Export to PDS',
      icon: 'files-photoshop',
    },
    {
      key: 'gif',
      content: 'Export as GIF',
      icon: 'files-gif',
      disabled: true,
    },
    {
      key: 'eps',
      content: 'Export to EPS',
      icon: 'files-illustrator',
    },
  ]
  state = {
    index: 0,
    message: 'Use to export your work:',
  }

  handleClick = () => {
    this.setState({ message: 'Exported successfuly!' })
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
