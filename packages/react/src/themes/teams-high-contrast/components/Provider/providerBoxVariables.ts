import { ProviderBoxVariables } from '../../../teams/components/Provider/providerBoxVariables'

export default (siteVariables): Partial<ProviderBoxVariables> => ({
  scrollbarThumbBackgroundColor: siteVariables.colors.black,
  scrollbarThumbHoverBackgroundColor: siteVariables.colors.white,
})
