import * as React from 'react'

import { updateForKeys } from 'docs/src/hoc'
import LabelledButton from './ComponentButton'

const ComponentControlsMaximize: any = () => (
  <LabelledButton iconName="external alternate" label="Popout" active={false} />
)

export default updateForKeys(['examplePath'])(ComponentControlsMaximize)
