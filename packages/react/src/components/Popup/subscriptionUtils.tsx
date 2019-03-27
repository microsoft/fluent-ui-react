import * as React from 'react'

type EventHandler<TResult = void> = (e: Event) => TResult

type SubscriptionToken = {
  invoke: (e: Event, next: GetNextEventHandler) => void
}

type TriggerPredicate = (subscription: SubscriptionToken) => boolean
type TriggerPredicateWithRegistry = (
  subscription: SubscriptionToken,
  registry: SubscriptionToken[],
) => boolean

type GetNextEventHandler = (subscription: SubscriptionToken) => EventHandler
type GetNextEventHandlerWithRegistry = (
  subscription: SubscriptionToken,
  registry: SubscriptionToken[],
) => EventHandler

type SubscriptionContext = {
  registry: SubscriptionToken[]
  triggerPredicate: TriggerPredicate
  register: (subscription: SubscriptionToken) => void
  unregister: (subscription: SubscriptionToken) => void
  next: GetNextEventHandler
}

type SubscriptionProps = {
  handler: EventHandler<boolean>
  target: Node
  type: keyof DocumentEventMap
}

const doNothing = () => {}
const triggerAll = () => true
const noNext: GetNextEventHandler = () => doNothing

export const createSubscriptionType = () => {
  const SubscriptionContext = React.createContext<SubscriptionContext | undefined>(undefined)
  const { Provider, Consumer } = SubscriptionContext

  const createHandlingStrategy = (
    triggerPredicate: TriggerPredicateWithRegistry,
    next: GetNextEventHandlerWithRegistry,
  ) => {
    class TriggerPolicy extends React.Component {
      private registry: SubscriptionToken[] = []

      createContextValue(registry: SubscriptionToken[]): SubscriptionContext {
        return {
          registry,
          register: subscription => registry.push(subscription),
          unregister: subscription => {
            const foundAt = registry.findIndex(
              registrySubscription => registrySubscription === subscription,
            )
            if (foundAt >= 0) {
              registry.splice(foundAt, 1)
            }
          },
          triggerPredicate: subscription => triggerPredicate(subscription, registry),
          next: subscription => next(subscription, registry),
        }
      }

      render() {
        return (
          <Consumer>
            {parentContext => {
              const registry = (parentContext && parentContext.registry) || this.registry

              return (
                <Provider value={this.createContextValue(registry)}>{this.props.children}</Provider>
              )
            }}
          </Consumer>
        )
      }
    }

    return TriggerPolicy
  }

  const HandlingStrategy: React.ComponentType & {
    ChainedFromInnerSubscription: React.ComponentType
  } = createHandlingStrategy(triggerAll, noNext) as any

  const mostInnerNext: GetNextEventHandlerWithRegistry = (subscription, registry) => {
    const nextIndex =
      registry.findIndex(registrySubscription => subscription === registrySubscription) - 1
    const nextHandler = registry[nextIndex]

    return e => {
      if (nextHandler) {
        nextHandler.invoke(e, subscription => mostInnerNext(subscription, registry))
      }
    }
  }

  HandlingStrategy.ChainedFromInnerSubscription = createHandlingStrategy(
    (subscription, registry) => {
      return registry[registry.length - 1] === subscription
    },
    mostInnerNext,
  )

  class Subscription extends React.Component<SubscriptionProps> {
    private handler?: EventHandler
    private subscriptionContext?: SubscriptionContext

    private token: SubscriptionToken = {
      invoke: (e: Event, next: GetNextEventHandler) => {
        const { handler: handle } = this.props
        const nextHandler = next(this.token)

        if (!handle(e)) {
          nextHandler(e)
        }
      },
    }

    subscribe = (handler: EventHandler) => {
      const { target, type } = this.props
      target.addEventListener(type, handler)
    }

    unsubscribe = (handler: EventHandler) => {
      const { target, type } = this.props
      target.removeEventListener(type, handler)
    }

    onMountAndUpdate = () => {
      const triggerPredicate: TriggerPredicate = this.subscriptionContext
        ? this.subscriptionContext.triggerPredicate
        : triggerAll

      const next: GetNextEventHandler = this.subscriptionContext
        ? this.subscriptionContext.next
        : noNext

      if (this.handler) {
        this.unsubscribe(this.handler)
      }

      this.handler = e => {
        if (!triggerPredicate(this.token)) {
          return
        }

        this.token.invoke(e, next)
      }

      this.subscribe(this.handler)
    }

    componentDidMount() {
      if (this.subscriptionContext) {
        this.subscriptionContext.register(this.token)
      }

      this.onMountAndUpdate()
    }

    componentDidUpdate() {
      this.onMountAndUpdate()
    }

    componentWillUnmount() {
      if (this.subscriptionContext) {
        this.subscriptionContext.unregister(this.token)
      }

      this.unsubscribe(this.handler!)
    }

    render() {
      return (
        <Consumer>
          {context => {
            this.subscriptionContext = context
            return null
          }}
        </Consumer>
      )
    }
  }

  return {
    Subscription,
    HandlingStrategy,
  }
}
