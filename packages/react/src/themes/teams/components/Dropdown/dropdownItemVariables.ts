import dropdownVariables from './dropdownVariables'

export interface DropdownItemVariables {
  headerLineHeight: string
  contentLineHeight: string
}

export default (siteVariables): DropdownItemVariables => ({
  // Header
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerLineHeight: siteVariables.lineHeightSmall,
  contentLineHeight: siteVariables.lineHeightSmall,
  ...dropdownVariables,
})
