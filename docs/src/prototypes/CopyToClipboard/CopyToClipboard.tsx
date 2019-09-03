import * as React from 'react'
import { Button, Text, Tooltip, ShorthandValue, ButtonProps } from '@stardust-ui/react/src'
import * as copyToClipboard from 'copy-to-clipboard'
import CopyButtonNotification from './CopyButtonNotification'

export type CopyToClipboardProps = {
  value: string
  copyPrompt: string
  timeout?: number
  attached?: boolean
  pointing?: boolean
  button?: ShorthandValue<ButtonProps>
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const [copied, setCopied] = React.useState<boolean>(false)
  let timeoutId = undefined

  const onClick = () => {
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

  const { attached, pointing, copyPrompt, button } = props
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
          overrideProps: () => ({ onClick }),
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
