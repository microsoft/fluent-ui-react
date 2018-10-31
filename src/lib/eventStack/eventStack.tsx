import isBrowser from '../isBrowser'
import EventTarget from './EventTarget'
import normalizeTarget from './normalizeTarget'

class EventStack {
  private readonly _targets = new Map()

  // ------------------------------------
  // Target utils
  // ------------------------------------

  private _find = (target, autoCreate = true) => {
    const normalized = normalizeTarget(target)

    if (this._targets.has(normalized)) return this._targets.get(normalized)
    if (!autoCreate) return

    const eventTarget = new EventTarget(normalized)
    this._targets.set(normalized, eventTarget)

    return eventTarget
  }

  private _remove = target => {
    const normalized = normalizeTarget(target)

    this._targets.delete(normalized)
  }

  // ------------------------------------
  // Pub/sub
  // ------------------------------------

  public sub = (name, handlers, options: any = {}): Function => {
    if (!isBrowser()) return () => {}

    const { target = document, pool = 'default', useCapture = false } = options
    const eventTarget = this._find(target)

    eventTarget.sub(name, handlers, pool, useCapture)
    return () => this.unsub(name, handlers, options)
  }

  public unsub = (name, handlers, options: any = {}) => {
    if (!isBrowser()) return

    const { target = document, pool = 'default', useCapture = false } = options
    const eventTarget = this._find(target, false)

    if (eventTarget) {
      eventTarget.unsub(name, handlers, pool, useCapture)
      if (eventTarget.empty()) this._remove(target)
    }
  }
}

const eventStack = new EventStack()

export class EventStackSubscription {
  public static empty() {
    return new EventStackSubscription(() => {}, true)
  }

  public static create(name, handlers, options: any = {}): EventStackSubscription {
    const unsubscribe = eventStack.sub(name, (...args) => handlers(...args), options)
    return new EventStackSubscription(unsubscribe)
  }

  private swapWith(another: EventStackSubscription) {
    const temp = another._unsubscribe
    another._unsubscribe = this._unsubscribe
    this._unsubscribe = temp
  }

  private constructor(private _unsubscribe: Function, public readonly isEmpty: boolean = false) {}

  public stop(): void {
    this._unsubscribe()
  }

  public replaceWith(name, handlers, options: any = {}): void {
    this.stop()
    this.swapWith(EventStackSubscription.create(name, handlers, options))
  }
}
