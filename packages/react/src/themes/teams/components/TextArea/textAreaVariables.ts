import { pxToRem } from '../../../../lib'

export interface TextAreaVariables {
  backgroundColor: string
  backgroundColorInverted: string
  backgroundColorDisabled: string
  colorDisabled: string
  borderColor: string
  borderRadius: string
  borderWidth: string
  fontColor: string
  fontSize: string
  focusBorderColor: string
  placeholderColor: string
  margin: string
  padding: string
}

export default (siteVars): Partial<TextAreaVariables> => ({
  margin: '0',
  padding: `${pxToRem(7)} ${pxToRem(12)}`,

  borderColor: 'transparent',
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,

  backgroundColor: siteVars.colorScheme.default.background2,
  backgroundColorInverted: siteVars.colorScheme.default.background,
  placeholderColor: siteVars.colorScheme.default.foreground1,

  backgroundColorDisabled: siteVars.colorScheme.default.backgroundColorDisabled,
  colorDisabled: siteVars.colorScheme.default.colorDisabled,

  fontColor: siteVars.colorScheme.default.foreground,
  fontSize: siteVars.fontSizes.medium,

  focusBorderColor: `transparent transparent ${siteVars.colorScheme.brand.borderFocus1} transparent`,
})
