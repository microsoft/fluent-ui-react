export type Action<State, ActionNames extends string> = (
  ...args: any[]
) => (state: State, actions: Actions<State, ActionNames>) => Partial<State> | void

export type Actions<State, ActionNames extends string> = Record<
  ActionNames,
  Action<State, ActionNames>
>

export type Middleware<State, ActionNames extends string> = (
  prevState: State,
  nextState: State,
  actions: Actions<State, ActionNames>,
) => State

export type SideEffect<State, ActionNames extends string> = (
  manager: Manager<State, ActionNames>,
) => void

export type ManagerConfig<State, ActionNames extends string> = {
  actions: Actions<State, ActionNames>
  debug?: boolean
  middleware?: Middleware<State, ActionNames>[]
  state?: Partial<State>
  sideEffects?: SideEffect<State, ActionNames>[]
}

export type ManagerFactory<State, ActionNames extends string> = (
  config: ManagerConfig<State, ActionNames>,
) => Manager<State, ActionNames>

export type Manager<State, ActionNames extends string> = {
  readonly state: State
  actions: ManagerActions<State, ActionNames>
}

export type ManagerAction<State, ActionNames extends string> = (
  state: State,
  actions: Actions<State, ActionNames>,
) => void

export type ManagerActions<State, ActionNames extends string> = Record<
  ActionNames,
  ManagerAction<State, ActionNames>
>
