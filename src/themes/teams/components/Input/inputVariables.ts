import { pxToRem } from '../../../../lib'
export interface InputVariables {
  backgroundColor: string
  border: string
  borderBottom: string
  borderRadius: string
  fontColor: string
  fontSize: string
  iconColor: string
  iconPosition: string
  iconRight: string
  inputPadding: string
  inputFocusBorderColor: string
  inputFocusBorderRadius: string
}

const [_2px_asRem, _3px_asRem, _6px_asRem, _12px_asRem, _24px_asRem] = [2, 3, 6, 12, 24].map(v =>
  pxToRem(v),
)

export default (siteVars): InputVariables => ({
  backgroundColor: siteVars.gray10,
  border: '0',
  borderBottom: `${_2px_asRem} solid transparent`,
  borderRadius: _3px_asRem,

  fontColor: siteVars.bodyColor,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: _2px_asRem,
  iconColor: siteVars.bodyColor,

  inputPadding: `${_6px_asRem} ${_24px_asRem} ${_6px_asRem} ${_12px_asRem}`,
  inputFocusBorderColor: siteVars.brand,
  inputFocusBorderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
})
