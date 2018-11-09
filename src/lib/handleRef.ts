import * as React from 'react'

type HandleRefProps<TProp extends string, N> = { [K in TProp]?: React.Ref<N> }

const handleRef = <P extends string, N>(props: HandleRefProps<P, N>, propName: P, node: N) => {
  const ref: React.Ref<N> = props[propName]

  if (process.env.NODE_ENV !== 'production') {
    if (typeof ref === 'string') {
      throw new Error("We don't support refs as string")
    }
  }

  if (typeof ref === 'function') {
    ref(node)
    return
  }

  if (typeof ref === 'object') {
    // @ts-ignore
    ref.current = node
  }
}

export default handleRef
