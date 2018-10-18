import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

const fields = [
  {
    label: 'First name',
    controlType: Input,
    name: 'firstName',
    id: 'first-name',
    key: 'first-name',
    required: true,
  },
  {
    label: 'Last name',
    controlType: Input,
    name: 'lastName',
    id: 'last-name',
    key: 'last-name',
    required: true,
  },
  {
    label: 'I agree to the Terms and Conditions',
    controlType: 'input',
    type: 'checkbox',
    id: 'conditions',
    key: 'conditions',
  },
  { controlType: Button, control: { content: 'Submit' }, key: 'submit' },
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
