import * as React from 'react'
import { Form, Dropdown, Button } from '@stardust-ui/react'

const labelId = 'choose-friend-label'
const fields = [
  {
    label: { content: `Your best friend's name is:`, id: labelId },
    name: 'chooseFriend',
    key: 'choose-friend',
    control: {
      as: Dropdown,
      items: ['John Doe', 'Dohn Joe', 'John Joe', 'Dohn Doe'],
      'aria-labelledby': labelId,
      search: true,
      placeholder: 'Choose a friend',
    },
  },
  { control: { as: Button, content: 'Submit' }, key: 'submit' },
]

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted')
    }}
    fields={fields}
  />
)

export default FormExample
