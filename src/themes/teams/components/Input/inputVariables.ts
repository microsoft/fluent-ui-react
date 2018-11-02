import { pxToRem } from '../../../../lib'
export interface InputVariables {
  backgroundColor: string
  border: string
  borderRadius: string
  boxShadow: string
  fontColor: string
  fontSize: string
  iconColor: string
  iconPosition: string
  iconRight: string
  inputPadding: string
  inputFocusBorderBottomColor: string
  inputFocusBorderRadius: string
}

const [_1px_asRem, _2px_asRem, _3px_asRem, _6px_asRem, _12px_asRem, _24px_asRem] = [
  1,
  2,
  3,
  6,
  12,
  24,
].map(v => pxToRem(v))

export default (siteVars): InputVariables => ({
  backgroundColor: siteVars.gray10,
  border: `${_1px_asRem} solid transparent`,
  borderRadius: _3px_asRem,
  boxShadow: `0 ${_1px_asRem} 0 ${siteVars.brand}`,

  fontColor: siteVars.bodyColor,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: _2px_asRem,
  iconColor: siteVars.bodyColor,

  inputPadding: `${_6px_asRem} ${_24px_asRem} ${_6px_asRem} ${_12px_asRem}`,
  inputFocusBorderBottomColor: siteVars.brand,
  inputFocusBorderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
})
