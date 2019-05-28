import { pxToRem } from '../../../../lib'

export interface ToolbarVariables {
  foreground: string
  background: string
  dividerBorder: string

  foregroundHover: string
  backgroundHover: string
  borderHover: string

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
  backgroundHover: undefined,
  borderHover: siteVars.colors.brand[600],

  itemHeight: pxToRem(32),
  borderWidth: '2px',
  borderRadius: '50%',
  dividerMargin: `${pxToRem(10)} ${pxToRem(4)}`,
})
