import { PxToRemFunc } from '../../../types'

export default (siteVariables, pxToRem: PxToRemFunc) => ({
  width: undefined,
  height: undefined,
  avatarRadius: pxToRem(9999),
  avatarSize: pxToRem(32),
})
