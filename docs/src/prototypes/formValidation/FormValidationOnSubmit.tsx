import * as React from 'react'
import { Form, Button, Input, Segment, RadioGroup, Text } from '@stardust-ui/react'
import Formsy from 'formsy-react'
import FormsyFormField from './FormsyFormField'

export interface FormValidationOnSubmitState {
  errorMessages: string[]
}
class FormValidationOnSubmit extends React.Component<{}, FormValidationOnSubmitState> {
  state = { errorMessages: [] }

  render() {
    return (
      <Form
        as={Formsy}
        ref="form"
        onValidSubmit={() => {
          this.setState({ errorMessages: [] })
          alert('Form submitted')
        }}
        onInvalidSubmit={() => {
          const errors = []
          for (const ref in this.refs) {
            const element = this.refs[ref]
            if ((element as any).getErrorMessage) {
              const error = (element as any).getErrorMessage()
                ? (element as any).getErrorMessage()
                : ''
              if (error.length > 0) {
                errors.push(error)
              }
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
        validationErrors: {
          isDefaultRequiredValue: 'You must enter your name.',
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
          isEmail: 'You have to type valid email.',
          maxLength: 'You can not type in more than 50 characters.',
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
            { key: '1', label: 'Male', value: '1' },
            { key: '2', label: 'Female', value: '2' },
          ],
        },
        // TODO: this currently doesn't work
        // required: true,
        validations: {
          isExisty: true,
        },
        validationErrors: {
          isExisty: 'You must select your gender.',
        },
        id: 'gender',
        key: 'gender',
        label: 'Gender*',
      },
      errorMessages.length > 0 ? (
        <Segment
          content={
            <div>
              {errorMessages.map(message => (
                <div key={message}>
                  <Text content={message} />
                </div>
              ))}
            </div>
          }
          key="error-messages"
        />
      ) : (
        ''
      ),
      <Button content="Submit" key="submit" />,
    ]
    return fields.map(field => {
      const fieldItem = field as any
      if (fieldItem.control) {
        if (fieldItem.control.as && fieldItem.control.as === Input) {
          return <FormsyFormField {...field} showMessage={false} eventTargetAsValue={true} />
        }
        if (fieldItem.control.as && fieldItem.control.as === RadioGroup) {
          return (
            <FormsyFormField
              {...field}
              showMessage={false}
              valueProp="checkedValue"
              onChangeProp="checkedValueChanged"
              eventTargetAsValue={false}
            />
          )
        }
      }
      return field
    })
  }
}

export default FormValidationOnSubmit
