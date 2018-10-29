import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  fontColor: string
  labelBackgroundColor: string
  containerDivBorderRadius: string
  containerDivBorderBottom: string
  containerDivBackgroundColor: string
  containerDivBorderColor: string
  containerDivFocusBorderColor: string
  containerDivFocusBorderRadius: string
  listItemBackgroundColor: string
  listItemHighlightedBackgroundColor: string
  listItemTextColor: string
  editTextInputFocusBorderColor: string
}

const [_2px_asRem, _3px_asRem] = [2, 3].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  fontColor: siteVars.bodyColor,
  labelBackgroundColor: siteVars.white,

  containerDivBorderRadius: _3px_asRem,
  containerDivBorderBottom: `${_2px_asRem} solid transparent`,
  containerDivBackgroundColor: siteVars.gray10,
  containerDivBorderColor: 'transparent',

  containerDivFocusBorderColor: siteVars.brand,
  containerDivFocusBorderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,

  editTextInputFocusBorderColor: 'transparent',

  listItemTextColor: siteVars.white,
  listItemBackgroundColor: siteVars.white,
  listItemHighlightedBackgroundColor: siteVars.brand,
})
