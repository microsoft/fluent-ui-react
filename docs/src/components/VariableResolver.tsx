import * as React from 'react'
import flat from 'flat'
import { useInterval } from 'react-use'
import { Renderer } from 'src/themes/types'
import { callable } from 'src/lib'
import * as _ from 'lodash'
import { ThemeContext } from '@stardust-ui/react-fela'
import { Provider, ProviderContextPrepared } from 'src/index'

const useEnhancedRenderRule = (renderer: Renderer) => {
  const variables = React.useRef({})

  const renderRule = React.useCallback(
    (rule, props) => {
      const component = props.variables.__componentName
      const mappedVariables = _.mapValues(props.variables, (variableValue, variableName) => {
        return _.isString(variableValue) ? `variable.${variableName}` : variableValue
      })
      const resolvedStyles = flat(callable(rule)({
        ...props,
        variables: mappedVariables,
      }))

      variables.current[component] = variables.current[component] || {}

      _.forEach(
        resolvedStyles,
        (cssValue) => {
          if (_.startsWith(cssValue, 'variable.')) {
            const propName = cssValue.replace(/^variable\./, '')
            variables.current[component][propName] = props.variables[propName]
          }

          return variables
        },
      )

      return renderer.renderRule(rule, props)
    },
    [renderer],
  )

  return { renderRule, variables }
}

const useEnhancedRenderer = (renderer: Renderer) => {
  const { renderRule, variables } = useEnhancedRenderRule(renderer)

  const enhancedRenderer: Renderer = React.useMemo(
    () => ({
      ...renderer,
      renderRule,
    }),
    [renderer],
  )

  return [enhancedRenderer, variables]
}

function sortObject(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
}

function useMutationObserver(targetRef: React.RefObject<any>, config, callback) {
  const observer = React.useMemo(
    () =>
      new MutationObserver((mutationList, observer) => {
        callback(mutationList, observer);
      }),
    [callback]
  );
  React.useEffect(
    () => {
        observer.observe(targetRef.current, config);
        return () => {
          observer.disconnect();
        };
    },
    [config]
  );

}

const VariableResolver: React.FunctionComponent = (props) => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const [resolverRenderer, resolvedVariables] = useEnhancedRenderer(context.renderer)

  const latestVariables = React.useRef({})

  const textTheme = {
    ...context.theme,
    componentVariables: _.mapValues(context.theme.componentVariables, (componentVariables, componentName) => {
      return (siteVariables) => {
        const resolvedVariables = callable(componentVariables)(siteVariables)

        return {
          __componentName: componentName,
          ...resolvedVariables,
        }
      }
    }),
  }

  const ref = React.useRef()
  const callback = React.useCallback(() => {
    if (!_.isEqual(resolvedVariables.current, latestVariables.current)) {
      latestVariables.current = resolvedVariables.current

      resolvedVariables.current = {}

      const ordered = _.reduce(
        latestVariables.current,
        (components, variables, componentName) => {
          if (!_.isEmpty(variables)) {
            components[componentName] = sortObject(variables)
          }

          return components
        },
        {},
      )

      props.onResolve(ordered)
    }
  }, [])

  React.useEffect(callback, [])
  useMutationObserver(ref, { attributes: true, subtree: true }, callback)

  return (
    <Provider renderer={resolverRenderer} theme={textTheme}>
      <div ref={ref}>
      {props.children}
      </div>
    </Provider>
  )
}

export default VariableResolver
