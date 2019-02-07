import { pxToRem } from '../../../../lib'
import { FlexProps } from '../../../../components/Flex/Flex'

type GapValues = { [Key in FlexProps['gap']]: string }
type PaddingValues = { [Key in FlexProps['padding']]: string }

export type FlexVariables = GapValues & PaddingValues

export default (): FlexVariables => ({
  // GAP VALUES
  'gap.small': pxToRem(10),
  'gap.medium': pxToRem(15),
  'gap.large': pxToRem(30),

  // PADDING VALUES
  'padding.medium': pxToRem(10),
})
