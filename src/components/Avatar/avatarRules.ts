import { pxToRem } from '../../lib'
import { PositionProperty } from 'csstype'

const getAvatarDimension = (size: number) => {
  return 12 + size * 4
}

const getPresenceIndicatorSize = (size: number) => {
  if (size < 4) {
    return 8
  }
  if (size < 8) {
    return 10
  }
  return 12
}

const getPresenceIndicatorPadding = (size: number, presenceIndicatorPadding: number) => {
  if (size < 4) {
    return presenceIndicatorPadding - 1
  }
  if (size < 8) {
    return presenceIndicatorPadding
  }
  return presenceIndicatorPadding + 1
}

const getPresenceIndicatorLeft = (size: number, presenceIndicatorPadding: number) => {
  return (
    getAvatarDimension(size) -
    getPresenceIndicatorSize(size) -
    getPresenceIndicatorPadding(size, presenceIndicatorPadding)
  )
}

const getPresenceIndicatorTop = (size: number, presenceIndicatorPadding: number, src: string) => {
  // TODO check why we need this ?!
  if (src && size === 1) {
    return (
      getPresenceIndicatorSize(size) * 1.5 +
      getPresenceIndicatorPadding(size, presenceIndicatorPadding) * 2
    )
  }
  return (
    getPresenceIndicatorSize(size) + getPresenceIndicatorPadding(size, presenceIndicatorPadding)
  )
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
  avatarNameContainer: ({ props }) => ({
    width: pxToRem(getAvatarDimension(props.size)),
    height: pxToRem(getAvatarDimension(props.size)),
    lineHeight: pxToRem(getAvatarDimension(props.size)),
    fontSize: pxToRem(getAvatarDimension(props.size) / 2),
    verticalAlign: 'middle',
    textAlign: 'center',
  }),
  presenceIndicatorContainer: ({ props, variables }) => ({
    position: 'relative' as PositionProperty,
    background: 'inherit',
    padding: pxToRem(getPresenceIndicatorPadding(props.size, variables.presenceIndicatorPadding)),
    margin: '0px',
    borderRadius: pxToRem(9999),
    height: pxToRem(
      getPresenceIndicatorSize(props.size) +
        getPresenceIndicatorPadding(props.size, variables.presenceIndicatorPadding) * 2,
    ),
    width: pxToRem(
      getPresenceIndicatorSize(props.size) +
        getPresenceIndicatorPadding(props.size, variables.presenceIndicatorPadding) * 2,
    ),
    top: `-${pxToRem(
      getPresenceIndicatorTop(
        props.size,
        getPresenceIndicatorPadding(props.size, variables.presenceIndicatorPadding),
        props.src,
      ),
    )}`,
    left: pxToRem(
      getPresenceIndicatorLeft(
        props.size,
        getPresenceIndicatorPadding(props.size, variables.presenceIndicatorPadding),
      ),
    ),
  }),
  presenceIndicatorWrapper: ({ props }) => ({
    position: 'relative' as PositionProperty,
    height: pxToRem(getPresenceIndicatorSize(props.size)),
    width: pxToRem(getPresenceIndicatorSize(props.size)),
    padding: '0px',
    lineHeight: pxToRem(getPresenceIndicatorSize(props.size)),
    textAlign: 'center',
    verticalAlign: 'middle',
  }),
  presenceIndicator: () => ({
    margin: 'auto',
    bottom: pxToRem(2),
    position: 'relative' as PositionProperty,
  }),
}
