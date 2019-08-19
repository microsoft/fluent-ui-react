import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

class SplitButtonExampleShorthand extends React.Component {
  items = [
    {
      content: 'Export to PDF',
      icon: 'files-pdf',
      onClick: () => {
        this.setState({ index: 0 })
      },
    },
    {
      content: 'Export to PDS',
      icon: 'files-photoshop',
      onClick: () => {
        this.setState({ index: 1 })
      },
    },
    {
      content: 'Export as GIF',
      icon: 'files-gif',
      disabled: true,
    },
    {
      content: 'Export to EPS',
      icon: 'files-illustrator',
      onClick: () => {
        this.setState({ index: 3 })
      },
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
    return (
      <>
        <div>{this.state.message}</div>
        <SplitButton
          onClick={this.handleClick}
          onMenuItemClick={this.handleClick}
          menu={this.items}
          button={this.items[this.state.index]}
        />
      </>
    )
  }
}

export default SplitButtonExampleShorthand
