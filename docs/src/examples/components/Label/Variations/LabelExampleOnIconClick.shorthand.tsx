import React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleIconShorthand extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  public hide = () => {
    this.setState({ display: 'none' })
  }

  public render() {
    const { display } = this.state
    return (
      <Label
        circular
        style={{ display }}
        icon="close"
        iconPosition="end"
        onIconClick={this.hide}
        content="Removable label"
      />
    )
  }
}

export default LabelExampleIconShorthand
