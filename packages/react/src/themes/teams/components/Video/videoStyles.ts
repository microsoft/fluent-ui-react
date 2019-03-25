import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ImageProps } from '../../../../components/Image/Image'

export default {
  root: ({ props, variables }): ICSSInJSStyle => ({
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'middle',
    width: variables.width,
    height: variables.height || 'auto',
  }),
} as ComponentSlotStylesInput<ImageProps, any>
