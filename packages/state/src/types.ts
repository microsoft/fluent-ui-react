export type Action<State, ActionNames extends keyof any> = (
  ...args: any[]
) => (state: State, actions: Actions<State, ActionNames>) => Partial<State> | void

export type Actions<State, ActionNames extends keyof any> = Record<
  ActionNames,
  Action<State, ActionNames>
>

export type Middleware<State, ActionNames extends keyof any> = (
  prevState: State,
  nextState: State,
  actions: Actions<State, ActionNames>,
) => State | void

export type SideEffect<State, ActionNames extends keyof any> = (
  manager: Manager<State, ActionNames>,
) => void

export type ManagerConfig<State, ActionNames extends keyof any> = {
  actions?: Actions<State, ActionNames>
  debug?: boolean
  middleware?: Middleware<State, ActionNames>[]
  state?: Partial<State>
  sideEffects?: SideEffect<State, ActionNames>[]
}

export type Manager<State, ActionNames extends keyof any> = {
  readonly state: State
  actions: Actions<State, ActionNames>
}

export type ManagerFactory<State, ActionNames extends keyof any> = (
  config: ManagerConfig<State, ActionNames>,
) => Manager<State, ActionNames>
