import { EventHandler, EventTypes } from '../types'

type ListenerRegistrySet = Set<EventHandler<EventTypes>>
type ListenerRegistries = Partial<Record<EventTypes, ListenerRegistrySet>>

const registries: ListenerRegistries = {}

export const add = (type: EventTypes, listener: EventHandler<EventTypes>): void => {
  if (registries[type] === undefined) {
    registries[type] = new Set()
  }

   (registries[type] as ListenerRegistrySet).add(listener)
}

export const remove = (type: EventTypes, listener: EventHandler<EventTypes>): void => {
  if (registries[type] !== undefined) {
     (registries[type] as ListenerRegistrySet).delete(listener)

    if ((registries[type] as ListenerRegistrySet).size === 0) {
      delete registries[type]
    }
  }
}

export const isDispatchable = (type: EventTypes, listener: EventHandler<EventTypes>): boolean => {
  if (registries[type] !== undefined) {
    const lastAddedHandler = Array.from(registries[type] as ListenerRegistrySet).pop()

    return listener === lastAddedHandler
  }

  return false
}
