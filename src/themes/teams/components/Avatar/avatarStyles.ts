import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IAvatarPropsWithDefaults } from '../../../../components/Avatar/Avatar'

const getAvatarDimension = (size: number) => {
  return 12 + size * 4
}

const getPresenceIndicatorDimension = (size: number) => {
  if (size < 4) {
    return 8
  }
  if (size < 6) {
    return 10
  }
  return 12
}

const getPresenceIndicatorWrapperTop = (size: number) => {
  return (
    getPresenceIndicatorDimension(size) +
    getPresenceIndicatorWrapperPadding(size) +
    getPresenceIndicatorWrapperPadding(size)
  )
}

const getPresenceIndicatorWrapperLeft = (size: number) => {
  return (
    getAvatarDimension(size) -
    getPresenceIndicatorDimension(size) -
    getPresenceIndicatorWrapperPadding(size)
  )
}

const getPresenceIndicatorWrapperPadding = (size: number) => {
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
  presenceIndicatorWrapper: ({
    props: { size },
    variables: v,
  }: {
    props: IAvatarPropsWithDefaults
    variables: any
  }): ICSSInJSStyle => ({
    position: 'relative',
    top: `-${pxToRem(getPresenceIndicatorWrapperTop(size))}`,
    left: pxToRem(getPresenceIndicatorWrapperLeft(size)),
    display: 'table',
    padding: pxToRem(getPresenceIndicatorWrapperPadding(size)),
    borderRadius: '9999px',
    backgroundColor: v.presenceIndicatorBackground,
  }),
  presenceIndicator: (): ICSSInJSStyle => ({
    display: 'table-cell',
  }),
}

export default avatarStyles
