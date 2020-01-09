import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { AvatarProps } from '../../../../components/Avatar/Avatar'

const avatarImageStyles: ComponentSlotStylesPrepared<AvatarProps, any> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    borderColor: v.avatarBorderColor,
    borderStyle: 'solid',
    borderWidth: v.avatarBorderWidth,

    height: '100%',
    objectFit: 'cover',
    verticalAlign: 'top',
    width: '100%',
  }),
}

export default avatarImageStyles
