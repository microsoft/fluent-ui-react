import { pxToRem } from '../../../../lib'

import { FlexItemSize } from '../../../../components/Flex/FlexItem'

type SizeValues = { [Key in FlexItemSize]: string }

export type FlexVariables = SizeValues

export default (): FlexVariables => ({
  'size.half': '50%',
  'size.quater': '25%',

  'size.small': pxToRem(150),
  'size.medium': pxToRem(200),
})
