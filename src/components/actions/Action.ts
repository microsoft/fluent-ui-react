export interface Action<P> {
  name: string
  params: P
}

export interface ActionHandler<P> {
  name: string
  call: (params: P) => boolean
}
