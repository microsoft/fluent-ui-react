import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { AvatarProps } from '../../../../components/Avatar/Avatar'

const avatarStatusStyles: ComponentSlotStylesPrepared<AvatarProps, any> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${v.statusBorderWidth} ${v.statusBorderColor}`,
  }),
}

export default avatarStatusStyles
