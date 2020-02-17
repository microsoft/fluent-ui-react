import * as React from 'react'

type ComposeOptions = {
  // TODO: better typings PLZ
  className?: string
  displayName: string
  mapPropsToBehavior?: Function
  mapPropsToStyles?: Function
  handledProps?: string[]
  overrideStyles?: boolean
}

const COMPOSE_CONFIG_PROP_NAME = '__unstable_config'

export type ComposableProps = { [COMPOSE_CONFIG_PROP_NAME]?: ComposeOptions }

export const compose = <UserProps, CProps = {}>(
  Component: React.ComponentType<CProps>,
  options: ComposeOptions,
): React.ComponentType<CProps & UserProps> => {
  const ComposedComponent = Component.bind(null)

  ComposedComponent.displayName = options.displayName

  // We are passing config via props by setting default prop value
  ComposedComponent.defaultProps = { ...(Component.defaultProps || {}) }
  // @ts-ignore TODO PLS FIX ME
  ComposedComponent.defaultProps[COMPOSE_CONFIG_PROP_NAME] = options

  return ComposedComponent as any
}

export const useComposedConfig = <P extends ComposableProps>(props: P) => {
  const { [COMPOSE_CONFIG_PROP_NAME]: options } = props

  const {
    className = '',
    displayName,
    handledProps = [],
    mapPropsToBehavior = () => ({}),
    mapPropsToStyles = () => ({}),
    overrideStyles = false,
  } = options || {}

  return {
    behaviorProps: mapPropsToBehavior(props),
    styleProps: mapPropsToStyles(props),
    className,
    displayName,
    handledProps: handledProps.concat(['__unstable_config']),
    overrideStyles,
  }
}
