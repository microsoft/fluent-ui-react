import { useIsomorphicLayoutEffect } from '@fluentui/react-bindings'
import * as React from 'react'

type UsePortalBoxOptions = {
  className: string
  rtl: boolean
  target: Document
}

export const PortalBoxContext = React.createContext<HTMLDivElement>(null)

const usePortalBox = (options: UsePortalBoxOptions): HTMLDivElement => {
  const { className, rtl, target } = options

  const element: HTMLDivElement = React.useMemo(() => target.createElement('div'), [target])

  useIsomorphicLayoutEffect(() => {
    target.body.appendChild(element)
    return () => target.body.removeChild(element)
  }, [])
  useIsomorphicLayoutEffect(() => {
    element.setAttribute('className', className)

    if (rtl) {
      element.setAttribute('dir', 'rtl')
    } else {
      element.removeAttribute('dir')
    }
  }, [className, rtl])

  return element
}

export default usePortalBox
