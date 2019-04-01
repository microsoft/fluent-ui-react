import { EventListenerProps } from '../types'

// TODO: remove shallowEqual() and shouldUpdateListener() with update to hooks
const shallowEqual = (first: Record<string, any>, second: Record<string, any>) => {
  // or whatever strategy we would have for handling falsy values - here is the most strict one
  if (first === undefined) {
    return second === undefined
  }
  if (first === null) {
    return second === null
  }

  if (first === second) {
    return true
  }

  if (Object.keys(first).length !== Object.keys(second).length) {
    return false
  }

  const isAnyDifference = Object.keys(first).some(key => first[key] !== second[key])

  return !isAnyDifference
}

const shouldUpdateListener = (prevProps: EventListenerProps, nextProps: EventListenerProps) =>
  !shallowEqual({ ...prevProps, listener: nextProps.listener }, nextProps)

export default shouldUpdateListener
