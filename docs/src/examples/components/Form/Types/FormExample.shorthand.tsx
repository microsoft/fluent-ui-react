import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

const fields = [
  { label: 'First name', control: Input, name: 'firstName', id: 'first-name', key: 'first-name' },
  { label: 'Last name', control: Input, name: 'lastName', id: 'last-name', key: 'last-name' },
  {
    label: 'I agree to the Terms and Conditions',
    control: 'input',
    type: 'checkbox',
    id: 'conditions',
    key: 'conditions',
  },
  { control: Button, content: 'Submit', key: 'submit' },
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
