import { Text, Tooltip, ShorthandValue, TextProps } from '@stardust-ui/react'
import * as copyToClipboard from 'copy-to-clipboard'
import * as _ from 'lodash'
import * as React from 'react'

import { NotificationContext } from './NotificationProvider'

export type CopyToClipboardProps = {
  attached?: boolean
  pointing?: boolean
  timeout?: number
  value: string

  noticeText?: ShorthandValue<TextProps>
  promptText?: ShorthandValue<TextProps>

  align?: TooltipProps['align']
  position?: TooltipProps['position']

  trigger: JSX.Element
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const {
    align,
    attached,
    noticeText,
    pointing,
    position,
    promptText,
    timeout,
    trigger,
    value,
  } = props

  const setNotification = React.useContext(NotificationContext)
  const [copied, setCopied] = React.useState<boolean>(false)
  const [promptOpen, setPromptOpen] = React.useState<boolean>(false)
  const timeoutId = React.useRef<number>()

  React.useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      setCopied(false)
    }, timeout)

    return () => clearTimeout(timeoutId.current)
  }, [copied])

  const handleTriggerClick = React.useCallback(
    (e: React.MouseEvent, ...args) => {
      setCopied(true)
      if (!attached) {
        setNotification(Text.create(noticeText), timeout)
      }

      copyToClipboard(value)
      _.invoke(props, 'onClick', e, ...args)
    },
    [value],
  )

  const tooltipContent = copied
    ? { content: Text.create(noticeText), variables: { primary: true } }
    : {
        content: Text.create(promptText),
        variables: { basic: true },
      }
  const tooltipOpen = (promptOpen && !copied) || (copied && attached)
  return (
    <Tooltip
      align={align}
      content={tooltipContent}
      pointing={pointing}
      position={position}
      onOpenChange={(e, data) => setPromptOpen(data.open)}
      open={tooltipOpen}
      trigger={React.cloneElement(trigger, { onClick: handleTriggerClick })}
    />
  )
}

CopyToClipboard.defaultProps = {
  align: 'center',
  noticeText: 'Copied to clipboard',
  position: 'below',
  promptText: 'Click to copy',
  timeout: 4000,
}

export default CopyToClipboard
