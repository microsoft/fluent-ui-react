const withDebugId = <T>(data: T, debugId: string): T => {
  if (typeof data === 'object' && data !== null) {
    if (!data.hasOwnProperty('_debugId')) {
      Object.defineProperty(data, '_debugId', {
        value: debugId,
        writable: false,
        enumerable: false,
      })
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
