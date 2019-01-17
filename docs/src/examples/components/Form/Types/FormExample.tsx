import * as React from 'react'
import { Form, Button } from '@stardust-ui/react'

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted')
    }}
  >
    <Form.Field label="First name" name="firstName" id="first-name" required={true} />
    <Form.Field label="Last name" name="lastName" id="last-name" required={true} />
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
