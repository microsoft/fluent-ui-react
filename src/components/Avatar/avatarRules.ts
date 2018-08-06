import { pxToRem } from '../../lib'
import { PositionProperty } from 'csstype'

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

export default {
  root: ({ props: { size } }) => ({
    backgroundColor: 'inherit',
    display: 'inline-block',
    verticalAlign: 'top',
    height: pxToRem(getAvatarDimension(size)),
    width: pxToRem(getAvatarDimension(size)),
  }),
  imageAvatar: ({ props: { size } }) => ({
    width: pxToRem(getAvatarDimension(size)),
    height: pxToRem(getAvatarDimension(size)),
    verticalAlign: 'top !important',
  }),
  avatarNameContainer: ({ props: { size } }) => ({
    display: 'inline-block',
    width: pxToRem(getAvatarDimension(size)),
    height: pxToRem(getAvatarDimension(size)),
    lineHeight: pxToRem(getAvatarDimension(size)),
    fontSize: pxToRem(getAvatarFontSize(size)),
    verticalAlign: 'top',
    textAlign: 'center',
  }),
  presenceIndicatorWrapper: ({ props: { size } }) => ({
    position: 'relative' as PositionProperty,
    top: `-${pxToRem(getPresenceIndicatorWrapperTop(size))}`,
    left: pxToRem(getPresenceIndicatorWrapperLeft(size)),
    display: 'table',
    padding: pxToRem(getPresenceIndicatorWrapperPadding(size)),
    borderRadius: '9999px',
    backgroundColor: 'inherit',
  }),
  presenceIndicator: () => ({
    display: 'table-cell',
  }),
}
