import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AvatarPropsWithDefaults } from '../../../../components/Avatar/Avatar'

const avatarStyles: ComponentSlotStylesInput<AvatarPropsWithDefaults, any> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(size)
    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: sizeInRem,
      width: sizeInRem,
    }
  },
  image: (): ICSSInJSStyle => ({
    verticalAlign: 'top',
  }),
  label: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(size)
    return {
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(size / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0px',
    }
  },
  status: ({ props, variables }): ICSSInJSStyle => ({
    position: 'absolute',
    bottom: `-${variables.statusBorderWidth}px`,
    right: `-${variables.statusBorderWidth}px`,
  }),
}

export default avatarStyles
