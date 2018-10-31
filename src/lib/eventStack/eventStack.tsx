import isBrowser from '../isBrowser'
import EventTarget from './EventTarget'
import normalizeTarget from './normalizeTarget'

class EventStackInner {
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

const eventStack = new EventStackInner()

class EventStackSubscription {
  public static empty() {
    return new EventStackSubscription(() => {}, true)
  }

  public constructor(private _unsubscribe: Function, public readonly isEmpty: boolean = false) {}

  public unsubscribe(): void {
    this._unsubscribe()
  }
}

export class EventStack {
  public static readonly noSubscription = EventStackSubscription.empty()

  public static subscribe(name, handlers, options: any = {}): EventStackSubscription {
    const unsubscribe = eventStack.sub(name, (...args) => handlers(...args), options)
    return new EventStackSubscription(unsubscribe)
  }
}
