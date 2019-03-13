import { EventHandler, EventTypes } from './types'

type ListenerRegistrySet = Set<EventHandler<EventTypes>>
type ListenerRegistries = Partial<Record<EventTypes, ListenerRegistrySet>>

const registries: ListenerRegistries = {}

export const add = (type: EventTypes, listener: EventHandler<EventTypes>): void => {
  if (!registries[type]) {
    registries[type] = new Set()
  }

  registries[type].add(listener)
}

export const remove = (type: EventTypes, listener: EventHandler<EventTypes>): void => {
  if (registries[type]) {
    registries[type].delete(listener)

    if (registries[type].size === 0) {
      delete registries[type]
    }
  }
}

export const isDispatchable = (type: EventTypes, listener: EventHandler<EventTypes>): boolean => {
  if (registries[type]) {
    const lastAddedHandler = Array.from(registries[type]).pop()

    return listener === lastAddedHandler
  }

  return false
}
