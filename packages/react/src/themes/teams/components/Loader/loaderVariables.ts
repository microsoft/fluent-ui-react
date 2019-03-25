import { pxToRem, SizeValue } from '../../../../lib'
import svgContent from './loaderSvgDataUrl'

export interface LoaderVariables {
  containerHeights: Record<SizeValue, string>
  containerWidths: Record<SizeValue, string>

  svgContent: string
  svgHeights: Record<SizeValue, string>
  svgTranslatePosition: Record<SizeValue, string>
  svgWidths: Record<SizeValue, string>
}

export default (): LoaderVariables => ({
  containerHeights: {
    smallest: pxToRem(38.4),
    smaller: pxToRem(38.4),
    small: pxToRem(38.4),
    medium: pxToRem(57.6),
    large: pxToRem(115.2),
    larger: pxToRem(115.2),
    largest: pxToRem(115.2),
  },
  containerWidths: {
    smallest: pxToRem(38.4),
    smaller: pxToRem(38.4),
    small: pxToRem(38.4),
    medium: pxToRem(57.6),
    large: pxToRem(115.2),
    larger: pxToRem(115.2),
    largest: pxToRem(115.2),
  },

  svgContent,
  svgHeights: {
    smaller: pxToRem(2342.4),
    smallest: pxToRem(2342.4),
    small: pxToRem(2342.4),
    medium: pxToRem(3513),
    large: pxToRem(7027.2),
    larger: pxToRem(7027.2),
    largest: pxToRem(7027.2),
  },
  svgTranslatePosition: {
    smallest: pxToRem(-2304),
    smaller: pxToRem(-2304),
    small: pxToRem(-2304),
    medium: pxToRem(-3456),
    large: pxToRem(-6912),
    larger: pxToRem(-6912),
    largest: pxToRem(-6912),
  },
  svgWidths: {
    smallest: pxToRem(38.4),
    smaller: pxToRem(38.4),
    small: pxToRem(38.4),
    medium: pxToRem(57.6),
    large: pxToRem(115.2),
    larger: pxToRem(115.2),
    largest: pxToRem(115.2),
  },
})
