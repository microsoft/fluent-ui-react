import { List, Checkbox, checkboxMultiselectBehavior } from '@fluentui/react'
import * as React from 'react'

const CheckboxLisboxExample = () => (
  <List selectable aria-multiselectable={true}>
    <Checkbox label="Option 1" accessibility={checkboxMultiselectBehavior} />
    <Checkbox label="Option 2" accessibility={checkboxMultiselectBehavior} />
    <Checkbox label="Option 3" accessibility={checkboxMultiselectBehavior} />
    <Checkbox label="Option 4" accessibility={checkboxMultiselectBehavior} />
  </List>
)

export default CheckboxLisboxExample
