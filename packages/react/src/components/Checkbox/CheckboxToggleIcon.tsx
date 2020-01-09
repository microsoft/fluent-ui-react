import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Icon, { IconProps } from '../Icon/Icon'
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils'

export interface CheckboxToggleIconProps extends IconProps {
  checked?: SupportedIntrinsicInputProps['checked']
  disabled?: SupportedIntrinsicInputProps['disabled']
  labelPosition?: 'start' | 'end'
}

const CheckboxToggleIcon = compose<CheckboxToggleIconProps>(Icon, {
  displayName: 'CheckboxToggleIcon',
  mapPropsToStyles: props => ({
    outline: props.outline,
    checked: props.checked,
    disabled: props.disabled,
    labelPosition: props.labelPosition,
  }),
})

// @ts-ignore
CheckboxToggleIcon.create = createShorthandFactory({
  // @ts-ignore
  Component: CheckboxToggleIcon,
  mappedProp: 'name',
  allowsJSX: false,
})

export default CheckboxToggleIcon
