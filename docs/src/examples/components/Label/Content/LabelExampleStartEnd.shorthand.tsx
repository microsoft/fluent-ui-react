import React from 'react'
import { Label, Image, Icon } from '@stardust-ui/react'

class LabelExampleStartEndShorthand extends React.Component {
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
        content="John Doe"
        circular
        start={
          <Image
            src="public/images/avatar/small/matt.jpg"
            avatar
            variables={{ avatarSize: '20px' }}
          />
        }
        end={<Icon name="close" variables={{ color: 'rgba(0, 0, 0, 0.6)' }} onClick={this.hide} />}
      />
    )
  }
}

export default LabelExampleStartEndShorthand
