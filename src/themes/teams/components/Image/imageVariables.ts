import { pxToRem } from '../../../../lib'

export interface IImageVariables {
  width: string
  height: string
  avatarRadius: string
  avatarSize: string
}

export default (): IImageVariables => ({
  width: '100%',
  height: '100%',
  avatarRadius: pxToRem(9999),
  avatarSize: pxToRem(32),
})
