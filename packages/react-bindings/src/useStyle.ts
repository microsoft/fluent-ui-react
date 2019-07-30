import * as React from 'react'
import { RenderResultConfig } from '@stardust-ui/react/src/lib/renderComponent'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import { Manager } from '@stardust-ui/state'

const useStyle = <P = any>(
  props: any,
): RenderResultConfig<P> & {
  manager: Manager<any, any>
} => {
  const context = React.useContext(ThemeContext)

  return getClasses(props, context)
}

export default useStyle
