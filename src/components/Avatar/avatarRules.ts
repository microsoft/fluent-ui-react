import { pxToRem } from '../../lib'
import { PositionProperty } from 'csstype'

const getAvatarDimension = (size: number) => {
  return 12 + size * 4
}

const getPresenceIndicatorSize = (size: number) => {
  if (size < 3) {
    return 8
  }
  if (size < 6) {
    return 10
  }
  return 14
}

const getPresenceIndicatorTop = (size: number) => {
  return (getAvatarDimension(size) - getPresenceIndicatorSize(size)) / 2
}

export default {
  root: ({ props }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    height: pxToRem(getAvatarDimension(props.size)),
  }),
  imageAvatar: ({ props }) => ({
    width: pxToRem(getAvatarDimension(props.size)),
  }),
  avatarNameContainer: ({ props }) => ({
    display: 'inline-block',
    width: pxToRem(getAvatarDimension(props.size)),
    height: pxToRem(getAvatarDimension(props.size)),
    lineHeight: pxToRem(getAvatarDimension(props.size)),
    fontSize: pxToRem(getAvatarDimension(props.size) / 2),
    verticalAlign: 'middle',
    textAlign: 'center',
  }),
  presenceIndicator: ({ props }) => ({
    position: 'relative' as PositionProperty,
    top: pxToRem(getPresenceIndicatorTop(props.size)),
    left: `-${pxToRem(getPresenceIndicatorSize(props.size))}`,
  }),
}
