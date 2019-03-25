import { pxToRem } from '../../../../lib'
import svgContent from './loaderSvgDataUrl'

type LoaderSizes = 'small' | 'large' | 'medium'

export interface LoaderVariables {
  containerHeights: Record<LoaderSizes, string>
  containerWidths: Record<LoaderSizes, string>

  svgContent: string
  svgHeights: Record<LoaderSizes, string>
  svgTranslatePosition: Record<LoaderSizes, string>
  svgWidths: Record<LoaderSizes, string>
}

export default (): LoaderVariables => ({
  containerHeights: {
    small: pxToRem(38.4),
    medium: pxToRem(57.6),
    large: pxToRem(115.2),
  },
  containerWidths: {
    small: pxToRem(38.4),
    medium: pxToRem(57.6),
    large: pxToRem(115.2),
  },

  svgContent,
  svgHeights: {
    small: pxToRem(2342.4),
    medium: pxToRem(3513),
    large: pxToRem(7027.2),
  },
  svgTranslatePosition: {
    small: pxToRem(-2304),
    medium: pxToRem(-3456),
    large: pxToRem(-6912),
  },
  svgWidths: {
    small: pxToRem(38.4),
    medium: pxToRem(57.6),
    large: pxToRem(115.2),
  },
})
