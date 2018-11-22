import React from 'react'
import { Icon, Button, Animation } from '@stardust-ui/react'

class IconExample extends React.Component {
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
    )
  }
}

export default IconExample
