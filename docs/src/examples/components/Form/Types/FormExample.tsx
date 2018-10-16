import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted')
    }}
  >
    <Form.Field label="First name" control={Input} name="firstName" id="first-name" />
    <Form.Field label="Last name" control={Input} name="lastName" id="last-name" />
    <Form.Field
      label="I agree to the Terms and Conditions"
      control="input"
      type="checkbox"
      id="conditions"
    />
    <Form.Field control={Button} content="Submit" />
  </Form>
)

export default FormExample
