import * as React from 'react'

/** A type that ensures that passed prop is defined in props and matches the type. */
type HandleRefProps<TProp extends string, N> = { [K in TProp]?: React.Ref<N> }

/**
 * The function that correctly handles passing refs.
 *
 * @param props All components props
 * @param propName The name of a ref prop
 * @param node A node that should be passed by ref
 */
const handleRef = <P extends string, N>(props: HandleRefProps<P, N>, propName: P, node: N) => {
  const ref: React.Ref<N> = props[propName]

  if (process.env.NODE_ENV !== 'production') {
    if (typeof ref === 'string') {
      throw new Error(
        'We do not support refs as string, this is a legacy API and will be likely to be removed in one of the future releases of React.',
      )
    }
  }

  if (typeof ref === 'function') {
    ref(node)
    return
  }

  if (typeof ref === 'object') {
    // @ts-ignore The `current` property is defined as readonly, however it a valid way
    ref.current = node
  }
}

export default handleRef
