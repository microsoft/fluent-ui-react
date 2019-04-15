import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { VideoProps } from '../../../../components/Video/Video'
import { VideoVariables } from './videoVariables'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: v.width,
    height: v.height || 'auto',
  }),
} as ComponentSlotStylesInput<VideoProps, VideoVariables>
