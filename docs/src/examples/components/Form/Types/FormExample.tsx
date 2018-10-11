import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

const FormExample = () => (
  <Form
    columns={1}
    onSubmit={() => {
      alert('Form submitted')
    }}
  >
    <Form.Field label="First name" control={Input} name="firstName" id="first-name" />
    <Form.Field label="Last name" control={Input} name="lastName" id="last-name" />
    <Form.Field
      label="I agree to the Terms and Conditions"
      control={'input'}
      type="checkbox"
      id="conditions"
      inline
    />
    <Form.Field as={Button}>Submit</Form.Field>
  </Form>
)

export default FormExample
