import * as React from 'react'
import useStateManager from './useStateManager'
import renderComponent, {
  RenderConfig,
  RenderResultConfig,
} from '@stardust-ui/react/src/lib/renderComponent'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import { Manager } from '@stardust-ui/state'
import { Omit } from '@stardust-ui/react'

export type UseStardustConfig = {

}

const useStardust = <P = any>(
  config: Omit<RenderConfig<P>, 'state' | 'context'> & { autoControlledProps?: string[] },
): RenderResultConfig<P> & {
  manager: Manager<any, any>
} => {
  const displayName = config.displayName
  // const className = config.className || `ui-${_.kebabCase(displayName)}`
  const handledProps = config.handledProps

  const { className, actionHandlers, props } = config

  const context = React.useContext(ThemeContext)
  const manager = useStateManager(props.stateManager, props, config.autoControlledProps)

  const result = renderComponent<P>({
    className,
    displayName,
    handledProps,
    props,
    state: manager.state,
    actionHandlers,
    context: context as any,
  })

  return { ...result, manager }
}

export default useStardust
