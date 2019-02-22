import * as React from 'react'

import NestingContext from '../NestingContext'
import { NestedContextProps } from '../types'
import RegistrySet from '../lib/RegistrySet'
import { UseNestingHookResult } from './types'

const registrySet = new RegistrySet()

const useNestingRoot = <T extends Node>(): UseNestingHookResult<T> => {
  const [registry] = React.useState(registrySet)
  const parentRef = React.useRef<T>(null)

  const nestedProps: NestedContextProps = React.useMemo(
    () => ({
      value: {
        getContextRefs: registry.getContextRefs,
        register: registry.register,
        unregister: registry.unregister,
      },
    }),
    [],
  )
  const getRefs = React.useCallback(() => {
    return registry.getContextRefs(parentRef)
  }, [])

  React.useEffect(() => {
    registry.register(parentRef)

    return () => registry.unregister(parentRef)
  }, [])

  return {
    NestedComponent: NestingContext.Provider,
    nestedProps,

    getRefs,
    isRoot: true,
    ref: parentRef,
  }
}

export default useNestingRoot
