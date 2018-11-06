import * as _ from 'lodash'
import { OneOrArray } from 'types/utils'

export default class EventTarget {
  private _handlers: { [key: string]: EventListener } = {}
  private _pools: { [key: string]: { [key: string]: EventListener[] } } = {}
  private target: any

  constructor(target) {
    this.target = target
  }

  // ------------------------------------
  // Utils
  // ------------------------------------

  private _emit = (name: string) => (event: Event) => {
    _.forEach(this._pools, (pool, poolName) => {
      const { [name]: handlers } = pool

      if (!handlers) return
      if (poolName === 'default') {
        _.forEach(handlers, handler => handler(event))
        return
      }
      _.last(handlers)(event)
    })
  }

  private _normalize = (handlers: OneOrArray<EventListener>) =>
    _.isArray(handlers) ? handlers : [handlers]

  // ------------------------------------
  // Listeners handling
  // ------------------------------------

  private _listen = (name: string, useCapture = false) => {
    if (_.has(this._handlers, name)) return
    const handler = this._emit(name)

    this.target.addEventListener(name, handler, useCapture)
    this._handlers[name] = handler
  }

  private _unlisten = (name: string, useCapture = false) => {
    if (_.some(this._pools, name)) return
    const { [name]: handler } = this._handlers

    this.target.removeEventListener(name, handler, useCapture)
    delete this._handlers[name]
  }

  // ------------------------------------
  // Pub/sub
  // ------------------------------------

  public empty = () => _.isEmpty(this._handlers)

  public sub = (
    name: string,
    handlers: OneOrArray<EventListener>,
    pool = 'default',
    useCapture = false,
  ) => {
    const eventsForName = _.get(this._pools, `${pool}.${name}`, []) as EventListener[]
    const events = _.uniq([...eventsForName, ...this._normalize(handlers)])

    this._listen(name, useCapture)
    _.set(this._pools, `${pool}.${name}`, events)
  }

  public unsub = (
    name: string,
    handlers: OneOrArray<EventListener>,
    pool = 'default',
    useCapture = false,
  ) => {
    const eventsForName = _.get(this._pools, `${pool}.${name}`, []) as EventListener[]
    const events = _.without(eventsForName, ...this._normalize(handlers))

    if (events.length > 0) {
      _.set(this._pools, `${pool}.${name}`, events)
      return
    }

    _.set(this._pools, `${pool}.${name}`, undefined)
    this._unlisten(name, useCapture)
  }
}
