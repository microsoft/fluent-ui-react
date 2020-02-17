import { pxToRem } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { AvatarLabelProps } from '../../../../components/Avatar/AvatarLabel'

const sizeToPxValue = {
  smallest: 24,
  smaller: 24,
  small: 24,
  medium: 32,
  large: 36,
  larger: 42,
  largest: 48,
}

const avatarLabelStyles: ComponentSlotStylesPrepared<AvatarLabelProps, any> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[size])
    return {
      alignItems: 'center',
      overflow: 'hidden',

      color: 'rgba(0, 0, 0, 0.6)',
      background: 'rgb(232, 232, 232)',

      borderRadius: '9999px',
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(sizeToPxValue[size] / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0px',
    }
  },
}

export default avatarLabelStyles
