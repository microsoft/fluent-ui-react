import { pxToRem } from '../../../../lib'

export interface AvatarVariables {
  avatarBorderColor: string
  avatarBorderWidth: string
  statusBorderColor: string
  statusBorderWidth: string

  smallest: string
  smaller: string
  small: string
  medium: string
  large: string
  larger: string
  largest: string
}

export default (siteVariables): AvatarVariables => ({
  avatarBorderColor: '',
  avatarBorderWidth: '0',
  statusBorderColor: siteVariables.bodyBackground,
  statusBorderWidth: '2px',

  smallest: pxToRem(24),
  smaller: pxToRem(24),
  small: pxToRem(24),
  medium: pxToRem(32),
  large: pxToRem(36),
  larger: pxToRem(42),
  largest: pxToRem(48),
})
