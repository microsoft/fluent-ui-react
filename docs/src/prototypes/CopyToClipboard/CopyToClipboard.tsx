import * as React from 'react'
import { Popup, Button, Text, Portal, Ref } from '@stardust-ui/react/src'
import * as copyToClipboard from 'copy-to-clipboard'

export type CopyToClipboardProps = {
  timeout?: number
  value: string
  attached?: boolean
}

class CopyToClipboard extends React.Component<CopyToClipboardProps> {
  state = {
    copied: false,
    copiedHeight: 0,
    copiedWidth: 0,
  }
  timeoutId = undefined
  copiedTextRef = React.createRef<HTMLElement>()

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

  componentDidMount() {
    if (this.copiedTextRef.current === null) {
      return
    }
    this.setState({
      copiedHeight: this.copiedTextRef.current.clientHeight,
      copiedWidth: this.copiedTextRef.current.clientWidth,
    })
  }

  render() {
    const { attached } = this.props
    const hideContent = this.state.copied && !attached
    const copiedStr = 'Copied to clipboard'
    const copiedText = hideContent ? (
      <Text size={hideContent ? 'larger' : 'medium'} styles={{ padding: '5px 5px 5px 5px' }}>
        {copiedStr}
      </Text>
    ) : (
      <Text>{copiedStr}</Text>
    )
    const copyText = <Text>Copy commit ID</Text>
    let popupContent = this.state.copied ? copiedText : copyText
    if (hideContent) {
      popupContent = <Text />
    }
    const button = (
      <Button
        icon="clipboard-copied-to"
        iconOnly
        onClick={this.handleClick}
        variables={siteVariables => ({
          colorHover: !this.state.copied && siteVariables.colors.brand[400],
        })}
      />
    )
    const hiddenPopupVariables = {
      contentBackgroundColor: 'transparent',
    }
    const hiddenPopupContentVariables = {
      boxShadow: 'none',
      borderColor: 'transparent',
    }
    return (
      <>
        <Popup
          pointing
          position="below"
          align="center"
          trigger={button}
          content={{
            content: popupContent,
            variables: {
              ...(hideContent && hiddenPopupContentVariables),
            },
          }}
          on={['hover', 'context']}
          variables={siteVariables => ({
            contentColor: this.state.copied
              ? siteVariables.colorScheme.brand.foreground4
              : siteVariables.colors.black,
            contentBackgroundColor: this.state.copied
              ? siteVariables.colorScheme.brand.background4
              : siteVariables.colors.white,
            ...(hideContent && hiddenPopupVariables),
          })}
        />
        {hideContent && (
          <Portal
            open={true}
            content={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'fixed',
                  backgroundColor: 'black',
                  color: 'white',
                  zIndex: 1000,
                  top: `calc(50% - ${this.state.copiedHeight / 2}px)`,
                  left: `calc(50% - ${this.state.copiedWidth / 2}px)`,
                }}
              >
                <Ref innerRef={this.copiedTextRef}>{copiedText}</Ref>
              </div>
            }
          />
        )}
      </>
    )
  }
}

export default CopyToClipboard
