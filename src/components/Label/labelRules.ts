import { pxToRem } from '../../lib'

export default {
  root: ({ props, variables }) => ({
    padding: variables.padding,
    fontWeight: '500',
    backgroundColor: 'rgb(232, 232, 232)',
    color: 'rgba(0, 0, 0, 0.6)',
    borderRadius: pxToRem(3),
    ...(props.circular && {
      borderRadius: variables.circularRadius,
    }),
  }),
  icon: ({ props }) => ({
    position: 'relative',
    top: '-0.15em',
    ...((props.onIconClick ||
      (props.icon && typeof props.icon === 'object' && props.icon.onClick)) && {
      cursor: 'pointer',
    }),
  }),
}
