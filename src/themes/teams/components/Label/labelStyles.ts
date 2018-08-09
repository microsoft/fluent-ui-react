import { pxToRem } from '../../../../lib'

const getLabelHeight = () => {
  return pxToRem(20)
}

export default {
  root: ({ props: { start, end, circular }, variables }) => ({
    padding: variables.padding,
    ...(start && {
      paddingLeft: variables.startPaddingLeft,
    }),
    ...(end && {
      paddingRight: variables.endPaddingRight,
    }),
    display: 'inline-flex',
    alignItems: 'center',
    height: getLabelHeight(),
    margin: `${pxToRem(4)} 0 0 ${pxToRem(4)}`,
    fontSize: pxToRem(14),
    lineHeight: getLabelHeight(),
    backgroundColor: variables.backgroundColor,
    color: variables.color,
    borderRadius: pxToRem(3),
    ...(circular && {
      borderRadius: variables.circularRadius,
    }),
    overflow: 'hidden',
  }),
}
