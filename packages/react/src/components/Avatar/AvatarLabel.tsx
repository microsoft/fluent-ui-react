import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory, SizeValue } from '../../utils'
import Box, { BoxProps } from '../Box/Box'

export interface AvatarLabelProps extends BoxProps {
  size?: SizeValue
}

const AvatarLabel = compose(Box, {
  displayName: 'AvatarLabel',
  mapPropsToStyles: props => ({ size: props.size }),
})

// @ts-ignore
AvatarLabel.create = createShorthandFactory({
  // @ts-ignore
  Component: AvatarLabel,
  mappedProp: 'content',
})

export default AvatarLabel
