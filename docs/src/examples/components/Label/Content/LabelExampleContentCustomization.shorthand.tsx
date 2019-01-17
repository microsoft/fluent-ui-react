import * as React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleContentCustomizationShorthand extends React.Component {
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
        content="You can remove me!"
        circular
        image={{ src: 'public/images/avatar/small/matt.jpg', avatar: true }}
        icon={{ name: 'close', onClick: this.hide }}
      />
    )
  }
}

export default LabelExampleContentCustomizationShorthand
