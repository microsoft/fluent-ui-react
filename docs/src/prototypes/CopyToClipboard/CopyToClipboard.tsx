import {
  Text,
  Tooltip,
  ShorthandValue,
  TextProps,
  AccessibilityAttributes,
  AccessibilityHandlerProps,
} from '@stardust-ui/react'
import * as copyToClipboard from 'copy-to-clipboard'
import * as _ from 'lodash'
import * as React from 'react'

import Notification from './Notification'

export type TriggerAccessibility = {
  attributes?: AccessibilityAttributes
  keyHandlers?: AccessibilityHandlerProps
}

export type CopyToClipboardProps = {
  attached?: boolean
  pointing?: boolean
  timeout?: number
  value: string

  noticeText?: ShorthandValue<TextProps>
  promptText?: ShorthandValue<TextProps>

  trigger?: JSX.Element
  triggerAccessibility?: TriggerAccessibility
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = props => {
  const {
    attached,
    noticeText,
    pointing,
    promptText,
    timeout,
    value,
    trigger,
    triggerAccessibility,
  } = props

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
    (e: React.MouseEvent) => {
      setCopied(true)
      copyToClipboard(value)
      _.invoke(props, 'onTriggerClick', event, e)
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
  const triggerWrapper =
    trigger &&
    React.cloneElement(trigger, {
      onClick: handleTriggerClick,
      ...triggerAccessibility.attributes,
      ...triggerAccessibility.keyHandlers,
    })
  return (
    <>
      <Tooltip
        align="center"
        content={tooltipContent}
        pointing={pointing}
        position="below"
        onOpenChange={(e, data) => setPromptOpen(data.open)}
        open={tooltipOpen}
        trigger={triggerWrapper}
      />
      <Notification open={!attached && copied}>{Text.create(noticeText)}</Notification>
    </>
  )
}

CopyToClipboard.defaultProps = {
  noticeText: 'Copied to clipboard',
  promptText: 'Click to copy',
  timeout: 4000,
  triggerAccessibility: {},
}

export default CopyToClipboard
