import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  backgroundColor: string
  containerDivBorderRadius: string
  containerDivBorderBottom: string
  containerDivBorderColor: string
  containerDivColor: string
  containerDivFocusBorderColor: string
  containerDivFocusBorderRadius: string
  editTextFlexBasis: string
  listItemBackgroundColor: string
  listItemHighlightedBackgroundColor: string
  listItemHighlightedTextColor: string
  listMaxHeight: string
  toggleButtonSize: string
  width: string
}

const [_2px_asRem, _3px_asRem] = [2, 3].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.gray10,

  containerDivBorderRadius: _3px_asRem,
  containerDivBorderBottom: `${_2px_asRem} solid transparent`,
  containerDivBorderColor: 'transparent',
  containerDivColor: siteVars.bodyColor,
  containerDivFocusBorderColor: siteVars.brand,
  containerDivFocusBorderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  editTextFlexBasis: '100px',

  listItemBackgroundColor: siteVars.white,
  listItemHighlightedBackgroundColor: siteVars.brand,
  listItemHighlightedTextColor: siteVars.white,
  listMaxHeight: '20rem',

  toggleButtonSize: pxToRem(30),
  width: pxToRem(356),
})
