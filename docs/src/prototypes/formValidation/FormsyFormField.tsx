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
          value: (this.props as any).getValue(),
          onChange: e => {
             (this.props as any).setValue(e.target.value)
          },
        },
      }),
    }
    return <FormField {...formFieldProps} />
  }
}

export default withFormsy(FormFieldWrapper)
