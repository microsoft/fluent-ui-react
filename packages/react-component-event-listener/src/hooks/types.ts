import * as React from 'react'
import { EventHandler, EventTypes } from '../types'

export type UseListenerHookOptions<N, T extends EventTypes> = {
  capture: boolean
  listener: EventHandler<T>
  targetRef: React.RefObject<N>
  type: T
}
