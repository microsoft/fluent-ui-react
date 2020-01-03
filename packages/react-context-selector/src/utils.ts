import * as React from 'react'

export const CONTEXT_SUBSCRIBE_PROPERTY = 's'
export const CONTEXT_VALUE_PROPERTY = 'v'

export const HOOK_SELECTOR_PROPERTY = 'r'
export const HOOK_SELECTED_PROPERTY = 'l'
export const HOOK_VALUE_PROPERTY = 's'

// useLayoutEffect that does not show warning when server-side rendering, see Alex Reardon's article for more info
// @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect
