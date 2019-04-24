import { pxToRem } from '../../../../lib'
import { ProviderBoxVariables as BaseProviderBoxVariables } from '../../../base/components/Provider/providerBoxVariables'

export interface ProviderBoxVariables extends BaseProviderBoxVariables {
  scrollbarHeight: string
  scrollbarWidth: string

  scrollbarThumbBackgroundColor: string
  scrollbarThumbBorderRadius: string
  scrollbarThumbBorderSize: string

  scrollbarThumbHoverBackgroundColor: string
  scrollbarThumbHoverBorderSize: string
}

export default (siteVariables): Partial<ProviderBoxVariables> => ({
  scrollbarHeight: pxToRem(16),
  scrollbarWidth: pxToRem(16),

  scrollbarThumbBackgroundColor: siteVariables.gray06,
  scrollbarThumbBorderRadius: pxToRem(9),
  scrollbarThumbBorderSize: pxToRem(4),

  scrollbarThumbHoverBackgroundColor: siteVariables.gray04,
  scrollbarThumbHoverBorderSize: pxToRem(2),
})
