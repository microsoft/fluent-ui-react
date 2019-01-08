import { pxToRem } from '../../../../lib'
import { LoaderSize } from '../../../../components/Loader/Loader'

export interface LoaderVariables {
  foregroundColor: string
  backgroundColor: string

  borderSizes: Record<LoaderSize, string>
  indicatorSizes: Record<LoaderSize, string>
}

export default (siteVariables): LoaderVariables => ({
  foregroundColor: siteVariables.colors.grey[400],
  backgroundColor: siteVariables.colors.grey[100],

  borderSizes: {
    smallest: pxToRem(1.5),
    small: pxToRem(2),
    smaller: pxToRem(2),

    medium: pxToRem(2),

    large: pxToRem(2.5),
    larger: pxToRem(3),
    largest: pxToRem(4),
  },
  indicatorSizes: {
    smallest: pxToRem(16),
    small: pxToRem(20),
    smaller: pxToRem(22),

    medium: pxToRem(24),

    large: pxToRem(26),
    larger: pxToRem(30),
    largest: pxToRem(34),
  },
})
