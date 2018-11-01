import * as React from 'react'
import * as _ from 'lodash'
import { FormField } from '@stardust-ui/react'
import { withFormsy } from 'formsy-react'

const FormFieldWrapper = props => {
  const {
    children,
    control,
    showMessage,
    valueProp,
    controlValueProp,
    onChangeProp,
    eventTargetAsValue,
    getErrorMessage,
    getValue,
    setValue,
  } = props

  const formFieldInputProps = _.pick(props, FormField.handledProps)
  const error = getErrorMessage()
  const value = valueProp || 'value'
  const onChange = onChangeProp || 'onChange'
  const controlValue = controlValueProp || 'value'

  const formFieldProps = {
    ...formFieldInputProps,
    ...(!children && {
      control: {
        ...control,
        [value]: getValue(),
        [onChange]: (e, controlProps) => {
          setValue(eventTargetAsValue ? e.target[controlValue] : controlProps[controlValue])
        },
      },
      ...(showMessage && { message: { content: error, styles: { color: 'red' } } }),
    }),
  }
  return <FormField {...formFieldProps} />
}

export default withFormsy(FormFieldWrapper)
