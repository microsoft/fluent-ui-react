import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'

const labelStyles = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    padding: variables.padding,
    fontWeight: 500,
    backgroundColor: 'rgb(232, 232, 232)',
    color: variables.color,
    borderRadius: pxToRem(3),
    ...(props.circular && {
      borderRadius: variables.circularRadius,
    }),
  }),
  icon: ({ props }): ICSSInJSStyle => ({
    position: 'relative',
    top: '-0.15em',
    ...((props.onIconClick ||
      (props.icon && typeof props.icon === 'object' && props.icon.onClick)) && {
      cursor: 'pointer',
    }),
  }),
}

export default labelStyles
