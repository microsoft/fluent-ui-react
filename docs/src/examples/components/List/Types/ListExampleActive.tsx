import React from 'react'
import { List, Image } from '@stardust-ui/react'

class ListExampleActive extends React.Component<any, any> {
  state = {
    key: 'irving',
  }

  handleClick = key => {
    this.setState(() => ({
      key,
    }))
  }

  render() {
    return (
      <List>
        <List.Item
          key="irving"
          media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
          header="Irving Kuhic"
          headerMedia="7:26:56 AM"
          content="Program the sensor to the SAS alarm through the haptic SQL card!"
          active={this.state.key === 'irving' ? this.props.knobs.active : false}
          onClick={() => this.handleClick('irving')}
        />
        <List.Item
          key="skyler"
          media={<Image src="public/images/avatar/small/steve.jpg" avatar />}
          header="Skyler Parks"
          headerMedia="11:30:17 PM"
          content="Use the online FTP application to input the multi-byte application!"
          active={this.state.key === 'skyler' ? this.props.knobs.active : false}
          onClick={() => this.handleClick('skyler')}
        />
        <List.Item
          key="dante"
          media={<Image src="public/images/avatar/small/nom.jpg" avatar />}
          header="Dante Schneider"
          headerMedia="5:22:40 PM"
          content="The GB pixel is down, navigate the virtual interface!"
          active={this.state.key === 'dante' ? this.props.knobs.active : false}
          onClick={() => this.handleClick('dante')}
        />
      </List>
    )
  }
}

export default ListExampleActive
