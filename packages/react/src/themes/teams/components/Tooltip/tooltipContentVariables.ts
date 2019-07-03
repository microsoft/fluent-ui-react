import { pxToRem } from '../../../../lib'

export interface TooltipContentVariables {
  boxShadowStart: string
  boxShadowColor: string
  boxShadowEnd: string

  borderRadius: string
  borderSize: string
  padding: string

  maxWidth: string

  pointerMargin: string
  pointerOffset: string
  pointerWidth: string
  pointerHeight: string

  color: string
  backgroundColor: string
}

export default (siteVars: any): TooltipContentVariables => ({
  boxShadowStart: '0 2px 4px 0',
  boxShadowEnd: '0 2px 10px 0',
  boxShadowColor: siteVars.colors.grey[250],
  borderRadius: pxToRem(3),
  borderSize: '1px',
  padding: `${pxToRem(5)} ${pxToRem(12)} ${pxToRem(7)} ${pxToRem(12)}`,

  maxWidth: pxToRem(246),

  pointerOffset: pxToRem(16),
  pointerMargin: pxToRem(6),
  pointerWidth: pxToRem(6),
  pointerHeight: pxToRem(16),
  color: siteVars.colorScheme.default.foreground3,
  backgroundColor: siteVars.colors.grey[500],
})
