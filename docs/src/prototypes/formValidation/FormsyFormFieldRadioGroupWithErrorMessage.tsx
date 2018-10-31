import * as React from 'react'
import { FormField } from '@stardust-ui/react'
import { withFormsy } from 'formsy-react'

class FormFieldWrapper extends React.Component {
  state = { error: '' }
  render() {
    const error = (this.props as any).getErrorMessage()
    const {
      children,
      className,
      id,
      control,
      inline,
      label,
      message,
      name,
      renderControl,
      renderLabel,
      renderMessage,
      required,
      styles,
      type,
      variables,
    } = this.props as any
    const formFieldProps = {
      children,
      className,
      id,
      inline,
      label,
      message,
      name,
      renderControl,
      renderLabel,
      renderMessage,
      required,
      styles,
      type,
      variables,
      ...(!children && {
        control: {
          ...control,
          checkedValue: (this.props as any).getValue(),
          checkedValueChanged: (e, props) => {
             (this.props as any).setValue(props.value)
          },
        },
        message: { content: error, styles: { color: 'red' } },
      }),
    }
    return <FormField {...formFieldProps} />
  }
}

export default withFormsy(FormFieldWrapper)
