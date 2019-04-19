import { Accessibility, FocusZoneMode } from '../../types'
import * as keyboardKey from 'keyboard-key'
import { FocusZoneDirection, IS_FOCUSABLE_ATTRIBUTE } from '../../FocusZone'

const CHAT_FOCUSZONE_ATTRIBUTE = 'chat-focuszone'

/**
 * @description
 * Adds a vertical focus zone navigation with a last message as a default tabbable element, pressing enter key focuses inside a message.
 * Adds a escape key action which focuses the chat, i.e., moves key handling from inside a message back to the chat list.
 */
const ChatBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {},
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
      direction: FocusZoneDirection.vertical,
      shouldResetActiveElementWhenTabFromZone: true,
      defaultTabbableElement: getLastTabbableElement, // select last chat message by default
      [CHAT_FOCUSZONE_ATTRIBUTE]: '', // allows querying the default active element
    },
  },
  keyActions: {
    root: {
      focus: {
        keyCombinations: [{ keyCode: keyboardKey.Escape }],
      },
    },
  },
})

const getLastTabbableElement = (root: HTMLElement): HTMLElement => {
  const lastVisibleMessage = root.querySelector('[data-last-visible="true"]') as HTMLElement
  if (lastVisibleMessage) return lastVisibleMessage

  const chatItemsElements = root.querySelectorAll(
    `[${CHAT_FOCUSZONE_ATTRIBUTE}] .ui-chat__message[${IS_FOCUSABLE_ATTRIBUTE}="true"]`,
  )
  return chatItemsElements.length > 0
    ? (chatItemsElements[chatItemsElements.length - 1] as HTMLElement)
    : null
}

export default ChatBehavior
