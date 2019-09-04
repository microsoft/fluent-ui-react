import {
  Button,
  Text,
  Tooltip,
  ShorthandValue,
  ButtonProps,
  TooltipProps,
  TextProps,
} from '@stardust-ui/react'
import * as copyToClipboard from 'copy-to-clipboard'
import * as _ from 'lodash'
import * as React from 'react'

import Notification from './Notification'

export type CopyToClipboardProps = {
  attached?: boolean
  pointing?: boolean
  timeout?: number
  value: string

  button?: ShorthandValue<ButtonProps>
  noticeText?: ShorthandValue<TextProps>
  promptText?: ShorthandValue<TextProps>
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const { attached, button, noticeText, pointing, promptText, timeout, value } = props

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

  const trigger = Button.create(button, {
    defaultProps: {
      iconOnly: true,
    },
    overrideProps: (predefinedProps: ButtonProps): ButtonProps => ({
      onClick: (event, data) => {
        handleClick()
        _.invoke(predefinedProps, 'onClick', event, data)
      },
    }),
  })
  const tooltipProps: TooltipProps = {
    align: 'center',
    position: 'below',
    pointing,
    trigger,
  }

  return (
    <>
      {!copied && <Tooltip {...tooltipProps} content={Text.create(promptText)} />}

      {copied && attached && <Tooltip {...tooltipProps} content={Text.create(noticeText)} open />}
      {copied && !attached && <Notification>{Text.create(noticeText)}</Notification>}
    </>
  )
}

CopyToClipboard.defaultProps = {
  attached: false,
  pointing: false,
  timeout: 4000,

  button: { icon: 'clipboard-copied-to' },
  noticeText: 'Copied to clipboard',
  promptText: 'Click to copy',
}

export default CopyToClipboard
