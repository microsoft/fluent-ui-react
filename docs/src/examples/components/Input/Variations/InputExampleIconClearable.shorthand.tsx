import React from 'react'
import { Input } from '@stardust-ui/react'

class InputExampleIconClearableShorthand extends React.Component<{}, { value: string }> {
  public render() {
    return <Input icon="search" clearable placeholder="Search..." />
  }
}

export default InputExampleIconClearableShorthand
