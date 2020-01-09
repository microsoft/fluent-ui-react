import * as React from 'react'

type ComposeOptions = {
  className?: string
  displayName: string
  mapPropsToBehavior?: Function
  mapPropsToStyles?: Function
  shouldForwardProp?: Function
  overrideStyles?: boolean
}

const compose = <UserProps, CProps = {}>(
  Component: React.ComponentType<CProps>,
  options: ComposeOptions,
): React.ComponentType<CProps & UserProps> => {
  const ComponentComponent = { ...Component }

  ComponentComponent.displayName = options.displayName
  ComponentComponent.defaultProps = {
    ...Component.defaultProps,
    __unstable_config: {
      overrideStyles: false,
      ...options,
    },
  }

  return ComponentComponent as any
}

export default compose
