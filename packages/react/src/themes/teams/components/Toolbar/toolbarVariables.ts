import { pxToRem } from '../../../../lib'

export interface ToolbarVariables {
  foreground: string
  background: string
  dividerBorder: string

  foregroundHover: string
  backgroundHover: string
  borderHover: string

  foregroundActive: string
  backgroundActive: string

  foregroundDisabled: string
  backgroundDisabled: string

  itemHeight: string
  borderWidth: string
  borderRadius: string
  dividerMargin: string
}

export default (siteVars: any): ToolbarVariables => ({
  foreground: siteVars.colors.grey[500],
  background: 'transparent',
  dividerBorder: siteVars.colors.grey[200],

  foregroundHover: siteVars.colors.brand[600],
  backgroundHover: 'transparent',
  borderHover: siteVars.colors.brand[600],

  foregroundActive: siteVars.colors.brand[600],
  backgroundActive: 'transparent',

  foregroundDisabled: siteVars.colors.grey[250],
  backgroundDisabled: 'transparent',

  itemHeight: pxToRem(32),
  borderWidth: '2px',
  borderRadius: '50%',
  dividerMargin: `${pxToRem(10)} ${pxToRem(4)}`,
})
