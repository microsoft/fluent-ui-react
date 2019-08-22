import { chatBehavior, Accessibility } from '@stardust-ui/react'

const threadChatBehavior: Accessibility = props => {
  const behaviorData = chatBehavior(props)

  behaviorData.focusZone.props = {
    ...behaviorData.focusZone.props,
    defaultTabbableElement: getLastTabbableElement,
  }
  return behaviorData
}

export default threadChatBehavior

const getLastTabbableElement = (root: HTMLElement): HTMLElement => {
  // In real chat, it should focus the message with data-last-visible="true"
  // Since we don't have this logic in Stardust, overriding a selector to focus the last thread message
  const chatItemsElements = root.querySelectorAll(
    `[chat-focuszone] .ui-chat__message__thread[data-is-focusable="true"]`,
  )
  return chatItemsElements.length > 0
    ? (chatItemsElements[chatItemsElements.length - 1] as HTMLElement)
    : null
}
