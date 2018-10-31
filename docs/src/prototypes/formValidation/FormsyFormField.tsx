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
      showMessage,
      valueProp,
      onChangeProp,
      eventTargetAsValue,
    } = this.props as any

    const value = valueProp || 'value'
    const onChange = onChangeProp || 'onChange'

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
          [value]: (this.props as any).getValue(),
          [onChange]: (e, props) =>
            (this.props as any).setValue(eventTargetAsValue ? e.target.value : props.value),
        },
        ...(showMessage && { message: { content: error, styles: { color: 'red' } } }),
      }),
    }
    return <FormField {...formFieldProps} />
  }
}

export default withFormsy(FormFieldWrapper)
