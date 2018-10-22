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
    const items = [
      {
        key: 'irving',
        media: <Image src="public/images/avatar/small/matt.jpg" avatar />,
        header: 'Irving Kuhic',
        headerMedia: '7:26:56 AM',
        content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
      },
      {
        key: 'skyler',
        media: <Image src="public/images/avatar/small/steve.jpg" avatar />,
        header: 'Skyler Parks',
        headerMedia: '11:30:17 PM',
        content: 'Use the online FTP application to input the multi-byte application!',
      },
      {
        key: 'dante',
        media: <Image src="public/images/avatar/small/nom.jpg" avatar />,
        header: 'Dante Schneider',
        headerMedia: '5:22:40 PM',
        content: 'The GB pixel is down, navigate the virtual interface!',
      },
    ]
    return (
      <List
        items={items.map(item => {
          if (item.key === this.state.key) item['active'] = this.props.knobs.active
          else item['active'] = false
          item['onClick'] = () => this.handleClick(item.key)
          return item
        })}
      />
    )
  }
}

export default ListExampleActive
