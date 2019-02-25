import * as React from 'react'
import { List, Image } from '@stardust-ui/react'

const items = [
  {
    key: 'irving',
    media: <Image avatar />,
    header: 'Irving Kuhic',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'skyler',
    media: <Image avatar />,
    header: 'Skyler Parks',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'dante',
    media: <Image avatar />,
    header: 'Dante Schneider',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
  {
    key: 'carl',
    media: <Image avatar />,
    header: 'Carl Largus',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
  {
    key: 'john',
    media: <Image avatar />,
    header: 'John Doe',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
]
  .map(item =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => ({ ...item, ...{ key: `${item.key}${index}` } })),
  )
  .reduce((acc, itemsBunch) => [...acc, ...itemsBunch], [])

class ListExampleMediaShorthand extends React.Component {
  state = {
    show: true,
  }

  render() {
    // conditional appearance is set up for the sake of it being possible to test
    // render times after initial load
    return (
      <>
        <button onClick={() => this.setState({ show: !this.state.show })}>Show</button>
        {this.state.show && <List items={items} />}
      </>
    )
  }
}

export default ListExampleMediaShorthand
