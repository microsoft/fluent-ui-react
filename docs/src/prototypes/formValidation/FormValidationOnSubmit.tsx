import * as React from 'react'
import { Form, Button, Input, Segment, RadioGroup } from '@stardust-ui/react'
import Formsy from 'formsy-react'
import FormsyFormField from './FormsyFormField'
import FormsyFormFieldRadioGroup from './FormsyFormFieldRadioGroup'

class FormValidationOnSubmit extends React.Component<any, any> {
  state = { errorMessages: '' }

  render() {
    return (
      <Form
        as={Formsy}
        ref="form"
        onValidSubmit={() => {
          this.setState({ errorMessages: '' })
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
        control: { as: Input },
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
        control: { as: Input },
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
      {
        name: 'gender',
        ref: 'gender',
        control: {
          as: RadioGroup,
          items: [
            <RadioGroup.Item key="1" label="Male" value="1" />,
            <RadioGroup.Item key="2" label="Female" value="2" />,
          ],
        },
        // TODO: this currently doesn't work
        // required: true,
        validations: {
          isExisty: true,
        },
        validationErrors: {
          isExisty: 'You must select your gender',
        },
        id: 'gender',
        key: 'gender',
        label: 'Gender*',
      },
      errorMessages.length > 0 ? <Segment content={errorMessages} key="error-messages" /> : '',
      <Button content="Submit" key="submit" />,
    ]
    return fields.map((field, index) => {
      if (index < 2) {
        return <FormsyFormField {...field} />
      }
      if (index === 2) {
        return <FormsyFormFieldRadioGroup {...field} />
      }
      // The last item in the fields is the submit button.
      return field
    })
  }
}

export default FormValidationOnSubmit
