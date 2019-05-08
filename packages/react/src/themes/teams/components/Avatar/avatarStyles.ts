import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AvatarProps } from '../../../../components/Avatar/Avatar'

const sizeToPxValue = {
  smallest: 24,
  smaller: 24,
  small: 24,
  medium: 32,
  large: 36,
  larger: 42,
  largest: 48,
}

const avatarStyles: ComponentSlotStylesInput<AvatarProps, any> = {
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
  image: ({ variables: v }): ICSSInJSStyle => ({
    borderColor: v.avatarBorderColor,
    borderStyle: 'solid',
    borderWidth: `${v.avatarBorderWidth}px`,

    height: '100%',
    objectFit: 'cover',
    verticalAlign: 'top',
    width: '100%',
  }),
  label: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[size])
    return {
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
  status: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${pxToRem(v.statusBorderWidth)} ${v.statusBorderColor}`,
  }),
}

export default avatarStyles
