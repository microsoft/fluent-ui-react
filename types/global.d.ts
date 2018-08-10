declare const __DEV__: boolean
declare const __PATH_SEP__: string
declare const __BASENAME__: boolean

declare interface NodeModule {
  hot: any
}

type RequireContextReturn = {
  (path): any
  keys: () => string[]
}

declare interface NodeRequire {
  context: (path: string, deep: boolean, pattern: RegExp) => RequireContextReturn
}

declare module '*.json' {
  const value: any
  export default value
}
