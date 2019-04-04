import * as React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleContentCustomizationShorthand extends React.Component {
  state = {
    hidden: false,
    iconOutline: true,
  }

  hide = () => {
    this.setState({ hidden: true })
    setTimeout(() => this.setState({ hidden: false }), 2000)
  }

  handleFocus = () => {
    this.setState({ iconOutline: false })
  }

  handleBlur = () => {
    this.setState({ iconOutline: true })
  }

  render() {
    const { hidden } = this.state

    if (hidden) return 'Returning in 2 seconds...'

    return (
      <Label
        content="You can remove me!"
        circular
        image={{ src: 'public/images/avatar/small/matt.jpg', avatar: true }}
        icon={{
          name: 'close',
          outline: this.state.iconOutline,
          onClick: this.hide,
        }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onRemove={this.hide}
      />
    )
  }
}

export default LabelExampleContentCustomizationShorthand
