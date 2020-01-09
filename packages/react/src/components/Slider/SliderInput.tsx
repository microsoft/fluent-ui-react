import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Box, { BoxProps } from '../Box/Box'

export interface SliderInputProps extends BoxProps {
  fluid?: boolean
  vertical?: boolean
}

const SliderInput = compose(Box, {
  displayName: 'SliderInput',
  handledProps: ['fluid', 'vertical'],
  mapPropsToStyles: props => ({ fluid: props.fluid, vertical: props.vertical }),
  overrideStyles: true,
})

// @ts-ignore
SliderInput.defaultProps.as = 'input'

// @ts-ignore
SliderInput.create = createShorthandFactory({
  // @ts-ignore
  Component: SliderInput,
  mappedProp: 'type',
})

export default SliderInput
