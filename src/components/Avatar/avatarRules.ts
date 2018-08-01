import { pxToRem } from '../../lib'
import { PositionProperty } from 'csstype'

const getAvatarDimension = (size: number) => {
  return 12 + size * 4
}

const getPresenceIconSize = (size: number) => {
  if (size < 4) {
    return 8
  }
  if (size < 8) {
    return 10
  }
  return 12
}

const getPresenceIconPadding = (size: number, presenceIconPadding: number) => {
  if (size < 4) {
    return presenceIconPadding - 1
  }
  if (size < 8) {
    return presenceIconPadding
  }
  return presenceIconPadding + 1
}

const getPresenceSpanLeft = (size: number, presenceIconPadding: number) => {
  return (
    getAvatarDimension(size) -
    getPresenceIconSize(size) -
    getPresenceIconPadding(size, presenceIconPadding)
  )
}

const getPresenceSpanTop = (size: number, presenceIconPadding: number, src: string) => {
  // TODO check why we need this ?!
  if (src && size === 1) {
    return getPresenceIconSize(size) * 1.5 + getPresenceIconPadding(size, presenceIconPadding) * 2
  }
  return getPresenceIconSize(size) + getPresenceIconPadding(size, presenceIconPadding)
}

export default {
  root: ({ props }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    background: 'inherit',
    height: pxToRem(getAvatarDimension(props.size)),
  }),
  imageAvatar: ({ props }) => ({
    width: pxToRem(getAvatarDimension(props.size)),
  }),
  avatarLabel: ({ props }) => ({
    width: pxToRem(getAvatarDimension(props.size)),
    height: pxToRem(getAvatarDimension(props.size)),
    lineHeight: pxToRem(getAvatarDimension(props.size)),
    fontSize: pxToRem(getAvatarDimension(props.size) / 2),
    verticalAlign: 'middle',
    textAlign: 'center',
  }),
  presenceDiv: ({ props, variables }) => ({
    position: 'relative' as PositionProperty,
    background: 'inherit',
    padding: pxToRem(getPresenceIconPadding(props.size, variables.presenceIconPadding)),
    margin: '0px',
    borderRadius: pxToRem(9999),
    height: pxToRem(
      getPresenceIconSize(props.size) +
        getPresenceIconPadding(props.size, variables.presenceIconPadding) * 2,
    ),
    width: pxToRem(
      getPresenceIconSize(props.size) +
        getPresenceIconPadding(props.size, variables.presenceIconPadding) * 2,
    ),
    top: `-${pxToRem(
      getPresenceSpanTop(
        props.size,
        getPresenceIconPadding(props.size, variables.presenceIconPadding),
        props.src,
      ),
    )}`,
    left: pxToRem(
      getPresenceSpanLeft(
        props.size,
        getPresenceIconPadding(props.size, variables.presenceIconPadding),
      ),
    ),
  }),
  presenceIconLabel: ({ props }) => ({
    position: 'relative' as PositionProperty,
    height: pxToRem(getPresenceIconSize(props.size)),
    width: pxToRem(getPresenceIconSize(props.size)),
    padding: '0px',
    lineHeight: pxToRem(getPresenceIconSize(props.size)),
    textAlign: 'center',
    verticalAlign: 'middle',
  }),
  presenceIcon: () => ({
    margin: 'auto',
    bottom: pxToRem(2),
    position: 'relative' as PositionProperty,
  }),
}
