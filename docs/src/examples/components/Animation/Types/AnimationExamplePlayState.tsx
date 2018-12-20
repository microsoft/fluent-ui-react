import * as React from 'react'
import { Icon, Button, Animation, Provider } from '@stardust-ui/react'

const spinner = {
  keyframe: {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  duration: '5s',
  iterationCount: 'infinite',
}

class AnimationExamplePlayState extends React.Component {
  state = {
    playState: 'running',
  }

  changePlayState = () => {
    this.setState(prevState => ({
      playState: (prevState as any).playState === 'running' ? 'paused' : 'running',
    }))
  }

  render() {
    return (
      <Provider theme={{ animations: { spinner } }}>
        <div>
          <Button
            icon={this.state.playState === 'running' ? 'pause' : 'play'}
            content={this.state.playState === 'running' ? 'Pause' : 'Start'}
            onClick={this.changePlayState}
            primary
          />
          <br />
          <br />
          <Animation name="spinner" playState={this.state.playState}>
            <Icon name="umbrella" circular />
          </Animation>
        </div>
      </Provider>
    )
  }
}

export default AnimationExamplePlayState
