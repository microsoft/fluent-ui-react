import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Text, { TextProps } from '../Text/Text'

export interface CheckboxLabelProps extends TextProps {
  labelPosition?: 'start' | 'end'
}

const CheckboxLabel = compose<CheckboxLabelProps>(Text, {
  displayName: 'CheckboxLabel',
  mapPropsToStyles: props => ({ labelPosition: props.labelPosition }),
})

// @ts-ignore
CheckboxLabel.create = createShorthandFactory({
  // @ts-ignore
  Component: CheckboxLabel,
  mappedProp: 'content',
})

export default CheckboxLabel
