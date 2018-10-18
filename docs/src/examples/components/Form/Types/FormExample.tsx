import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted')
    }}
  >
    <Form.Field
      label="First name"
      control={{ as: Input }}
      name="firstName"
      id="first-name"
      required={true}
    />
    <Form.Field
      label="Last name"
      control={{ as: Input }}
      name="lastName"
      id="last-name"
      required={true}
    />
    <Form.Field
      label="I agree to the Terms and Conditions"
      control={{ as: 'input' }}
      type="checkbox"
      id="conditions"
    />
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
)

export default FormExample
