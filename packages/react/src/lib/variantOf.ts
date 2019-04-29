import * as hoistNonReactStatic from 'hoist-non-react-statics'

const variantOf = <TProps>(
  ComponentType: { new (...args: any[]): React.Component<TProps> },
  name: string,
): React.ComponentType<TProps> => {
  class VariantType extends ComponentType {}
  hoistNonReactStatic(VariantType, ComponentType)

  VariantType['variantName'] = name
  return VariantType
}

export default variantOf
