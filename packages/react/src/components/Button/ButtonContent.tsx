import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory, SizeValue } from '../../utils'
import Box, { BoxProps } from '../Box/Box'

export interface ButtonContentProps extends BoxProps {
  size?: SizeValue
}

const ButtonContent = compose(Box, {
  displayName: 'ButtonContent',
  mapPropsToStyles: props => ({ size: props.size }),
  overrideStyles: true,
})

// @ts-ignore
ButtonContent.create = createShorthandFactory({
  // @ts-ignore
  Component: ButtonContent,
  mappedProp: 'content',
})

export default ButtonContent
