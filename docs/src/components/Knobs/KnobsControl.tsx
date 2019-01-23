import { createComponent } from 'react-fela'
import { TextAlignProperty } from 'csstype'
import { pxToRem } from 'src/lib'

const KnobsControl = createComponent(
  ({ textAlign = 'initial' }: { textAlign?: TextAlignProperty }) => ({
    marginRight: pxToRem(5),
    verticalAlign: 'middle',
    textAlign,
  }),
  'span',
)

export default KnobsControl
