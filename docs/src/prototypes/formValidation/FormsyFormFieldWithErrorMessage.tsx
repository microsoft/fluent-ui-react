import * as React from 'react'
import { FormField } from '@stardust-ui/react'
import { withFormsy } from 'formsy-react'

class FormFieldWrapper extends React.Component {
  state = { error: '' }
  render() {
    const {
      children,
      className,
      id,
      label,
      renderLabel,
      controlType,
      control,
      renderControl,
      inline,
      message,
      name,
      type,
      renderMessage,
      required,
      styles,
      variables,
    } = this.props as any
    const formFieldProps = {
      children,
      className,
      id,
      label,
      renderLabel,
      controlType,
      renderControl,
      inline,
      message,
      name,
      type,
      renderMessage,
      required,
      styles,
      variables,
      ...(!children && {
        control: {
          ...control,
          value: (this.props as any).getValue(),
          onChange: e => {
             (this.props as any).setValue(e.target.value)
            this.setState({ error: (this.props as any).getErrorMessage() })
          },
        },
        message: { content: this.state.error, styles: { color: 'red' } },
      }),
    }
    return <FormField {...formFieldProps} />
  }
}

export default withFormsy(FormFieldWrapper)
