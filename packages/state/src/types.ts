export type Action<S, A> = (...args: any[]) => (state: S, actions: A) => Partial<S> | void

export type Middleware<S, A> = (prevState: S, nextState: S, actions: A) => S | void

export type SideEffect<S, A> = (manager: Manager<S, A>) => void

export type ManagerConfig<S, A> = {
  actions: A
  debug?: boolean
  middleware?: Middleware<S, A>[]
  state?: Partial<S>
  sideEffects?: SideEffect<S, A>[]
}

export type Manager<S, A> = {
  readonly state: S
  actions: A
}

export type ManagerFactory<S, A> = (config: ManagerConfig<S, A>) => Manager<S, A>
