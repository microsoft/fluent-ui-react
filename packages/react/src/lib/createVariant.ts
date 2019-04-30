import * as hoistNonReactStatic from 'hoist-non-react-statics'

function createVariant<TProps>(
  ComponentType: { new (...args: any[]): React.Component<TProps> },
  name: string,
): React.ComponentType<TProps>
function createVariant<TProps, TVariantProps>(
  ComponentType: { new (...args: any[]): React.Component<TProps> },
  name: string,
  propTypes: React.ValidationMap<TVariantProps>,
): React.ComponentType<TProps & Partial<TVariantProps>>
function createVariant<TProps, TVariantProps>(
  ComponentType: { new (...args: any[]): React.Component<TProps> },
  name: string,
  propTypes: React.ValidationMap<TVariantProps>,
  defaultProps: Partial<TProps & TVariantProps>,
): React.ComponentType<TProps & Partial<TVariantProps>>
function createVariant<TProps>(
  ComponentType: { new (...args: any[]): React.Component<TProps> },
  name: string,
  propTypes = {},
  defaultProps = {},
): React.ComponentType<TProps> {
  class VariantType extends ComponentType {}
  hoistNonReactStatic(VariantType, ComponentType)

  VariantType['variantName'] = name

  VariantType['defaultProps'] = {
    ...VariantType['defaultProps'],
    ...defaultProps,
  }
  VariantType['handledProps'] = [...VariantType['handledProps'], ...Object.keys(propTypes)]

  return VariantType
}

export default createVariant
