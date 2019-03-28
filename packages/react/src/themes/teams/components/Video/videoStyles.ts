import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { VideoProps } from '../../../../components/Video/Video'

export default {
  root: ({ props, variables }): ICSSInJSStyle => ({
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'middle',
    width: variables.width,
    height: variables.height || 'auto',
  }),
} as ComponentSlotStylesInput<VideoProps, any>
