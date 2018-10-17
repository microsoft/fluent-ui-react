import React from 'react'
import { Form, Input, Button } from '@stardust-ui/react'

class FormExample extends React.Component {
  state = { buttonDisabled: false }

  getFields() {
    const { buttonDisabled } = this.state
    return [
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
        label: 'Email',
        controlType: Input,
        name: 'email',
        id: 'email',
        key: 'email',
        validations: {
          isEmail: true,
          maxLength: 50,
        },
        validationErrors: {
          isEmail: 'You have to type valid email',
          maxLength: 'You can not type in more than 50 characters',
        },
      },
      {
        label: 'I agree to the Terms and Conditions',
        controlType: 'input',
        type: 'checkbox',
        id: 'conditions',
        key: 'conditions',
        name: 'conditions',
      },
      {
        children: <Button content="Submit" disabled={buttonDisabled} />,
        key: 'submit',
        name: 'submit',
      },
    ]
  }

  render() {
    return (
      <Form
        onSubmit={() => {
          alert('Form submitted')
        }}
        onValid={() => this.setState({ buttonDisabled: false })}
        onInvalid={() => this.setState({ buttonDisabled: true })}
        fields={this.getFields()}
      />
    )
  }
}

export default FormExample
