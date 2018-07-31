import React from 'react'
import { Label } from '@stardust-ui/react'

class LabelExampleIconShorthandShorthand extends React.Component<{}, { display: string }> {
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
        icon={{
          name: 'close',
          xSpacing: 'before',
          onClick: this.hide,
          variables: { color: 'rgba(0, 0, 0, 0.6)' },
        }}
        iconPosition="after"
        content="Removable label"
      />
    )
  }
}

export default LabelExampleIconShorthandShorthand
