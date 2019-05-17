export const getDefaultPropName = (propName: string) =>
  `default${propName[0].toUpperCase() + propName.slice(1)}`

// TODO: type args
export const getDefinedAutoControlledProps = (autoControlledProps: any[] = [], props: any) => {
  const definedProps: any = {}

  autoControlledProps.forEach(k => {
    if (props[k] !== undefined) {
      definedProps[k] = props[k]
    }
  })

  return definedProps
}

/**
 * Return the auto controlled state value for a give prop. The initial value is chosen in this order:
 *  - regular props
 *  - then, default props
 *  - then, initial state
 *  - then, `checked` defaults to false
 *  - then, `value` defaults to '' or [] if props.multiple
 *  - else, undefined
 *
 *  @param {string} propName A prop name
 *  @param {object} [props] A props object
 */
export const getAutoControlledStateValue = <P extends Record<string, any>, N extends keyof P>(
  propName: N,
  props: P,
) => {
  // regular props
  const propValue = props[propName]
  if (propValue !== undefined) return propValue

  // defaultProps
  const defaultProp = props[getDefaultPropName(propName as string)]
  if (defaultProp !== undefined) return defaultProp

  // React doesn't allow changing from uncontrolled to controlled components,
  // default checked/value if they were not present.
  if (propName === 'checked') return false
  if (propName === 'value') return props.multiple ? [] : ''

  // otherwise, undefined
}

export const getInitialAutoControlledState = <
  P extends Record<string, any>,
  N extends keyof P & string
>(
  autoControlledProps: N[],
  props: P,
): Partial<P> => {
  // Auto controlled props are copied to state.
  // Set initial state by copying auto controlled props to state.
  // Also look for the default prop for any auto controlled props (foo => defaultFoo)
  // so we can set initial values from defaults.
  return autoControlledProps.reduce(
    (acc, propName) => {
      acc[propName] = getAutoControlledStateValue(propName, props)

      return acc
    },
    {} as Partial<P>,
  )
}
