import { createComponent } from 'react-fela'
import { pxToRem } from 'src/lib'

const KnobsField = createComponent(({ width = 60 }: { width?: number }) => ({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: `${pxToRem(width)} auto`,
}))

export default KnobsField
