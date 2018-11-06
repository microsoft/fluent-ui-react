import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  containerDivBorderRadius: string
  containerDivBorderBottom: string
  containerDivBackgroundColor: string
  containerDivBorderColor: string
  containerDivFocusBorderColor: string
  containerDivFocusBorderRadius: string
  containerDivMinWidth: string
  containerDivMaxWidth: string
  editTextInputFocusBorderColor: string
  fontColor: string
  listItemBackgroundColor: string
  listItemHighlightedBackgroundColor: string
  listItemTextColor: string
  listWidth: string
  toggleButtonSize: string
}

const [_2px_asRem, _3px_asRem] = [2, 3].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  editTextInputFocusBorderColor: 'transparent',
  fontColor: siteVars.bodyColor,

  containerDivBorderRadius: _3px_asRem,
  containerDivBorderBottom: `${_2px_asRem} solid transparent`,
  containerDivBackgroundColor: siteVars.gray10,
  containerDivBorderColor: 'transparent',
  containerDivFocusBorderColor: siteVars.brand,
  containerDivFocusBorderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  containerDivMinWidth: pxToRem(128),
  containerDivMaxWidth: pxToRem(368),

  listItemTextColor: siteVars.white,
  listItemBackgroundColor: siteVars.white,
  listItemHighlightedBackgroundColor: siteVars.brand,

  listWidth: '100%',
  toggleButtonSize: pxToRem(30),
})
