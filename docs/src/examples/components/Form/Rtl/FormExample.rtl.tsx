import * as React from 'react'
import { Form, Button } from '@stardust-ui/react'

const FormExampleRtl = () => (
  <Form>
    <Form.Field label="الاسم الاول" name="firstName" id="first-name" required />
    <Form.Field label="الكنية" name="lastName" id="last-name" required />
    <Form.Field
      label="أوافق على الشروط"
      control={{ as: 'input' }}
      type="checkbox"
      id="conditions"
    />
    <Form.Field control={{ as: Button, content: 'خضع' }} />
  </Form>
)

export default FormExampleRtl
