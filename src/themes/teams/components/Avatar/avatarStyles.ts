import { teamsPxToRem } from '../../utils'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IAvatarPropsWithDefaults } from '../../../../components/Avatar/Avatar'

const avatarStyles: IComponentPartStylesInput<IAvatarPropsWithDefaults, any> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = teamsPxToRem(size)
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
    const sizeInRem = teamsPxToRem(size)
    return {
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: teamsPxToRem(size / 2.333),
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
