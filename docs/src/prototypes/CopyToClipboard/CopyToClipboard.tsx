import * as React from 'react'
import { Popup, Button, Text, Portal, Ref } from '@stardust-ui/react/src'
import * as copyToClipboard from 'copy-to-clipboard'

export type CopyToClipboardProps = {
  value: string
  copyPrompt: string
  timeout?: number
  attached?: boolean
  pointing?: boolean
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const [copied, setCopied] = React.useState<boolean>(false)
  const [copiedHeight, setCopiedHeight] = React.useState<number>(0)
  const [copiedWidth, setCopiedWidth] = React.useState<number>(0)
  let timeoutId = undefined
  const copiedTextRef = React.useRef<HTMLElement>(null)

  const handleClick = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
    const { timeout, value } = props
    setCopied(true)
    timeoutId = setTimeout(() => {
      setCopied(false)
    }, timeout)
    copyToClipboard(value)
  }

  React.useEffect(() => {
    if (copiedTextRef.current === null) {
      return
    }
    setCopiedHeight(copiedTextRef.current.clientHeight)
    setCopiedWidth(copiedTextRef.current.clientWidth)
  })

  const { attached, pointing, copyPrompt } = props
  const hideContent = copied && !attached
  const copiedStr = 'Copied to clipboard'
  const copiedText = hideContent ? (
    <Text size="larger" styles={{ padding: '5px 5px 5px 5px' }}>
      {copiedStr}
    </Text>
  ) : (
    <Text>{copiedStr}</Text>
  )
  const copyText = <Text>{copyPrompt}</Text>
  let popupContent = copied ? copiedText : copyText
  if (hideContent) {
    popupContent = <Text />
  }
  const button = (
    <Button
      icon="clipboard-copied-to"
      iconOnly
      onClick={handleClick}
      variables={siteVariables => ({
        colorHover: !copied && siteVariables.colors.brand[400],
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
  const portalContentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed' as 'fixed',
    backgroundColor: 'black',
    color: 'white',
    zIndex: 1000,
    top: `calc(50% - ${copiedHeight / 2}px)`,
    left: `calc(50% - ${copiedWidth / 2}px)`,
  }

  return (
    <>
      <Popup
        pointing={pointing}
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
          contentColor: copied
            ? siteVariables.colorScheme.brand.foreground4
            : siteVariables.colors.black,
          contentBackgroundColor: copied
            ? siteVariables.colorScheme.brand.background4
            : siteVariables.colors.white,
          ...(hideContent && hiddenPopupVariables),
        })}
      />
      {hideContent && (
        <Portal
          open={true}
          content={
            <div style={portalContentStyle}>
              <Ref innerRef={copiedTextRef}>{copiedText}</Ref>
            </div>
          }
        />
      )}
    </>
  )
}

CopyToClipboard.defaultProps = {
  timeout: 4000,
  attached: false,
  pointing: false,
}

export default CopyToClipboard
