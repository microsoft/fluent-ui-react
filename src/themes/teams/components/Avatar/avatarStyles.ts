import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IAvatarPropsWithDefaults } from '../../../../components/Avatar/Avatar'

const getAvatarDimension = (size: number) => {
  return 12 + size * 4
}

const getStatusIndicatorDimension = (size: number) => {
  if (size < 4) {
    return 8
  }
  if (size < 6) {
    return 10
  }
  return 12
}

const getStatusIndicatorWrapperTop = (size: number) => {
  return (
    getStatusIndicatorDimension(size) +
    getStatusIndicatorWrapperPadding(size) +
    getStatusIndicatorWrapperPadding(size)
  )
}

const getStatusIndicatorWrapperLeft = (size: number) => {
  return (
    getAvatarDimension(size) -
    getStatusIndicatorDimension(size) -
    getStatusIndicatorWrapperPadding(size)
  )
}

const getStatusIndicatorWrapperPadding = (size: number) => {
  if (size < 6) {
    return 2
  }
  return 3
}

const getAvatarFontSize = (size: number) => {
  if (size < 5) {
    return getAvatarDimension(size) / 3
  }
  if (size < 8) {
    return getAvatarDimension(size) / 2.5
  }
  return getAvatarDimension(size) / 2
}

const avatarStyles: IComponentPartStylesInput = {
  root: ({
    props: { size },
  }: {
    props: IAvatarPropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    backgroundColor: 'inherit',
    display: 'inline-block',
    verticalAlign: 'top',
    height: pxToRem(getAvatarDimension(size)),
    width: pxToRem(getAvatarDimension(size)),
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
    width: pxToRem(getAvatarDimension(size)),
    height: pxToRem(getAvatarDimension(size)),
    lineHeight: pxToRem(getAvatarDimension(size)),
    fontSize: pxToRem(getAvatarFontSize(size)),
    verticalAlign: 'top',
    textAlign: 'center',
  }),
  statusIndicator: ({
    props: { size },
    variables: v,
  }: {
    props: IAvatarPropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    position: 'relative',
    top: `-${pxToRem(getStatusIndicatorWrapperTop(size))}`,
    left: pxToRem(getStatusIndicatorWrapperLeft(size)),
    backgroundColor: v.statusIndicatorBackground,
  }),
}

export default avatarStyles
