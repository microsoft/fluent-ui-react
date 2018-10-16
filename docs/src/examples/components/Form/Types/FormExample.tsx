import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted')
    }}
  >
    <Form.Field label="First name" controlType={Input} name="firstName" id="first-name" />
    <Form.Field label="Last name" controlType={Input} name="lastName" id="last-name" />
    <Form.Field
      label="I agree to the Terms and Conditions"
      controlType="input"
      type="checkbox"
      id="conditions"
    />
    <Form.Field controlType={Button} content="Submit" />
  </Form>
)

export default FormExample
