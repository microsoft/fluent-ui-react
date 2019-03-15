import { TargetRef } from './types'

export const documentRef: TargetRef = {
  current: typeof document === 'undefined' ? null : document,
}
export const windowRef: TargetRef = {
  current: typeof window === 'undefined' ? null : window,
}

export { default as EventListener } from './EventListener'
export { default as StackableEventListener } from './StackableEventListener'
export { EventHandler, EventListenerProps, EventTypes, TargetRef } from './types'
