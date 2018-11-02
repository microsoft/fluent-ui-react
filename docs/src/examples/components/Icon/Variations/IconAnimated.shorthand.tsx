import React from 'react'
import { Icon } from '@stardust-ui/react'

const keyframe = ({ startColor, endColor }) => ({
  from: { color: startColor },
  to: { color: endColor },
})

class IconExample extends React.Component {
  state = {
    playState: 'running',
  }
  timeout
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ playState: 'paused' })
    }, 15000)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  render() {
    console.log(this.state.playState)
    return (
      <div>
        <Icon
          name="umbrella"
          size="big"
          animation={{
            keyframe,
            keyframeParams: { startColor: 'red', endColor: 'yellow' },
            duration: '5s',
            delay: '2s',
            iterationCount: 'infinite',
            direction: 'alternate',
            fillMode: 'backwards',
            playState: this.state.playState,
            timingFunction: 'ease',
          }}
        />
      </div>
    )
  }
}

export default IconExample
