import * as React from 'react'
import { Form, Button, Input, Segment } from '@stardust-ui/react'
import Formsy from 'formsy-react'
import FormsyFormField from './FormsyFormField'

class FormValidationOnSubmit extends React.Component<any, any> {
  state = { buttonDisabled: false, errorMessages: '' }

  render() {
    return (
      <Form
        as={Formsy}
        ref="form"
        onValidSubmit={() => {
          alert('Form submitted')
        }}
        onInvalidSubmit={() => {
          let errors = ''
          for (const ref in this.refs) {
            const element = this.refs[ref]
            if ((element as any).getErrorMessage) {
              errors += (element as any).getErrorMessage() ? (element as any).getErrorMessage() : ''
            }
          }
          this.setState({ errorMessages: errors })
        }}
      >
        {this.getFields()}
      </Form>
    )
  }

  getFields = () => {
    const { errorMessages } = this.state
    const fields = [
      {
        controlType: Input,
        name: 'full-name',
        id: 'full-name',
        key: 'full-name',
        ref: 'fullName',
        required: true,
        label: 'Full Name',
        validations: {
          isExisty: true,
        },
        validationErrors: {
          isExisty: 'You must enter your name.',
        },
      },
      {
        controlType: Input,
        name: 'email',
        ref: 'email',
        validations: {
          isEmail: true,
          maxLength: 50,
        },
        validationErrors: {
          isEmail: 'You have to type valid email',
          maxLength: 'You can not type in more than 50 characters',
        },
        id: 'email',
        key: 'last-name',
        label: 'Email',
      },
      errorMessages.length > 0 ? <Segment content={errorMessages} key="error-messages" /> : '',
      <Button content="Submit" key="submit" />,
    ]
    return fields.map((field, index) => {
      if (index < 2) {
        return <FormsyFormField {...field} />
      }
      // The last item in the fields is the submit button.
      return field
    })
  }
}

export default FormValidationOnSubmit
