import { pxToRem } from '../../../../lib'
export interface DropdownVariables {
  backgroundColor: string
  borderColorFocus: string
  borderRadius: string
  borderBottom: string
  color: string
  comboboxPaddingButton: string
  comboboxFlexBasis: string
  listBackgroundColor: string
  listBorderRadius: string
  listPadding: string
  listBoxShadow: string
  listMaxHeight: string
  listItemBackgroundColor: string
  listItemBackgroundColorActive: string
  listItemColorActive: string
  selectedItemsMaxHeight: string
  toggleIndicatorSize: string
  width: string
}

const [_2px_asRem, _3px_asRem, _12px_asRem] = [2, 3, 12].map(v => pxToRem(v))

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.gray10,
  borderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
  borderBottom: `${_2px_asRem} solid transparent`,
  borderColorFocus: siteVars.brand,
  color: siteVars.bodyColor,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: '50px',
  listBackgroundColor: siteVars.white,
  listBorderRadius: _3px_asRem,
  listPadding: `${pxToRem(8)} 0`,
  listBoxShadow: `0 .2rem .6rem 0 ${siteVars.gray06}`,
  listMaxHeight: '20rem',
  listItemBackgroundColor: siteVars.white,
  listItemBackgroundColorActive: siteVars.brand,
  listItemColorActive: siteVars.white,
  selectedItemsMaxHeight: pxToRem(80),
  toggleIndicatorSize: pxToRem(32),
  width: pxToRem(356),
})
