import React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleCircular extends React.Component<{}, { display: string }> {
  constructor() {
    super({})
    this.state = {
      display: 'inline-block',
    }
  }

  public hide = () => {
    this.setState({ display: 'none' })
  }

  public render() {
    const { display } = this.state
    return (
      <Label circular style={{ display }} onRemove={this.hide} removeIcon="minus">
        Removable label
      </Label>
    )
  }
}

export default LabelExampleCircular
