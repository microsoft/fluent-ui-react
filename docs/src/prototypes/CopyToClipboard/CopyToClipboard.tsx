import * as React from 'react'
import { Popup, Button, Text } from '@stardust-ui/react/src'

class CopyToClipboard extends React.Component {
  state = {
    popupContent: 'Copy commit ID',
  }

  handleClick = () => {
    this.setState({
      popupContent: 'Copied to clipboard',
    })
  }

  render() {
    return (
      <Popup
        pointing
        position="below"
        align="center"
        trigger={<Button icon="clipboard-copied-to" iconOnly onClick={this.handleClick} />}
        content={<Text>{this.state.popupContent}</Text>}
        on={['hover', 'context']}
      />
    )
  }
}

export default CopyToClipboard
