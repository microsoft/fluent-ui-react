import { pxToRem } from '../../../../lib'

export default {
  root: ({ variables: v }) => ({
    display: 'block',
    fontSize: pxToRem(22),
    color: v.color,
    fontWeight: 400,
  }),
}
