import * as React from 'react'
import { FormField } from '@stardust-ui/react'
import { withFormsy } from 'formsy-react'

const FormFieldWrapper = props => {
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
    getErrorMessage,
    getValue,
    setValue,
  } = props

  const error = getErrorMessage()
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
        [value]: getValue(),
        [onChange]: (e, props) => setValue(eventTargetAsValue ? e.target.value : props.value),
      },
      ...(showMessage && { message: { content: error, styles: { color: 'red' } } }),
    }),
  }
  return <FormField {...formFieldProps} />
}

export default withFormsy(FormFieldWrapper)
