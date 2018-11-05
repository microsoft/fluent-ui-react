import React from 'react'
import { Icon } from '@stardust-ui/react'

class IconExample extends React.Component {
  state = {
    playState: 'running',
  }
  timeout
  componentDidMount() {
    // after 10s pause the animation
    this.timeout = setTimeout(() => {
      this.setState({ playState: 'paused' })
    }, 10000)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  render() {
    return (
      <div>
        <Icon name="chess rook" size="big" animation="spinner" />
        <Icon
          name="chess rook"
          size="big"
          animation={{ name: 'spinner', duration: '1s', playState: this.state.playState }}
        />
        <Icon name="chess rook" size="big" animation="colorChanger" />
        <Icon
          name="chess rook"
          size="big"
          animation={{
            name: 'colorChanger',
            keyframeParams: { startColor: 'blue', endColor: 'green' },
          }}
        />
      </div>
    )
  }
}

export default IconExample
