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
      controlType={Input}
      name="firstName"
      id="first-name-inline"
      inline={true}
      required={true}
    />
    <Form.Field
      label="Last name"
      controlType={Input}
      name="lastName"
      id="last-name-inline"
      inline={true}
      required={true}
    />
    <Form.Field
      label="I agree to the Terms and Conditions"
      controlType="input"
      type="checkbox"
      id="conditions-inline"
    />
    <Form.Field controlType={Button} control={{ content: 'Submit' }} />
  </Form>
)

export default FormExample
