import React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleIconShorthand extends React.Component<{}, { display: string }> {
  constructor(props) {
    super(props)
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
      <Label
        circular
        style={{ display }}
        icon="close"
        iconPosition="after"
        onIconClick={this.hide}
        content="Removable label"
      />
    )
  }
}

export default LabelExampleIconShorthand
