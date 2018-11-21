import { createComponent } from 'react-fela'
import { pxToRem } from 'src/lib'

const KnobsField = createComponent(() => ({
  display: 'grid',
  gridTemplateColumns: `${pxToRem(60)} auto`,
}))

export default KnobsField
