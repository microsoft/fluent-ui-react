import { pxToRem } from '../../../../lib'
import svgContent from './tooltipPointerSvgUrl'

export interface TooltipContentVariables {
  boxShadowStart: string
  boxShadowColor: string
  boxShadowEnd: string

  borderRadius: string
  borderSize: string
  padding: string
  svgContent: string

  maxWidth: string

  pointerMargin: string
  pointerOffset: string
  pointerWidth: string
  pointerHeight: string
}

export default (siteVars: any): TooltipContentVariables => {
  return {
    boxShadowStart: '0 2px 4px 0',
    boxShadowEnd: '0 2px 10px 0',
    boxShadowColor: siteVars.colors.grey[250],
    borderRadius: pxToRem(3),
    borderSize: '1px',
    svgContent,
    padding: `${pxToRem(5)} ${pxToRem(12)} ${pxToRem(7)} ${pxToRem(12)}`,

    maxWidth: pxToRem(246),

    pointerOffset: pxToRem(5),
    pointerMargin: pxToRem(10),
    pointerWidth: pxToRem(3),
    pointerHeight: pxToRem(8),
  }
}
