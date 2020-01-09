import { pxToRem } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { AvatarProps } from '../../../../components/Avatar/Avatar'
import { AvatarVariables } from './avatarVariables'

export type AvatarStylesProps = Pick<AvatarProps, 'size'>

const sizeToPxValue = {
  smallest: 24,
  smaller: 24,
  small: 24,
  medium: 32,
  large: 36,
  larger: 42,
  largest: 48,
}

const avatarStyles: ComponentSlotStylesPrepared<AvatarStylesProps, AvatarVariables> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[size])

    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: sizeInRem,
      width: sizeInRem,
    }
  },
}

export default avatarStyles
