import * as React from 'react'

import NestingContext from '../NestingContext'
import { NestingContextValue } from '../types'
import { UseNestingHookResult } from './types'

const useNestingChild = <T extends Node>(): UseNestingHookResult<T> => {
  const nestingContext = React.useContext(NestingContext) as NestingContextValue
  const childRef = React.useRef(null)

  const getRefs = React.useCallback(() => {
    return nestingContext.getContextRefs(childRef)
  }, [])

  React.useEffect(() => {
    nestingContext.register(childRef)
    return () => nestingContext.unregister(childRef)
  }, [])

  return {
    NestedComponent: React.Fragment,
    nestedProps: null,

    getRefs,
    isRoot: false,
    ref: childRef,
  }
}

export default useNestingChild
