import React from 'react'
import { RadioGroup } from '@stardust-ui/react'

const RadioGroupItemExampleCheckedShorthand = () => (
  <RadioGroup
    defaultCheckedValue="1"
    items={[<RadioGroup.Item key="1" label="This radio comes pre-checked" value="1" />]}
  />
)

export default RadioGroupItemExampleCheckedShorthand
