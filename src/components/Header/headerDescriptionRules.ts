import { pxToRem } from '../../lib'

export default {
  root: () => ({
    display: 'block',
    fontSize: pxToRem(22),
    color: 'rgba(0,0,0,.6)',
    fontWeight: 400,
  }),
}
