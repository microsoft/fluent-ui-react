import * as React from 'react'
import { Button, Text, Tooltip, ShorthandValue, ButtonProps } from '@stardust-ui/react'
import * as copyToClipboard from 'copy-to-clipboard'
import CopyButtonNotification from './Notification'

export type CopyToClipboardProps = {
  attached?: boolean
  button?: ShorthandValue<ButtonProps>
  pointing?: boolean
  timeout?: number
  value: string

  copyPrompt: string
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const { timeout, value } = props
  const { attached, pointing, copyPrompt, button } = props

  const [copied, setCopied] = React.useState<boolean>(false)
  const timeoutId = React.useRef<number>()

  React.useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      setCopied(false)
    }, timeout)

    return () => clearTimeout(timeoutId.current)
  }, [copied])

  const handleClick = React.useCallback(() => {
    setCopied(true)
    copyToClipboard(value)
  }, [value])

  const hideContent = copied && !attached
  const copiedStr = 'Copied to clipboard' // TODO: do not hardcode
  const copiedText = hideContent ? (
    <Text size="larger" styles={{ padding: '5px 5px 5px 5px' }}>
      {/* TODO: inline styles not cool */}
      {copiedStr}
    </Text>
  ) : (
    <Text>{copiedStr}</Text>
  )
  const copyText = <Text>{copyPrompt}</Text>
  let tooltipContent = copied ? copiedText : copyText
  if (hideContent) {
    tooltipContent = <Text />
  }

  const hiddenTooltipContentVariables = {
    boxShadow: 'none',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  }

  const additionalProps = {}
  if (copied && !hideContent) {
    additionalProps['open'] = true
  }

  return (
    <>
      <Tooltip
        pointing={pointing}
        position="below"
        align="center"
        {...additionalProps}
        trigger={Button.create(button, {
          defaultProps: {
            iconOnly: true,
            variables: siteVariables => ({
              colorHover: !copied && siteVariables.colors.brand[400],
            }),
          },
          overrideProps: () => ({ onClick: handleClick }),
        })}
        content={{
          content: tooltipContent,
          variables: siteVariables => ({
            color: copied
              ? siteVariables.colorScheme.brand.foreground4
              : siteVariables.colors.black,
            backgroundColor: copied
              ? siteVariables.colorScheme.brand.background4
              : siteVariables.colors.white,
            ...(hideContent && hiddenTooltipContentVariables),
          }),
        }}
      />
      {hideContent && <CopyButtonNotification>{copiedText}</CopyButtonNotification>}
    </>
  )
}

CopyToClipboard.defaultProps = {
  timeout: 4000,
  attached: false,
  pointing: false,
  button: { icon: 'clipboard-copied-to' },
}

export default CopyToClipboard
