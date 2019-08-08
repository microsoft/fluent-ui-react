import { Input, Form, InputProps } from '@stardust-ui/react'
import * as React from 'react'

export type ComponentExampleVariableProps = {
  componentName: string
  onChange: (componentName: string, variableName: string, variableValue: string) => void
  variableName: string
  variableValue: string
}

const ComponentExampleVariable: React.FunctionComponent<ComponentExampleVariableProps> = props => {
  const { componentName, onChange, variableName, variableValue } = props

  const handleChange = React.useCallback(
    (e, data: InputProps) => {
      onChange(componentName, variableName, data.value as string)
    },
    [componentName, onChange, variableName],
  )
  const control = React.useMemo(
    () => ({
      as: Input,
      value: variableValue,
      onChange: handleChange,
    }),
    [handleChange, variableValue],
  )

  return <Form.Field control={control} label={variableName} />
}

export default React.memo(ComponentExampleVariable)
