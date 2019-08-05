// @ts-ignore
import { ThemeContext } from '@stardust-ui/react-fela'
import {
  Provider,
  ProviderContextPrepared,
  ThemeComponentVariablesPrepared,
} from '@stardust-ui/react'
import * as React from 'react'
import * as _ from 'lodash'

import useClassNamesListener from './useClassNamesListener'
import useEnhancedRenderer from './useEnhancedRenderer'

const sortVariables = variables =>
  Object.keys(variables)
    .sort()
    .reduce((acc, variable) => {
      acc[variable] = variables[variable]

      return acc
    }, {})

type VariableResolverProps = {
  onResolve: (variables: ThemeComponentVariablesPrepared) => void
}

const VariableResolver: React.FunctionComponent<VariableResolverProps> = props => {
  const { onResolve } = props

  const elementRef = React.useRef<HTMLDivElement>()
  const latestVariables = React.useRef<ThemeComponentVariablesPrepared>({})

  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const [renderer, resolvedVariables] = useEnhancedRenderer(context.renderer)

  const onClassNamesChange = React.useCallback(() => {
    if (!_.isEqual(resolvedVariables.current, latestVariables.current)) {
      // deep is required to avoid referencing values
      latestVariables.current = _.cloneDeep(resolvedVariables.current)

      const ordered = _.reduce(
        latestVariables.current,
        (components, variables, componentName) => {
          if (!_.isEmpty(variables)) {
            components[componentName] = sortVariables(variables)
          }

          return components
        },
        {},
      )

      onResolve(ordered)
    }
  }, [onResolve])

  useClassNamesListener(elementRef, onClassNamesChange)

  return (
    <Provider renderer={renderer}>
      <div ref={elementRef}>{props.children}</div>
    </Provider>
  )
}

export default VariableResolver
