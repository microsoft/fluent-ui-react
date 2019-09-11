import { pxToRem } from '../../../../lib'
import { ResizeProperty } from 'csstype'

export interface TextAreaVariables {
  backgroundColor: string
  backgroundColorInverted: string
  borderColor: string
  borderRadius: string
  borderWidth: string
  fontColor: string
  fontSize: string
  focusBorderColor: string
  placeholderColor: string
  margin: string
  resize: ResizeProperty
}

export default (siteVars): Partial<TextAreaVariables> => ({
  margin: '0',
  resize: 'none',

  borderColor: 'transparent',
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  backgroundColor: siteVars.colorScheme.default.background2,
  backgroundColorInverted: siteVars.colorScheme.default.background,

  fontColor: siteVars.colorScheme.default.foreground,
  fontSize: siteVars.fontSizes.medium,

  focusBorderColor: `transparent transparent ${siteVars.colorScheme.brand.borderFocus1} transparent`,
  placeholderColor: siteVars.colorScheme.default.foreground1,
})
