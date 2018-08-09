import React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleOnIconClickShorthand extends React.Component {
  state = { hidden: false }

  hide = () => {
    this.setState({ hidden: true })
    setTimeout(() => this.setState({ hidden: false }), 2000)
  }

  render() {
    const { hidden } = this.state

    if (hidden) return 'Returning in 2 seconds...'

    return (
      <Label
        circular
        icon="close"
        iconPosition="end"
        onIconClick={this.hide}
        content="Removable label"
      />
    )
  }
}

export default LabelExampleOnIconClickShorthand
