import { pxToRem } from '../../../../lib'

export interface InputVariables {
  borderRadius: string
  borderBottom: string
  backgroundColor: string
  fontColor: string
  fontSize: string
  iconPosition: string
  iconRight: string
  iconLeft: string
  inputPaddingWithIconOnStart: string
  inputPaddingWithIconOnEnd: string
  inputPadding: string
  inputFocusBorderColor: string
  inputFocusBorderRadius: string
}

const [_2px_asRem, _3px_asRem, _6px_asRem, _12px_asRem, _24px_asRem] = [2, 3, 6, 12, 24].map(v =>
  pxToRem(v),
)

export default (siteVars): InputVariables => ({
  borderRadius: _3px_asRem,
  borderBottom: `${_2px_asRem} solid transparent`,
  backgroundColor: siteVars.gray10,

  fontColor: siteVars.bodyColor,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: _2px_asRem,
  iconLeft: _6px_asRem,
  inputPaddingWithIconOnStart: `${_6px_asRem} ${_12px_asRem} ${_6px_asRem} ${_24px_asRem}`,
  inputPaddingWithIconOnEnd: `${_6px_asRem} ${_24px_asRem} ${_6px_asRem} ${_12px_asRem}`,

  inputPadding: `${_6px_asRem} ${_12px_asRem} ${_6px_asRem} ${_12px_asRem}`,
  inputFocusBorderColor: siteVars.brand,
  inputFocusBorderRadius: `${_3px_asRem} ${_3px_asRem} ${_2px_asRem} ${_2px_asRem}`,
})
