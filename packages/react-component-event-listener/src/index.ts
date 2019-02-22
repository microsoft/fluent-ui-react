import * as React from 'react'

export const documentRef: React.RefObject<HTMLDocument> = {
  current: typeof document === 'undefined' ? null : document,
}
export const windowRef: React.RefObject<Window> = {
  current: typeof window === 'undefined' ? null : window,
}

export { default as EventListener } from './EventListener'
export { default as StackableEventListener } from './StackableEventListener'
export { EventHandler, EventListenerProps, EventTypes } from './types'
