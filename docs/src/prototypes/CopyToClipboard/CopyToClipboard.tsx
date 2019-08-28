import * as React from 'react'
import { Popup, Button, Text } from '@stardust-ui/react/src'
import * as copyToClipboard from 'copy-to-clipboard'

export type CopyToClipboardProps = {
  timeout?: number
  value: string
}

class CopyToClipboard extends React.Component<CopyToClipboardProps> {
  state = {
    copied: false,
  }
  timeoutId = undefined

  handleClick = () => {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId)
    }
    const { timeout, value } = this.props
    this.setState({
      copied: true,
    })
    this.timeoutId = setTimeout(() => {
      this.setState({ copied: false })
    }, timeout)
    copyToClipboard(value)
  }

  render() {
    return (
      <Popup
        pointing
        position="below"
        align="center"
        trigger={
          <Button
            icon="clipboard-copied-to"
            iconOnly
            onClick={this.handleClick}
            variables={siteVariables => ({
              colorHover: !this.state.copied && siteVariables.colors.brand[400],
            })}
          />
        }
        content={<Text>{this.state.copied ? 'Copied to clipboard' : 'Copy commit ID'}</Text>}
        on={['hover', 'context']}
      />
    )
  }
}

export default CopyToClipboard
