import { pxToRem } from '../../lib'

const getLabelHeight = () => {
  return pxToRem(20)
}

export default {
  root: ({ props, variables }) => ({
    width: 'auto',
    height: getLabelHeight(),
    padding: '0px',
    display: 'inline-block',
    fontSize: pxToRem(14),
    lineHeight: getLabelHeight(),
    backgroundColor: 'rgb(232, 232, 232)',
    color: variables.color,
    borderRadius: pxToRem(3),
    ...(props.circular && {
      borderRadius: variables.circularRadius,
    }),
    overflow: 'hidden',
  }),
}
