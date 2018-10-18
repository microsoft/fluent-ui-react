import * as React from 'react'
import { Form, Button } from '@stardust-ui/react'
import Formsy from 'formsy-react'
import FormsyInput from './FormsyInput'

class FormValidationPrototype extends React.Component<any, any> {
  state = { buttonDisabled: false }
  render() {
    const { buttonDisabled } = this.state
    console.log(buttonDisabled)
    const fields = [
      {
        controlType: FormsyInput,
        control: { name: 'first-name' },
        id: 'first-name',
        key: 'first-name',
      },
      {
        controlType: FormsyInput,
        control: { name: 'first-name' },
        id: 'email',
        key: 'last-name',
        validations: {
          isEmail: true,
          maxLength: 50,
          isMicrosoft: value => {
            return !value.email || value.email.endsWith('@microsoft.com')
          },
        },
        validationErrors: {
          isEmail: 'You have to type valid email',
          maxLength: 'You can not type in more than 50 characters',
          isMicrosoft: 'The email must be @microsoft.com',
        },
      },
      {
        controlType: Button,
        control: { content: 'Submit', name: 'Submit', disabled: buttonDisabled },
        key: 'submit',
      },
    ]
    return (
      <Form
        as={Formsy}
        onSubmit={() => {
          alert('Form submitted')
        }}
        onValid={() => this.setState({ buttonDisabled: false })}
        onInvalid={() => this.setState({ buttonDisabled: true })}
        fields={fields}
      />
    )
  }
}

export default FormValidationPrototype
