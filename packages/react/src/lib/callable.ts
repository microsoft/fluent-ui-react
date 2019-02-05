import { Func } from '../types'

// https://jsperf.com/startdust-callable
const callable = <T = {}>(possibleFunction: T | Func<T>) => (...args: any[]) => {
  return typeof possibleFunction === 'function'
    ? (possibleFunction as Func<T>)(...args)
    : possibleFunction
}

export default callable
