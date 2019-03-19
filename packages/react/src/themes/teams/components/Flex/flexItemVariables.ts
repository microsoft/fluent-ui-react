import { pxToRem } from '../../../../lib'

import { FlexItemProps } from '../../../../components/Flex/FlexItem'
import { FlexProps } from 'src/components/Flex/Flex'

type GapValues = Record<FlexProps['gap'], string>
type SizeValues = Record<FlexItemProps['size'], string>

export type FlexItemVariables = GapValues & SizeValues

export default (): FlexItemVariables => ({
  'size.half': '50%',
  'size.quarter': '25%',

  'size.small': pxToRem(150),
  'size.medium': pxToRem(200),
  'size.large': pxToRem(300),

  // GAP VALUES
  'gap.smaller': pxToRem(8),
  'gap.small': pxToRem(10),
  'gap.medium': pxToRem(15),
  'gap.large': pxToRem(30),
})
