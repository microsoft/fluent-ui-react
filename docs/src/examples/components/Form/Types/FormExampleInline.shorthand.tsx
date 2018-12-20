import * as React from 'react'
import { Form, Button } from '@stardust-ui/react'

const fields = [
  {
    label: 'First name',
    name: 'firstName',
    id: 'first-name-inline-shorthand',
    key: 'first-name',
    required: true,
    inline: true,
  },
  {
    label: 'Last name',
    name: 'lastName',
    id: 'last-name-inline-shorthand',
    key: 'last-name',
    required: true,
    inline: true,
  },
  {
    label: 'I agree to the Terms and Conditions',
    control: { as: 'input' },
    type: 'checkbox',
    id: 'conditions-inline-shorthand',
    key: 'conditions',
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
