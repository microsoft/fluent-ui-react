import { pxToRem } from '../../../../lib'

export interface ProviderBoxVariables {
  background: string
  color: string

  scrollbarHeight: string
  scrollbarWidth: string

  scrollbarThumbBackgroundColor: string
  scrollbarThumbBorderRadius: string
  scrollbarThumbBorderSize: string

  scrollbarThumbHoverBackgroundColor: string
  scrollbarThumbHoverBorderSize: string
}

export default (siteVariables): ProviderBoxVariables => ({
  background: siteVariables.bodyBackground,
  color: siteVariables.bodyColor,

  scrollbarHeight: pxToRem(16),
  scrollbarWidth: pxToRem(16),

  scrollbarThumbBackgroundColor: siteVariables.gray06,
  scrollbarThumbBorderRadius: pxToRem(9),
  scrollbarThumbBorderSize: pxToRem(4),

  scrollbarThumbHoverBackgroundColor: siteVariables.gray04,
  scrollbarThumbHoverBorderSize: pxToRem(2),
})
