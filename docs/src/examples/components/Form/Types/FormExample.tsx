import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

class FormExample extends React.Component {
  state = { validationErrors: {}, buttonDisabled: true }

  render() {
    return (
      <Form
        onSubmit={() => {
          alert('Form submitted')
        }}
        onValid={() => this.setState({ buttonDisabled: false })}
        onInvalid={() => this.setState({ buttonDisabled: true })}
      >
        <Form.Field
          label="First name"
          controlType={Input}
          name="firstName"
          id="first-name"
          required={true}
        />
        <Form.Field
          label="Last name"
          controlType={Input}
          name="lastName"
          id="last-name"
          required={true}
        />
        <Form.Field
          label="Email"
          controlType={Input}
          name="email"
          id="email"
          validations={{
            isEmail: true,
            maxLength: 50,
          }}
          validationErrors={{
            isEmail: 'You have to type valid email',
            maxLength: 'You can not type in more than 50 characters',
          }}
        />
        <Form.Field
          label="I agree to the Terms and Conditions"
          controlType="input"
          type="checkbox"
          id="conditions"
          name="conditions"
        />
        <Button content="Submit" disabled={this.state.buttonDisabled} />
      </Form>
    )
  }
}

export default FormExample
