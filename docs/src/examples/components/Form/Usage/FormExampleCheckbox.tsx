import * as React from 'react'
import { Form, Button, Checkbox, Provider } from '@stardust-ui/react'

const theme = {
  componentStyles: {
    Checkbox: {
      root: {
        padding: 0,
      },
    },
  },
}

const FormExampleCheckbox = () => (
  <Provider theme={theme}>
    <Form
      onSubmit={() => {
        alert('Form submitted')
      }}
    >
      <Form.Field
        label={'Email'}
        name={'email'}
        id={'email-inline-shorthand'}
        key={'email'}
        required={true}
        inline={true}
      />
      <Form.Field
        control={{
          as: Checkbox,
          labelPosition: 'start',
          label: 'Subscribe to newsletter',
        }}
        key="newsletter"
        id="newsletter-inline-shorthand"
      />
      <Form.Field
        control={{
          as: Button,
          content: 'Submit',
        }}
        key="submit"
      />
    </Form>
  </Provider>
)

export default FormExampleCheckbox
