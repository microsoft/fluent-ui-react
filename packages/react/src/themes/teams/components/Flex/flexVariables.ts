import { pxToRem } from '../../../../lib'
import { FlexGap, FlexPadding } from '../../../../components/Flex/Flex'

type GapValues = { [Key in FlexGap]: string }
type PaddingValues = { [Key in FlexPadding]: string }

export type FlexVariables = GapValues & PaddingValues

export default (): FlexVariables => ({
  // GAP VALUES
  'gap.small': pxToRem(10),
  'gap.medium': pxToRem(15),
  'gap.large': pxToRem(30),

  // PADDING VALUES
  'padding.medium': pxToRem(10),
})
