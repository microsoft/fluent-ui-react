import { createComponent } from 'react-fela'
import { pxToRem } from 'src/lib'

const KnobsControl = createComponent(
  () => ({
    marginRight: pxToRem(5),
    verticalAlign: 'middle',
    textAlign: 'center',
  }),
  'span',
)

export default KnobsControl
