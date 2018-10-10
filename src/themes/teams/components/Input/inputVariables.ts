import { pxToRem } from '../../../../lib'
export interface IInputVariables {
  borderRadius: string
  borderBottom: string
  backgroundColor: string
  fontColor: string
  fontSize: string
  iconPosition: string
  iconRight: string
  inputPadding: string
  inputFocusBorderColor: string
  inputFocusBorderRadius: string
}

const [px2asRem, px3asRem, px6asRem, px12asRem, px24asRem] = [2, 3, 6, 12, 24].map(v => pxToRem(v))

export default (siteVars): IInputVariables => ({
  borderRadius: px3asRem,
  borderBottom: `${px2asRem} solid transparent`,
  backgroundColor: siteVars.gray10,

  fontColor: siteVars.bodyColor,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: pxToRem(2),

  inputPadding: `${px6asRem} ${px24asRem} ${px6asRem} ${px12asRem}`,
  inputFocusBorderColor: siteVars.brand,
  inputFocusBorderRadius: `${px3asRem} ${px3asRem} ${px2asRem} ${px2asRem}`,
})
