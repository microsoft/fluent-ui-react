import { pxToRem } from '../../lib'

export default {
  root: ({ props }) => ({
    color: 'rgba(0,0,0,.6)',
    textAlign: props.textAlign,
    display: 'block',
    margin: '0px',
  }),
}
