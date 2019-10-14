import { isEnabled as isDebugEnabled } from './debug'

const withDebugId =
  process.env.NODE_ENV === 'production'
    ? <T>(data: T, debugId: string): T => data
    : <T>(data: T, debugId: string): T => {
        if (!isDebugEnabled || debugId === undefined) {
          return data
        }

        if (typeof data === 'object' && data !== null) {
          if (!data.hasOwnProperty('_debugId')) {
            const copy = { ...data }
            Object.defineProperty(copy, '_debugId', {
              value: debugId,
              writable: false,
              enumerable: false,
            })
            return copy
          }
        }

        if (typeof data === 'function') {
          return (((...args) => {
            const result = data(...args)
            return withDebugId(result, debugId)
          }) as unknown) as T
        }

        return data
      }

export default withDebugId
