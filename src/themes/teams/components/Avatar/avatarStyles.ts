import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IAvatarPropsWithDefaults } from '../../../../components/Avatar/Avatar'

const avatarStyles: IComponentPartStylesInput<IAvatarPropsWithDefaults, any> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const remSize = pxToRem(size)
    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: remSize,
      width: remSize,
    }
  },
  image: (): ICSSInJSStyle => ({
    verticalAlign: 'top',
  }),
  label: ({ props: { size } }): ICSSInJSStyle => {
    const remSize = pxToRem(size)
    return {
      display: 'inline-block',
      width: remSize,
      height: remSize,
      lineHeight: remSize,
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
