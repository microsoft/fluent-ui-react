import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IAvatarPropsWithDefaults } from '../../../../components/Avatar/Avatar'

const avatarStyles: IComponentPartStylesInput = {
  root: ({
    props: { size },
  }: {
    props: IAvatarPropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    position: 'relative',
    backgroundColor: 'inherit',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: pxToRem(size),
    width: pxToRem(size),
  }),
  imageAvatar: (): ICSSInJSStyle => ({
    verticalAlign: 'top',
  }),
  avatarNameContainer: ({
    props: { size },
  }: {
    props: IAvatarPropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    display: 'inline-block',
    width: pxToRem(size),
    height: pxToRem(size),
    lineHeight: pxToRem(size),
    fontSize: pxToRem(size / 2.333),
    verticalAlign: 'top',
    textAlign: 'center',
  }),
  statusIndicator: (): ICSSInJSStyle => ({
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
  }),
}

export default avatarStyles
