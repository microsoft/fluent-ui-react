import {
  createComponent,
  Button,
  Text,
  Tooltip,
  ShorthandValue,
  ButtonProps,
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

const CopyToClipboard = createComponent<CopyToClipboardProps>({
  displayName: 'CopyToClipboard',
  render: props => {
    const { attached, button, noticeText, pointing, promptText, timeout, value } = props

    const [copied, setCopied] = React.useState<boolean>(false)
    const [promptOpen, setPromptOpen] = React.useState<boolean>(false)
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

    const tooltipContent = copied
      ? { content: Text.create(noticeText), variables: { primary: true } }
      : {
          content: Text.create(promptText),
          variables: { basic: true },
        }
    const tooltipOpen = (promptOpen && !copied) || (copied && attached)

    return (
      <>
        <Tooltip
          align="center"
          content={tooltipContent}
          pointing={pointing}
          position="below"
          onOpenChange={(e, data) => setPromptOpen(data.open)}
          open={tooltipOpen}
          trigger={trigger}
        />
        <Notification open={!attached && copied}>{Text.create(noticeText)}</Notification>
      </>
    )
  },
})

CopyToClipboard.defaultProps = {
  attached: false,
  pointing: false,
  timeout: 4000,

  button: { icon: 'clipboard-copied-to' },
  noticeText: 'Copied to clipboard',
  promptText: 'Click to copy',
}

export default CopyToClipboard
