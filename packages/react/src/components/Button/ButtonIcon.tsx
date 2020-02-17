import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Icon, { IconProps } from '../Icon/Icon'

export interface ButtonIconProps extends IconProps {
  loading?: boolean
}

const ButtonIcon = compose(Icon, {
  displayName: 'ButtonIcon',
  mapPropsToStyles: props => ({ loading: props.loading }),
})

// @ts-ignore
ButtonIcon.create = createShorthandFactory({
  // @ts-ignore
  Component: ButtonIcon,
  mappedProp: 'name',
  allowsJSX: false,
})

export default ButtonIcon
